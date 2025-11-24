import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import { generateAdminToken } from '@/lib/adminAuth';

function serializeCookie(name, val, options = {}) {
  const enc = encodeURIComponent(val);
  let str = `${name}=${enc}`;
  if (options.maxAge) str += `; Max-Age=${options.maxAge}`;
  if (options.httpOnly) str += `; HttpOnly`;
  if (options.path) str += `; Path=${options.path}`;
  if (options.sameSite) str += `; SameSite=${options.sameSite}`;
  if (options.secure) str += `; Secure`;
  return str;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });

    await dbConnect();
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

    const token = generateAdminToken(admin);

    // Use NextResponse to set the cookie reliably
    const res = NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log('Admin logged in:', admin.email);
    return res;
  } catch (err) {
    console.error('Admin login error', err);
    return NextResponse.json({ success: false, message: 'Unable to login', error: err.message }, { status: 500 });
  }
}
