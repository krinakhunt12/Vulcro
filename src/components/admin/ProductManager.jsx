"use client";

import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/ToastProvider';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';

function ProductForm({ initial = null, onCancel, onSaved }) {
    const [form, setForm] = useState(() => ({
        name: '',
        description: '',
        price: '',
        sizes: [],
        colors: [],
        stock: 0,
        category: '',
        images: [],
        isFeatured: false,
    }));

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name || '',
                description: initial.description || '',
                price: initial.price ?? '',
                sizes: initial.sizes || [],
                colors: initial.colors || [],
                stock: initial.stock ?? 0,
                category: initial.category || '',
                images: initial.images || [],
                isFeatured: !!initial.isFeatured,
            });
        } else {
            setForm((s) => ({ ...s }));
        }
    }, [initial]);

    function handleChange(e) {
        const { name, value, type, checked, multiple, options } = e.target;
        if (multiple) {
            const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
            setForm((prev) => ({ ...prev, [name]: selected }));
            return;
        }
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }

    // file input state
    const [fileList, setFileList] = useState([]);

    function handleFilesChange(e) {
        const list = Array.from(e.target.files || []);
        setFileList(list);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // basic client-side validation
        if (!form.name || !form.description || form.price === '') {
            return alert('Please fill name, description and price');
        }

        let payload = {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            sizes: Array.isArray(form.sizes) ? form.sizes : (form.sizes ? form.sizes.split(',').map((s) => s.trim()).filter(Boolean) : []),
            colors: Array.isArray(form.colors) ? form.colors : (form.colors ? form.colors.split(',').map((c) => c.trim()).filter(Boolean) : []),
            stock: Number(form.stock) || 0,
            category: form.category,
                        images: Array.isArray(form.images)
                            ? form.images
                            : form.images
                            ? String(form.images).split(',').map((i) => i.trim()).filter(Boolean)
                            : [],
            isFeatured: !!form.isFeatured,
        };

        // If files were selected, upload them first to /api/uploads
        if (fileList && fileList.length > 0) {
            try {
                // convert files to base64
                const filesToSend = await Promise.all(
                    fileList.map((file) =>
                        new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve({ name: file.name, data: reader.result });
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        })
                    )
                );

                const uploadRes = await fetch('/api/uploads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ files: filesToSend }),
                });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData?.message || 'Upload failed');

                payload.images = Array.isArray(uploadData.files) ? uploadData.files : [];
            } catch (err) {
                alert('Image upload failed: ' + (err.message || err));
                return;
            }
        }

        try {
            if (initial && initial._id) {
                const res = await fetch(`/api/products/${initial._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.message || 'Failed to update');
            } else {
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.message || 'Failed to create');
            }

            onSaved && onSaved();
        } catch (err) {
            alert(err.message || 'Error');
        }
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" className="mt-1 w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Stock</label>
                        <input name="stock" value={form.stock} onChange={handleChange} type="number" className="mt-1 w-full px-3 py-2 border rounded" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select
                        options={[
                            { value: '', label: 'Select category' },
                            { value: 'Anarkali', label: 'Anarkali' },
                            { value: 'Straight', label: 'Straight' },
                            { value: 'A-Line', label: 'A-Line' },
                            { value: 'Designer', label: 'Designer' },
                            { value: 'Kurtis', label: 'Kurtis' },
                        ]}
                        value={form.category}
                        onChange={(v) => setForm((p) => ({ ...p, category: v }))}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Sizes (select one or more)</label>
                    <MultiSelect
 options={[
    { value: 'XXS', label: 'XXS' },
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
    { value: '3XL', label: '3XL' },
    { value: '4XL', label: '4XL' },
    { value: '5XL', label: '5XL' },
    { value: '6XL', label: '6XL' },

    // Numeric Sizes (Common in Indian Kurtis)
    // { value: '30', label: '30' },
    // { value: '32', label: '32' },
    // { value: '34', label: '34' },
    // { value: '36', label: '36' },
    // { value: '38', label: '38' },
    // { value: '40', label: '40' },
    // { value: '42', label: '42' },
    // { value: '44', label: '44' },
    // { value: '46', label: '46' },
    // { value: '48', label: '48' },
    // { value: '50', label: '50' },
  ]}
                        value={form.sizes}
                        onChange={(vals) => setForm((p) => ({ ...p, sizes: vals }))}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Colors (select one or more)</label>
                    <MultiSelect
                        options={[
                            { value: 'Red', label: 'Red' },
                            { value: 'Maroon', label: 'Maroon' },
                            { value: 'Wine', label: 'Wine' },
                            { value: 'Pink', label: 'Pink' },
                            { value: 'Baby Pink', label: 'Baby Pink' },
                            { value: 'Hot Pink', label: 'Hot Pink' },
                            { value: 'Peach', label: 'Peach' },
                            { value: 'Orange', label: 'Orange' },
                            { value: 'Rust', label: 'Rust' },
                            { value: 'Yellow', label: 'Yellow' },
                            { value: 'Mustard', label: 'Mustard' },
                            { value: 'Lemon Yellow', label: 'Lemon Yellow' },
                            { value: 'Green', label: 'Green' },
                            { value: 'Parrot Green', label: 'Parrot Green' },
                            { value: 'Mint', label: 'Mint' },
                            { value: 'Pista Green', label: 'Pista Green' },
                            { value: 'Mehendi Green', label: 'Mehendi Green' },
                            { value: 'Olive', label: 'Olive' },
                            { value: 'Dark Green', label: 'Dark Green' },
                            { value: 'Bottle Green', label: 'Bottle Green' },
                            { value: 'Blue', label: 'Blue' },
                            { value: 'Sky Blue', label: 'Sky Blue' },
                            { value: 'Royal Blue', label: 'Royal Blue' },
                            { value: 'Navy Blue', label: 'Navy Blue' },
                            { value: 'Turquoise', label: 'Turquoise' },
                            { value: 'Purple', label: 'Purple' },
                            { value: 'Lavender', label: 'Lavender' },
                            { value: 'Violet', label: 'Violet' },
                            { value: 'Brown', label: 'Brown' },
                            { value: 'Coffee', label: 'Coffee' },
                            { value: 'Beige', label: 'Beige' },
                            { value: 'Cream', label: 'Cream' },
                            { value: 'Off White', label: 'Off White' },
                            { value: 'White', label: 'White' },
                            { value: 'Black', label: 'Black' },
                            { value: 'Grey', label: 'Grey' },
                            { value: 'Charcoal Grey', label: 'Charcoal Grey' },
                            { value: 'Silver', label: 'Silver' },
                            { value: 'Gold', label: 'Gold' }
                        ]}
                        value={form.colors}
                        onChange={(vals) => setForm((p) => ({ ...p, colors: vals }))}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Upload images (select from computer)</label>
                    <input name="imagesfiles" onChange={handleFilesChange} multiple type="file" accept="image/*" className="mt-1 w-full" />
                </div>

                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                        <span className="text-sm">Featured</span>
                    </label>
                </div>

                <div className="flex items-center gap-3">
                    <Button type="submit">{initial ? 'Update product' : 'Create product'}</Button>
                    <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                </div>
            </form>
        </Card>
    );
}

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const toast = useToast();

    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || 'Failed to load');
            setProducts(data.products || []);
        } catch (err) {
            setError(err.message || 'Error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete(id) {
        if (!confirm('Delete this product?')) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || 'Delete failed');
            toast?.push({ title: 'Deleted', description: 'Product deleted' });
            fetchProducts();
        } catch (err) {
            alert(err.message || 'Error deleting');
        }
    }

    function openCreate() {
        setEditing(null);
        setShowForm(true);
    }

    function openEdit(product) {
        setEditing(product);
        setShowForm(true);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Products</h2>
                    <p className="text-sm text-gray-500">Manage catalog — add, update, delete products</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={openCreate} className="flex items-center gap-2">
                        <span className="text-sm">Add New Product</span>
                    </Button>
                    <Button variant="ghost" onClick={fetchProducts}>Refresh</Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <input placeholder="Search products..." className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Product</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Image</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Category</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Price</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Stock</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Sizes / Colors</th>
                                <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">Loading...</td>
                                </tr>
                            )}
                            {!loading && products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">No products found</td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-800">{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.description?.slice(0, 80)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.images && product.images[0] ? (
                                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{product.category}</span></td>
                                    <td className="px-6 py-4"><span className="text-sm font-semibold">₹{product.price}</span></td>
                                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{product.stock}</span></td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700">
                                            <div>Sizes: {(product.sizes || []).join(', ') || '-'}</div>
                                            <div>Colors: {(product.colors || []).join(', ') || '-'}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(product)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(product._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
                    <div className="bg-black/50 absolute inset-0 z-[9998]" onClick={() => setShowForm(false)} />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[9999]">
                        <ProductForm initial={editing} onCancel={() => setShowForm(false)} onSaved={() => { setShowForm(false); fetchProducts(); }} />
                    </div>
                </div>
            )}
        </div>
    );
}
