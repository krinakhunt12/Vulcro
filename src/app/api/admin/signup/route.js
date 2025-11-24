import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, adminSecret } = body;

    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json({ success: false, message: 'ADMIN_SECRET not configured' }, { status: 500 });
    }
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ success: false, message: 'Invalid admin secret' }, { status: 401 });
    }

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'All fields required' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'Password too weak' }, { status: 400 });
    }

    await dbConnect();
    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email: email.toLowerCase().trim(), password: hashed });
    await admin.save();

    return NextResponse.json({ success: true, message: 'Admin created' }, { status: 201 });
  } catch (err) {
    console.error('Admin signup error', err);
    return NextResponse.json({ success: false, message: 'Unable to create admin', error: err.message }, { status: 500 });
  }
}
