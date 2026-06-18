import React from 'react';

function ProductsPage({
    products,
    productForm,
    setProductForm,
    handleProductSubmit,
    editingProductId,
    productEditValues,
    startProductEdit,
    cancelProductEdit,
    handleProductEditChange,
    saveProductEdit,
    handleDeleteProduct,
}) {
    return (
        <div className="page-panel">
            <div className="page-header">
                <div>
                    <p className="page-title">Products</p>
                    <p className="page-subtitle">Manage stock, pricing and product details.</p>
                </div>
            </div>

            <div className="form-card accent-card">
                <h2>Create Product</h2>
                <p className="section-description">Add inventory items with SKU, price, and stock.</p>
                <form onSubmit={handleProductSubmit}>
                    <div className="field-group">
                        <label htmlFor="product-name">Product Name</label>
                        <input id="product-name" placeholder="Enter product name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="product-sku">SKU</label>
                        <input id="product-sku" placeholder="Enter SKU" value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} required />
                    </div>
                    <div className="field-grid">
                        <div className="field-group">
                            <label htmlFor="product-price">Price</label>
                            <input id="product-price" type="number" placeholder="0.00" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
                        </div>
                        <div className="field-group">
                            <label htmlFor="product-quantity">Quantity</label>
                            <input id="product-quantity" type="number" placeholder="Available stock" value={productForm.quantity_in_stock} onChange={(e) => setProductForm({ ...productForm, quantity_in_stock: e.target.value })} required />
                        </div>
                    </div>
                    <button type="submit" className="button-primary">Save Product</button>
                </form>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="table-cell-center">{product.id}</td>
                                <td>
                                    {editingProductId === product.id ? (
                                        <input value={productEditValues.name} onChange={(e) => handleProductEditChange('name', e.target.value)} />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {editingProductId === product.id ? (
                                        <input value={productEditValues.sku} onChange={(e) => handleProductEditChange('sku', e.target.value)} />
                                    ) : (
                                        product.sku
                                    )}
                                </td>
                                <td className="table-cell-right">
                                    {editingProductId === product.id ? (
                                        <input type="number" step="0.01" value={productEditValues.price} onChange={(e) => handleProductEditChange('price', e.target.value)} />
                                    ) : (
                                        `$${Number(product.price).toFixed(2)}`
                                    )}
                                </td>
                                <td className="table-cell-center">
                                    {editingProductId === product.id ? (
                                        <input type="number" value={productEditValues.quantity_in_stock} onChange={(e) => handleProductEditChange('quantity_in_stock', e.target.value)} />
                                    ) : (
                                        product.quantity_in_stock
                                    )}
                                </td>
                                <td className="table-cell-end">
                                    {editingProductId === product.id ? (
                                        <div className="table-actions">
                                            <button type="button" className="button-primary" onClick={saveProductEdit}>Save</button>
                                            <button type="button" className="button-secondary" onClick={cancelProductEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="table-actions">
                                            <button type="button" className="button-secondary" onClick={() => startProductEdit(product)}>Edit</button>
                                            <button type="button" className="button-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default ProductsPage;
