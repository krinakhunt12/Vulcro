// Quick script to check whether a product with a given ObjectId exists
// Usage (PowerShell):
// $env:MONGODB_URI = "your uri"; node scripts/checkProduct.js 69242c8eb8a0426336c49edd

const { MongoClient, ObjectId } = require('mongodb');

async function main() {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: node scripts/checkProduct.js <productId>');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set in environment. Set it and retry.');
    process.exit(1);
  }

  // Newer mongodb drivers ignore/use different options; avoid passing
  // legacy `useUnifiedTopology` which causes a parse error.
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collNames = await db.listCollections().toArray();
    const names = collNames.map(c => c.name);
    console.log('Collections in DB:', names.join(', '));

    const products = db.collection('products');
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      // not a valid ObjectId, also try matching by string id or slug
      query = { $or: [ { id: id }, { slug: id }, { _id: id } ] };
    }

    const doc = await products.findOne(query);
    if (!doc) {
      console.log('Product not found for id:', id);
      process.exit(2);
    }

    console.log('Product found:');
    console.log(JSON.stringify(doc, null, 2));
  } catch (err) {
    console.error('Error querying DB:', err);
    process.exit(3);
  } finally {
    await client.close();
  }
}

main();
