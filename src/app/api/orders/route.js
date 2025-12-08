import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import User from '@/models/User';
import { validateStock, reduceStock, generateOrderNumber } from '@/lib/orderUtils';

/**
 * GET /api/orders
 * Admin only: list orders with optional filters and analytics
 * POST /api/orders
 * Create a new order (authenticated user)
 */
export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const { range, status, userId } = params;

    const match = { deleted: false };
    const now = new Date();
    if (range === 'daily') {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      match.createdAt = { $gte: start };
    } else if (range === 'weekly') {
      const start = new Date();
      start.setDate(now.getDate() - 7);
      match.createdAt = { $gte: start };
    } else if (range === 'monthly') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      match.createdAt = { $gte: start };
    }
    if (status) match.orderStatus = status;
    if (userId) match.userId = userId;

    const orders = await Order.find(match).sort({ createdAt: -1 }).populate('userId', 'name email').populate('items.productId', 'name price images').lean();

    // analytics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || o.totalPrice || 0), 0);
    const cod = orders.filter((o) => o.paymentMethod === 'COD').length;
    const online = orders.filter((o) => o.paymentMethod === 'Online').length;

    return NextResponse.json({ success: true, message: 'Orders fetched', data: { orders, analytics: { totalOrders, totalRevenue, cod, online } } });
  } catch (err) {
    console.warn('Orders GET error', err);
    return NextResponse.json({ success: false, message: 'Unable to fetch orders', error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, address, paymentMethod = 'COD', paymentStatus = 'Pending', totalAmount, subtotal, shipping, tax, userId } = body;

    // Basic validation
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Order items required' }, { status: 400 });
    }
    if (!address || !address.line1 || !address.city || !address.pincode) {
      return NextResponse.json({ success: false, message: 'Complete shipping address required' }, { status: 400 });
    }
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
      return NextResponse.json({ success: false, message: 'Invalid total amount' }, { status: 400 });
    }

    // validate stock
    const stockCheck = await validateStock(items);
    if (!stockCheck.ok) return NextResponse.json({ success: false, message: stockCheck.message, error: stockCheck.details }, { status: 400 });

    await dbConnect();

    // generate order number
    const orderNumber = await generateOrderNumber();

    const order = new Order({
      orderNumber,
      userId: userId || null,
      items: items.map((it) => ({ productId: it.productId, quantity: it.quantity, size: it.size, color: it.color, price: it.price, images: it.images || [] })),
      address,
      paymentMethod,
      paymentStatus,
      subtotal: Number(subtotal) || 0,
      shippingCharge: Number(shipping) || 0,
      tax: Number(tax) || 0,
      totalAmount: Number(totalAmount) || 0,
      totalPrice: Number(totalAmount) || 0,
      orderStatus: 'Placed',
    });

    await order.save();

    // reduce stock
    await reduceStock(items);

    const saved = await Order.findById(order._id).populate('items.productId', 'name price images').lean();

    return NextResponse.json({ success: true, message: 'Order placed', data: saved }, { status: 201 });
  } catch (err) {
    console.warn('Order create error', err);
    return NextResponse.json({ success: false, message: 'Unable to create order', error: err.message }, { status: 500 });
  }
}

