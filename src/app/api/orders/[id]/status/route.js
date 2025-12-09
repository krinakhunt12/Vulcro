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

    // normalize incoming id and try to extract a clean 24-hex id if present
    let lookupId = String(id ?? '').trim();
    attempts.push({ method: 'raw_param', value: lookupId, type: typeof lookupId, len: lookupId.length });

    // If the param contains a 24-hex substring, extract it (handles extra chars or wrappers)
    const hex = lookupId.match(/([a-fA-F0-9]{24})/);
    if (hex && hex[1]) {
      attempts.push({ method: 'extract_24hex', value: hex[1] });
      lookupId = hex[1];
    }

    // 1) Try direct ObjectId lookup (preferred)
    try {
      const isValid = mongoose.Types.ObjectId.isValid(lookupId);
      attempts.push({ method: 'isValidObjectId', value: isValid });
      if (isValid) {
        attempts.push({ method: 'findByIdAndUpdate_attempt', value: lookupId });
        order = await Order.findByIdAndUpdate(mongoose.Types.ObjectId(lookupId), { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      }
    } catch (e) {
      attempts.push({ method: 'findByIdAndUpdate_error', error: e.message });
    }

    // 2) try update by string _id (fallback)
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update__id_string', value: lookupId });
        order = await Order.findOneAndUpdate({ _id: lookupId }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update__id_string_error', error: e.message });
      }
    }

    // 3) try update by exact orderNumber
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_orderNumber', value: lookupId });
        order = await Order.findOneAndUpdate({ orderNumber: lookupId }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_orderNumber_error', error: e.message });
      }
    }

    // 4) try partial / case-insensitive match on orderNumber
    if (!order) {
      try {
        attempts.push({ method: 'findOne_update_orderNumber_partial', value: lookupId });
        const escaped = String(lookupId).replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&');
        const re = new RegExp(escaped, 'i');
        order = await Order.findOneAndUpdate({ orderNumber: re }, { $set: { orderStatus } }, { new: true }).populate('items.productId', 'name price images').populate('userId', 'name email').lean();
      } catch (e) {
        attempts.push({ method: 'findOne_update_orderNumber_partial_error', error: e.message });
      }
    }

    // 5) try update by nested item _id
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
