import { NextResponse } from 'next/server';

// Dev-only mock wishlist endpoint. Replace with DB-backed implementation in production.
export async function GET() {
  const sample = [
    {
      id: 'w1',
      name: 'Embroidered Cotton Kurti',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'w2',
      name: 'Handloom Kurti - Pastel',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1520975913063-8f9efc6d4b59?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'w3',
      name: 'Silk Blend Kurti',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1520975682161-0c1a6b8d3c2b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'w4',
      name: 'Block Print A-line Kurti',
      price: 999,
      image: 'https://images.unsplash.com/photo-1520975913063-8f9efc6d4b59?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return NextResponse.json({ success: true, items: sample });
}
