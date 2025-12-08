import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { verifyTokenFromHeader } from '@/lib/auth';
import User from '@/models/User';

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
    // try several lookup strategies to be robust (ObjectId, string _id, orderNumber)
    const mongoose = (await import('mongoose')).default;
    const attempts = [];
    let order = null;

    // 1) if valid ObjectId -> try findById
    try {
      attempts.push({ method: 'isValidObjectId', value: mongoose.Types.ObjectId.isValid(id) });
      if (mongoose.Types.ObjectId.isValid(id)) {
        attempts.push({ method: 'findById', value: id });
        order = await Order.findById(id).populate('items.productId', 'name price images').lean();
      }
    } catch (e) {
      attempts.push({ method: 'findById_error', error: e.message });
    }

    // 2) try findOne by _id (in case string vs ObjectId mismatch)
    if (!order) {
      try {
        attempts.push({ method: 'findOne__id_string', value: id });
        order = await Order.findOne({ _id: id }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne__id_string_error', error: e.message });
      }
    }

    // 3) try lookup by orderNumber
    if (!order) {
      try {
        attempts.push({ method: 'findOne_orderNumber', value: id });
        order = await Order.findOne({ orderNumber: id }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_orderNumber_error', error: e.message });
      }
    }

    // 4) try lookup by item _id (some UIs may pass the item id)
    if (!order) {
      try {
        attempts.push({ method: 'findOne_by_itemId', value: id });
        order = await Order.findOne({ 'items._id': id }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_by_itemId_error', error: e.message });
      }
    }

    if (!order) {
      // If admin asked for debug, return attempts for diagnosis
      try {
        const url = new URL(req.url);
        const debug = url.searchParams.get('debug') === '1';
        if (debug && vt.user.isAdmin) {
          return NextResponse.json({ success: false, message: 'Order not found', attempts }, { status: 404 });
        }
      } catch (e) {
        // ignore
      }
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

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
    const mongoose = (await import('mongoose')).default;
    const attempts = [];
    let order = null;

    // 1) try findByIdAndUpdate for valid ObjectId
    try {
      attempts.push({ method: 'isValidObjectId', value: mongoose.Types.ObjectId.isValid(id) });
      if (mongoose.Types.ObjectId.isValid(id)) {
        attempts.push({ method: 'findByIdAndUpdate', value: id });
        order = await Order.findByIdAndUpdate(id, { $set: up }, { new: true }).populate('items.productId', 'name price images').lean();
      }
    } catch (e) {
      attempts.push({ method: 'findByIdAndUpdate_error', error: e.message });
    }

    // 2) try update by string _id
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update__id_string', value: id });
        order = await Order.findOneAndUpdate({ _id: id }, { $set: up }, { new: true }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update__id_string_error', error: e.message });
      }
    }

    // 3) try update by orderNumber
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_orderNumber', value: id });
        order = await Order.findOneAndUpdate({ orderNumber: id }, { $set: up }, { new: true }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_orderNumber_error', error: e.message });
      }
    }

    // 4) try update by item _id
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_by_itemId', value: id });
        order = await Order.findOneAndUpdate({ 'items._id': id }, { $set: up }, { new: true }).populate('items.productId', 'name price images').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_by_itemId_error', error: e.message });
      }
    }

    if (!order) return NextResponse.json({ success: false, message: 'Order not found', attempts }, { status: 404 });

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
