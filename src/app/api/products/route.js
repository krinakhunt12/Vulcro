import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

/**
 * POST /api/products -> create a new product (admin only placeholder)
 * GET  /api/products -> fetch list of products with optional filters
 */

export async function POST(req) {
  try {
    // TODO: Validate admin token here
    // const auth = req.headers.get('authorization')

    const body = await req.json();
    const { name, description, price, sizes, colors, stock, category, images, isFeatured } = body;

    // Basic validation
    if (!name || !description || price == null || !category || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, description, price, category, images)' }, { status: 400 });
    }

    await dbConnect();

    const product = await Product.create({
      name,
      description,
      price,
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      stock: typeof stock === 'number' ? stock : 0,
      category,
      images,
      isFeatured: !!isFeatured,
    });

    return NextResponse.json({ success: true, message: 'Product created', product }, { status: 201 });
  } catch (err) {
    console.warn('POST /api/products error', err);
    const message = err?.message || 'Server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // If no MongoDB is configured, return the sample dataset so the
    // frontend renders during local development without a DB.
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || null;
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const search = url.searchParams.get('search') || null;

    if (!process.env.MONGODB_URI) {
      try {
        const products = (await import('@/data/products')).default;
        let result = products;
        if (category) result = result.filter(p => p.category === category);
        if (minPrice != null) result = result.filter(p => Number(p.price) >= Number(minPrice));
        if (maxPrice != null) result = result.filter(p => Number(p.price) <= Number(maxPrice));
        if (search) {
          const q = String(search).toLowerCase();
          result = result.filter(p => (p.title || p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
        }
        return NextResponse.json({ success: true, message: 'Products fetched (local fallback)', products: result }, { status: 200 });
      } catch (e) {
        console.warn('Local products fallback failed', e);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
      }
    }

    await dbConnect();

    const filter = {};

    if (category) filter.category = category;

    if (minPrice != null || maxPrice != null) {
      filter.price = {};
      if (minPrice != null) filter.price.$gte = Number(minPrice);
      if (maxPrice != null) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      // text search across name and description (case-insensitive)
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, message: 'Products fetched', products }, { status: 200 });
  } catch (err) {
    console.warn('GET /api/products error', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
