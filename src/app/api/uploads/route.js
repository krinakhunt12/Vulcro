import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Simple uploads endpoint that accepts JSON with base64-encoded files.
 * Expected body: { files: [{ name: 'file.jpg', data: '<base64 string>' }, ...] }
 * Writes files to `public/uploads` and returns array of public URLs.
 * Note: This is a simple helper for local/dev usage. For production use S3/Cloudinary.
 */

export async function POST(req) {
  try {
    const body = await req.json();
    const files = body.files || [];

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ success: false, message: 'No files provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const saved = [];

    for (const f of files) {
      const name = f.name || `upload-${Date.now()}`;
      const safeName = `${Date.now()}-${name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const base64 = (f.data || '').replace(/^data:.*;base64,/, '');
      const buffer = Buffer.from(base64, 'base64');
      const filePath = path.join(uploadsDir, safeName);
      fs.writeFileSync(filePath, buffer);
      // public URL (relative)
      saved.push(`/uploads/${safeName}`);
    }

    return NextResponse.json({ success: true, message: 'Files uploaded', files: saved }, { status: 201 });
  } catch (err) {
    console.warn('POST /api/uploads error', err);
    return NextResponse.json({ success: false, message: err?.message || 'Upload error' }, { status: 500 });
  }
}
