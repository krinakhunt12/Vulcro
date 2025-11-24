import Link from 'next/link';

export const metadata = {
  title: 'Order Success — VULCRO',
  description: 'Your order has been placed. Thank you for shopping with VULCRO — Surat kurti atelier.',
};

export default async function OrderSuccessPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.orderId;
  const orderNumber = params?.orderNumber;

  let order = null;

  if (orderId) {
    try {
      // Attempt server-side fetch to the internal API route.
      // Use a base of empty string so fetch resolves to the same host in Next server.
      const base = process.env.NEXT_PUBLIC_SITE_URL || '';
      const res = await fetch(`${base}/api/orders/${orderId}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json().catch(() => null);
        order = json?.data || null;
      }
    } catch (e) {
      // swallow — we'll render a friendly fallback below
      // console.error('Order fetch failed', e);
      order = null;
    }
  }

  const displayId = order?.orderNumber || order?.id || orderId || orderNumber || '—';

  const items = order?.items || [];
  const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.quantity || it.qty) || 1), 0);

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center py-20">
      <div className="w-full max-w-3xl px-6">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mx-auto">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>

          <p className="text-gray-700 max-w-xl mx-auto">Thank you — your order is confirmed. We’ll send updates and tracking information to your email and phone. You can view your orders or continue shopping.</p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* Order summary card */}
          <div className="card p-6 rounded-lg border border-gray-50 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600">Order ID</div>
                <div className="font-medium">{displayId}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Estimated delivery</div>
                <div className="text-right font-medium">{order?.deliveryEstimate || '3–5 business days'}</div>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {items.length === 0 ? (
                <div className="text-sm text-gray-500 py-4">No order items available to display.</div>
              ) : (
                items.map((it, idx) => (
                  <div key={it.productId || it.id || idx} className="flex items-center gap-4 py-3">
                    {it.images && it.images[0] ? (
                      // images stored on order item
                      // use the first image if available
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.images[0]} alt={it.title || it.name || 'product'} width={96} height={96} className="w-24 h-24 object-cover rounded-md" />
                    ) : it.image ? (
                      // legacy single image
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt={it.title || it.name || 'product'} width={96} height={96} className="w-24 h-24 object-cover rounded-md" />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-md" />
                    )}

                    <div className="flex-1">
                      <div className="font-medium">{it.title || it.name || (it.product && it.product.title) || 'Product'}</div>
                      <div className="text-sm text-gray-600 mt-1">Qty: {it.quantity || it.qty || 1}</div>
                    </div>

                    <div className="font-semibold">₹{Number(it.price || it.product?.price || 0)}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between text-sm">
              <div>Subtotal</div>
              <div>₹{subtotal}</div>
            </div>
          </div>

          {/* Progress tracker */}
          <div className="card p-4 rounded-lg border border-gray-50 shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex-1 flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-3 w-full">
                    {/* Step 1 - Placed (active) */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
                      <div>
                        <div className="font-medium">Placed</div>
                        <div className="text-xs text-gray-500">Order confirmed</div>
                      </div>
                    </div>

                    {/* Line */}
                    <div className="flex-1 h-px bg-gray-100 mx-4" />

                    {/* Step 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">2</div>
                      <div>
                        <div className="font-medium">Packed</div>
                        <div className="text-xs text-gray-500">Preparing shipment</div>
                      </div>
                    </div>

                    <div className="flex-1 h-px bg-gray-100 mx-4" />

                    {/* Step 3 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">3</div>
                      <div>
                        <div className="font-medium">Shipped</div>
                        <div className="text-xs text-gray-500">On the way</div>
                      </div>
                    </div>

                    <div className="flex-1 h-px bg-gray-100 mx-4" />

                    {/* Step 4 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">4</div>
                      <div>
                        <div className="font-medium">Delivered</div>
                        <div className="text-xs text-gray-500">Delivered to you</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 justify-center">
            <Link href="/account/orders">
              <button className="px-6 py-3 btn-outline rounded-md">Go to Orders</button>
            </Link>

            <Link href="/shop">
              <button className="px-6 py-3 btn-primary rounded-md">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
