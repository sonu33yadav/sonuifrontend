import React from 'react';

function CustomersPage({
    customers,
    customerForm,
    setCustomerForm,
    handleCustomerSubmit,
    editingCustomerId,
    customerEditValues,
    startCustomerEdit,
    cancelCustomerEdit,
    handleCustomerEditChange,
    saveCustomerEdit,
    handleDeleteCustomer,
}) {
    return (
        <div className="page-panel">
            <div className="page-header">
                <div>
                    <p className="page-title">Customers</p>
                    <p className="page-subtitle">Customer contacts and profiles.</p>
                </div>
            </div>

            <div className="form-card accent-card alt">
                <h2>Add Customer</h2>
                <p className="section-description">Store customer contact details for order processing.</p>
                <form onSubmit={handleCustomerSubmit}>
                    <div className="field-group">
                        <label htmlFor="customer-name">Full Name</label>
                        <input id="customer-name" placeholder="Enter full name" value={customerForm.full_name} onChange={(e) => setCustomerForm({ ...customerForm, full_name: e.target.value })} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="customer-email">Email</label>
                        <input id="customer-email" type="email" placeholder="hello@example.com" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })} required />
                    </div>
                    <div className="field-grid">
                        <div className="field-group">
                            <label htmlFor="customer-phone">Phone</label>
                            <input id="customer-phone" placeholder="Enter phone number" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} required />
                        </div>
                    </div>
                    <button type="submit" className="button-primary">Save Customer</button>
                </form>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="table-cell-center">{customer.id}</td>
                                <td>
                                    {editingCustomerId === customer.id ? (
                                        <input value={customerEditValues.full_name} onChange={(e) => handleCustomerEditChange('full_name', e.target.value)} />
                                    ) : (
                                        customer.full_name
                                    )}
                                </td>
                                <td>
                                    {editingCustomerId === customer.id ? (
                                        <input type="email" value={customerEditValues.email} onChange={(e) => handleCustomerEditChange('email', e.target.value)} />
                                    ) : (
                                        customer.email
                                    )}
                                </td>
                                <td className="table-cell-center">
                                    {editingCustomerId === customer.id ? (
                                        <input value={customerEditValues.phone} onChange={(e) => handleCustomerEditChange('phone', e.target.value)} />
                                    ) : (
                                        customer.phone
                                    )}
                                </td>
                                <td className="table-cell-end">
                                    {editingCustomerId === customer.id ? (
                                        <div className="table-actions">
                                            <button type="button" className="button-primary" onClick={saveCustomerEdit}>Save</button>
                                            <button type="button" className="button-secondary" onClick={cancelCustomerEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="table-actions">
                                            <button type="button" className="button-secondary" onClick={() => startCustomerEdit(customer)}>Edit</button>
                                            <button type="button" className="button-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
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

export default CustomersPage;
