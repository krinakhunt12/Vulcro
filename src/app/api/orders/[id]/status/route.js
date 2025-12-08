import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { verifyTokenFromHeader } from '@/lib/auth';

/**
 * PATCH /api/orders/:id/status
 * Body: { orderStatus: 'Packed' }
 */
export async function PATCH(req, { params }) {
  try {
    const vt = await verifyTokenFromHeader(req);
    if (!vt.ok || !vt.user.isAdmin) return NextResponse.json({ success: false, message: 'Admin only' }, { status: 403 });

    const id = params.id;
    const body = await req.json();
    const { orderStatus } = body || {};
    const allowed = ['Placed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!orderStatus || !allowed.includes(orderStatus)) {
      return NextResponse.json({ success: false, message: 'Invalid orderStatus' }, { status: 400 });
    }

    await dbConnect();
    const mongoose = (await import('mongoose')).default;
    const attempts = [];
    let order = null;

    // diagnostic: raw param info
    try {
      console.warn('[OrderStatus] raw params.id:', JSON.stringify(id), 'type:', typeof id, 'len:', id?.length);
    } catch (e) {
      console.warn('[OrderStatus] raw params.id inspect failed', e.message);
    }

    // If id isn't a valid ObjectId, try to extract a 24-hex substring (handles accidental extra chars)
    let lookupId = id;
    if (!mongoose.Types.ObjectId.isValid(lookupId)) {
      const m = String(lookupId).match(/([a-fA-F0-9]{24})/);
      if (m && m[1]) {
        attempts.push({ method: 'extract_24hex', value: m[1] });
        lookupId = m[1];
        console.warn('[OrderStatus] extracted 24-hex id from param:', lookupId);
      }
    }

    // 1) try by ObjectId
    try {
      attempts.push({ method: 'isValidObjectId', value: mongoose.Types.ObjectId.isValid(lookupId) });
      if (mongoose.Types.ObjectId.isValid(lookupId)) {
        attempts.push({ method: 'findByIdAndUpdate', value: lookupId });
        order = await Order.findByIdAndUpdate(lookupId, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      }
    } catch (e) {
      attempts.push({ method: 'findByIdAndUpdate_error', error: e.message });
    }

    // 2) try update by string _id
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update__id_string', value: lookupId });
        order = await Order.findOneAndUpdate({ _id: lookupId }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update__id_string_error', error: e.message });
      }
    }

    // 3) try update by orderNumber
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_orderNumber', value: id });
        order = await Order.findOneAndUpdate({ orderNumber: id }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_orderNumber_error', error: e.message });
      }
    }

    // 4) try update by item _id
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_by_itemId', value: lookupId });
        order = await Order.findOneAndUpdate({ 'items._id': lookupId }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_by_itemId_error', error: e.message });
      }
    }

    if (!order) return NextResponse.json({ success: false, message: 'Order not found', attempts }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Order status updated', data: order });
  } catch (err) {
    console.warn('Order status PATCH error', err);
    return NextResponse.json({ success: false, message: 'Unable to update order status', error: err.message }, { status: 500 });
  }
}
