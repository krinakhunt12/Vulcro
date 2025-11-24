import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { verifyTokenFromHeader } from '@/lib/auth';

/**
 * GET /api/orders/[id] - get one order (user or admin)
 * PATCH /api/orders/[id] - update order (admin only)
 * DELETE /api/orders/[id] - soft delete (admin only)
 */
export async function GET(req, { params }) {
  try {
    const vt = await verifyTokenFromHeader(req);
    if (!vt.ok) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    await dbConnect();
    const id = params.id;
    const order = await Order.findById(id).populate('items.productId', 'name price images').lean();
    if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

    if (!vt.user.isAdmin && String(order.userId) !== String(vt.user.id)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ success: true, message: 'Order fetched', data: order });
  } catch (err) {
    console.warn('Order GET error', err);
    return NextResponse.json({ success: false, message: 'Unable to fetch order', error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const vt = await verifyTokenFromHeader(req);
    if (!vt.ok || !vt.user.isAdmin) return NextResponse.json({ success: false, message: 'Admin only' }, { status: 403 });

    const id = params.id;
    const body = await req.json();
    const up = {};
    const allowed = ['orderStatus', 'paymentStatus', 'trackingId'];
    for (const k of allowed) if (k in body) up[k] = body[k];

    if (Object.keys(up).length === 0) return NextResponse.json({ success: false, message: 'No valid fields to update' }, { status: 400 });

    await dbConnect();
    const order = await Order.findByIdAndUpdate(id, { $set: up }, { new: true }).populate('items.productId', 'name price images').lean();
    if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Order updated', data: order });
  } catch (err) {
    console.warn('Order PATCH error', err);
    return NextResponse.json({ success: false, message: 'Unable to update order', error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const vt = await verifyTokenFromHeader(req);
    if (!vt.ok || !vt.user.isAdmin) return NextResponse.json({ success: false, message: 'Admin only' }, { status: 403 });

    const id = params.id;
    await dbConnect();
    const order = await Order.findByIdAndUpdate(id, { $set: { deleted: true } }, { new: true }).lean();
    if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Order deleted (soft)', data: order });
  } catch (err) {
    console.warn('Order DELETE error', err);
    return NextResponse.json({ success: false, message: 'Unable to delete order', error: err.message }, { status: 500 });
  }
}
