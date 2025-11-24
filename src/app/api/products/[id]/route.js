import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

/**
 * GET /api/products/[id] -> fetch single product
 * PUT /api/products/[id] -> update product (admin only placeholder)
 * DELETE /api/products/[id] -> delete product (admin only placeholder)
 */

export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log('[API GET /api/products/[id]] Received id:', id, 'Type:', typeof id);

    // If there's no MongoDB URI, fall back to in-repo sample data so local
    // development works without a running database.
    if (!process.env.MONGODB_URI) {
      try {
        const products = (await import('@/data/products')).default;
        // Support numeric and string ids: route `id` may be an ObjectId string
        const found = products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
        if (!found) {
          return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Product fetched (local fallback)', product: found }, { status: 200 });
      } catch (e) {
        console.warn('Local products fallback failed', e);
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
      }
    }

    await dbConnect();

    // Try multiple lookup strategies since _id can be a string or ObjectId
    let product = null;
    
    // Strategy 1: Try as ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(id)) {
      console.log('[API] id is valid ObjectId format, trying findById...');
      try {
        product = await Product.findById(id).lean();
        console.log('[API] findById result:', product ? 'FOUND' : 'NOT FOUND');
      } catch (e) {
        console.warn('findById failed, will try string lookup:', e.message);
      }
    }
    
    // Strategy 2: If not found, try as string _id (some DBs store _id as string)
    if (!product) {
      console.log('[API] Trying findOne with string _id...');
      try {
        product = await Product.findOne({ _id: id }).lean();
        console.log('[API] findOne by string _id result:', product ? 'FOUND' : 'NOT FOUND');
      } catch (e) {
        console.warn('findOne by string _id failed:', e.message);
      }
    }

    if (!product) {
      console.log('[API] Product NOT FOUND after all strategies for id:', id);
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    console.log('[API] Returning product:', product.name);
    return NextResponse.json({ success: true, message: 'Product fetched', product }, { status: 200 });
  } catch (err) {
    console.warn('GET /api/products/[id] error', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    // TODO: Validate admin token here
    const { id } = params;
    console.log('PUT /api/products/[id] called with id =', id);
    const body = await req.json();

    await dbConnect();

    // Allow partial updates
    let updated = null;
    try {
      updated = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    } catch (e) {
      console.warn('findByIdAndUpdate threw, will try alternative lookup:', e?.message);
    }

    if (!updated) {
      // try lookup by _id using ObjectId if possible
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updated = await Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, body, { new: true, runValidators: true }).lean();
        }
      } catch (e) {
        console.warn('findOneAndUpdate by ObjectId threw:', e?.message);
      }
    }

    if (!updated) {
      // as a last resort try to match by a string 'id' field
      try {
        updated = await Product.findOneAndUpdate({ id }, body, { new: true, runValidators: true }).lean();
      } catch (e) {
        console.warn('findOneAndUpdate by id field threw:', e?.message);
      }
    }

    if (!updated) {
      console.log('PUT update failed - no document matched id:', id);
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product updated', product: updated }, { status: 200 });
  } catch (err) {
    console.warn('PUT /api/products/[id] error', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    // TODO: Validate admin token here
    const { id } = params;
    console.log('DELETE /api/products/[id] called with id =', id);
    await dbConnect();

    let deleted = null;
    try {
      deleted = await Product.findByIdAndDelete(id).lean();
    } catch (e) {
      console.warn('findByIdAndDelete threw, will try fallback lookup:', e?.message);
    }

    if (!deleted) {
      try {
        // try ObjectId lookup
        if (mongoose.Types.ObjectId.isValid(id)) {
          deleted = await Product.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) }).lean();
        }
      } catch (e) {
        console.warn('findOneAndDelete by ObjectId threw:', e?.message);
      }
    }

    if (!deleted) {
      try {
        // try by custom id field
        deleted = await Product.findOneAndDelete({ id }).lean();
      } catch (e) {
        console.warn('findOneAndDelete by id field threw:', e?.message);
      }
    }

    if (!deleted) {
      console.log('DELETE failed - no document matched id:', id);
      return NextResponse.json({ success: false, message: `Product not found for id: ${id}` }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted', deletedId: id }, { status: 200 });
  } catch (err) {
    console.warn('DELETE /api/products/[id] error', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
