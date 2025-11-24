// Centralized product dataset for Vulcro
// Each product contains detailed description, pricing, sizes, materials, category and multiple Unsplash images

const products = [
  {
    id: 1,
    slug: 'embroidered-pastel-kurti-set',
    title: 'Embroidered Pastel Kurti Set',
    description:
      'A premium stitched kurti set featuring delicate thread embroidery, mirror accents, and a light breathable lining. Cut for a relaxed fit with a gently flared hem that flatters every silhouette. Finished with hand-stitched hems and artisan detailing.',
    price: 2899,
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Cotton Blend', 'Embroidered Details'],
    category: 'Designer',
    stock: 24,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 2,
    slug: 'handloom-silk-blend-kurti',
    title: 'Handloom Silk-Blend Kurti',
    description:
      'Handloom silk-blend kurti with subtle zari highlights and a structured silhouette ideal for festive occasions. The fabric drapes beautifully and the kurti is fully lined for comfort.',
    price: 3499,
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Silk Blend', 'Zari Accents'],
    category: 'Festive',
    stock: 12,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55f82?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 3,
    slug: 'printed-a-line-kurti',
    title: 'Printed A-Line Kurti',
    description:
      'Lightweight printed A-line kurti crafted from premium cotton with a subtle slub texture. Easy-to-wear everyday piece that pairs well with denim or palazzos. Machine washable and low maintenance.',
    price: 1799,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Cotton'],
    category: 'Casual',
    stock: 48,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 4,
    slug: 'cotton-printed-kurti',
    title: 'Cotton Printed Kurti',
    description:
      'Classic cotton printed kurti with breathable hand-feel and clean finishes. Designed for everyday wear — pairs beautifully with contrasting dupattas or palazzos.',
    price: 799,
    sizes: ['S', 'M', 'L'],
    materials: ['100% Cotton'],
    category: 'Daily Wear',
    stock: 120,
    rating: 4.3,
    images: [
      'https://images.unsplash.com/photo-1503342452485-86f7bff8d8e6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495121605193-b116b5b09a12?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 5,
    slug: 'floral-print-kurti',
    title: 'Floral Print Kurti',
    description:
      'Romantic floral print kurti with soft pastel tones and a relaxed silhouette. Hand-stitched neckline and matched piping at the cuffs.',
    price: 1499,
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Cotton Rayon Blend'],
    category: 'Casual',
    stock: 34,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 6,
    slug: 'silk-blend-kurti',
    title: 'Silk Blend Kurti',
    description:
      'Elegant silk-blend kurti crafted with expert tailoring and a subtle sheen. Ideal for receptions and evening events; pairs with our silk palazzo for a coordinated look.',
    price: 3299,
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Silk Blend'],
    category: 'Festive',
    stock: 18,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 7,
    slug: 'anarkali-kurti-set',
    title: 'Anarkali Kurti Set',
    description:
      'Flowing Anarkali kurti set with layered flare and embroidered bodice. Lined skirt and breathable top layer for all-day comfort during celebrations.',
    price: 2499,
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Cotton Blend', 'Embroidery'],
    category: 'Anarkali',
    stock: 9,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 8,
    slug: 'hand-embroidered-kurti',
    title: 'Hand Embroidered Kurti',
    description:
      'Artisan hand-embroidered kurti with fine motif work and reinforced seam finishes. A slow-crafted piece designed to last and become softer with wear.',
    price: 2999,
    sizes: ['S', 'M', 'L'],
    materials: ['Cotton', 'Hand Embroidery'],
    category: 'Designer',
    stock: 6,
    rating: 4.85,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export default products;
