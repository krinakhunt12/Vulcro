Product Management API
======================

Routes (App Router)
- `POST /api/products` → Create product (admin only placeholder)
- `GET  /api/products` → List products with query filters (`category`, `minPrice`, `maxPrice`, `search`)
- `GET  /api/products/[id]` → Get single product
- `PUT  /api/products/[id]` → Update product (admin only placeholder)
- `DELETE /api/products/[id]` → Delete product (admin only placeholder)

Notes & Best Practices
- The project uses a reusable `dbConnect` helper at `src/lib/dbConnect.js` to avoid multiple Mongoose connections during dev hot-reload.
- The Mongoose model is in `src/models/Product.js`.
- All handlers return JSON in the shape:
  - Success: `{ success: true, message: '...', product? }`
  - Error: `{ success: false, message: '...' }`
- Security: The routes include `// TODO: Validate admin token here` comments. Replace with your auth middleware or token validation logic (HTTP-only cookie or bearer token) before using in production.
- Validation: The schema validates required fields. The POST route also checks for presence of required fields to return friendly errors.
- Pagination & Performance: For large catalogs add pagination (limit/skip or cursor-based) rather than returning all products at once. Add indexes on fields you filter by (e.g., `category`, `price`, `name`).
- File uploads: Currently images are stored as arrays of URLs. For real uploads integrate with S3/Cloudinary and store the returned URLs.

Example: Create product (curl)

```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Kurti A","description":"Lovely kurti","price":29.99,"category":"kurtis","images":["/images/kurti1.jpg"]}'
```
