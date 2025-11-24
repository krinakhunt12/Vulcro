import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be >= 0'] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: [0, 'Stock cannot be negative'] },
    category: { type: String, required: [true, 'Category is required'] },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'At least one image URL is required',
      },
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot-reload in development
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
