import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function verifyTokenFromHeader(req) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth) return { ok: false, message: 'Authorization header missing' };
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return { ok: false, message: 'Invalid authorization format' };
    const token = parts[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return { ok: false, message: 'JWT_SECRET not configured' };

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.userId) return { ok: false, message: 'Invalid token payload' };

    await dbConnect();
    const user = await User.findById(decoded.userId).lean();
    if (!user) return { ok: false, message: 'User not found' };

    // determine admin status: prefer explicit isAdmin on user, fallback to env ADMIN_EMAILS list
    const isAdmin = !!user.isAdmin || (process.env.ADMIN_EMAILS || '').split(',').map((s) => s.trim()).includes(user.email);

    return { ok: true, user: { id: user._id, email: user.email, name: user.name, isAdmin } };
  } catch (err) {
    return { ok: false, message: err.message || 'Token verification failed' };
  }
}
