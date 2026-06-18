import React from 'react';

function OrdersPage({
    products,
    orders,
    customers,
    orderForm,
    setOrderForm,
    handleOrderSubmit,
    editingOrderId,
    orderEditValues,
    startOrderEdit,
    cancelOrderEdit,
    handleOrderEditChange,
    saveOrderEdit,
    handleDeleteOrder,
}) {
    return (
        <div className="page-panel">
            <div className="page-header">
                <div>
                    <p className="page-title">Orders</p>
                    <p className="page-subtitle">Track order totals and status.</p>
                </div>
            </div>

            <div className="form-card accent-card alt">
                <h2>Create Order</h2>
                <p className="section-description">Add new orders with customer, total amount, and date.</p>
                <form onSubmit={handleOrderSubmit}>
                    <div className="field-grid">
                        <div className="field-group">
                            <label htmlFor="order-customer">Customer</label>
                            <select
                                id="order-customer"
                                value={orderForm.customer_id}
                                onChange={(e) => setOrderForm({ ...orderForm, customer_id: e.target.value })}
                                required
                            >
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field-group">
                            <label htmlFor="order-product">Product</label>
                            <select
                                id="order-product"
                                value={orderForm.product_id}
                                onChange={(e) => setOrderForm({ ...orderForm, product_id: e.target.value })}
                                required
                            >
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field-group">
                            <label htmlFor="order-total">Total</label>
                            <input
                                id="order-total"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={orderForm.total_amount}
                                onChange={(e) => setOrderForm({ ...orderForm, total_amount: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="field-grid">
                        <div className="field-group">
                            <label htmlFor="order-date">Date</label>
                            <input
                                id="order-date"
                                type="datetime-local"
                                value={orderForm.created_at}
                                onChange={(e) => setOrderForm({ ...orderForm, created_at: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="button-primary">Save Order</button>
                </form>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th className="table-cell-center">ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th className="table-cell-right">Total</th>
                            <th className="table-cell-center">Date</th>
                            <th className="table-cell-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="table-cell-center">{order.id}</td>
                                <td>
                                    {editingOrderId === order.id ? (
                                        <select value={orderEditValues.customer_id} onChange={(e) => handleOrderEditChange('customer_id', e.target.value)}>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        customers.find((customer) => customer.id === order.customer_id)?.full_name || order.customer_id
                                    )}
                                </td>
                                <td>
                                    {editingOrderId === order.id ? (
                                        <select value={orderEditValues.product_id} onChange={(e) => handleOrderEditChange('product_id', e.target.value)}>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        products.find((product) => product.id === order.product_id)?.name || order.product_id
                                    )}
                                </td>
                                <td className="table-cell-right">
                                    {editingOrderId === order.id ? (
                                        <input type="number" step="0.01" value={orderEditValues.total_amount} onChange={(e) => handleOrderEditChange('total_amount', e.target.value)} />
                                    ) : (
                                        `$${Number(order.total_amount).toFixed(2)}`
                                    )}
                                </td>
                                <td className="table-cell-center">
                                    {editingOrderId === order.id ? (
                                        <input type="datetime-local" value={orderEditValues.created_at} onChange={(e) => handleOrderEditChange('created_at', e.target.value)} />
                                    ) : (
                                        new Date(order.created_at).toLocaleString()
                                    )}
                                </td>
                                <td className="table-cell-end">
                                    {editingOrderId === order.id ? (
                                        <div className="table-actions">
                                            <button type="button" className="button-primary" onClick={saveOrderEdit}>Save</button>
                                            <button type="button" className="button-secondary" onClick={cancelOrderEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="table-actions">
                                            <button type="button" className="button-secondary" onClick={() => startOrderEdit(order)}>Edit</button>
                                            <button type="button" className="button-danger" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrdersPage;
