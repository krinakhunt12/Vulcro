import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Order from '@/models/Order';

/**
 * Validate stock for items array [{ productId, quantity }]
 * Returns { ok: true } or { ok: false, message, details }
 */
export async function validateStock(items) {
  if (!Array.isArray(items) || items.length === 0) return { ok: false, message: 'Order must contain at least one item' };

  await dbConnect();

  const errors = [];
  for (const it of items) {
    if (!it.productId) {
      errors.push({ productId: null, message: 'productId missing' });
      continue;
    }

    const prod = await Product.findById(it.productId).lean();
    if (!prod) {
      errors.push({ productId: it.productId, message: 'Product not found' });
      continue;
    }

    const qty = Number(it.quantity) || 0;
    if (qty <= 0) {
      errors.push({ productId: it.productId, message: 'Quantity must be at least 1' });
      continue;
    }

    if ((prod.stock || 0) < qty) {
      errors.push({ productId: it.productId, available: prod.stock || 0, requested: qty, message: 'Insufficient stock' });
    }
  }

  if (errors.length > 0) return { ok: false, message: 'Stock validation failed', details: errors };
  return { ok: true };
}

/**
 * Decrease stock for items array. This performs updates; caller should ensure validation first.
 */
export async function reduceStock(items) {
  await dbConnect();
  const ops = items.map((it) => ({ updateOne: { filter: { _id: it.productId }, update: { $inc: { stock: -Math.max(0, Number(it.quantity) || 0) } } } }));
  if (ops.length === 0) return;
  return Product.bulkWrite(ops);
}

/**
 * Generate order number like VUL-2025-00001
 */
export async function generateOrderNumber() {
  await dbConnect();
  const year = new Date().getFullYear();
  const start = new Date(`${year}-01-01T00:00:00.000Z`);
  const count = await Order.countDocuments({ createdAt: { $gte: start } });
  const seq = String(count + 1).padStart(5, '0');
  return `VUL-${year}-${seq}`;
}
