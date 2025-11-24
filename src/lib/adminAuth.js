import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_env';

export function generateAdminToken(admin) {
  const payload = { adminId: admin._id, email: admin.email, name: admin.name, isAdmin: true };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

export async function verifyAdminTokenFromCookie(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('token='));
    if (!match) return { ok: false, message: 'No token cookie' };
    const token = match.split('=')[1];
    if (!token) return { ok: false, message: 'No token' };
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.adminId) return { ok: false, message: 'Invalid token' };

    await dbConnect();
    const admin = await Admin.findById(decoded.adminId).lean();
    if (!admin) return { ok: false, message: 'Admin not found' };

    return { ok: true, admin: { id: admin._id, email: admin.email, name: admin.name } };
  } catch (err) {
    return { ok: false, message: err.message || 'Token verification failed' };
  }
}
