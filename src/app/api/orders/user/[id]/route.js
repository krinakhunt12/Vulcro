import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { verifyTokenFromHeader } from '@/lib/auth';

/**
 * GET /api/orders/user/[id]
 * Return orders for a specific user (authenticated, or admin)
 */
export async function GET(req, { params }) {
  try {
    const vt = await verifyTokenFromHeader(req);
    if (!vt.ok) return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });

    const userId = params.id;
    // allow users to fetch their orders or admins to fetch any user's orders
    if (!vt.user.isAdmin && String(vt.user.id) !== String(userId)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const orders = await Order.find({ userId, deleted: false }).sort({ createdAt: -1 }).populate('items.productId', 'name price images').lean();
    return NextResponse.json({ success: true, message: 'User orders fetched', data: orders });
  } catch (err) {
    console.warn('User orders error', err);
    return NextResponse.json({ success: false, message: 'Unable to fetch user orders', error: err.message }, { status: 500 });
  }
}
