import React from 'react';

function DashboardPage({ products, customers, orders }) {
    const lowStock = products.filter((product) => product.quantity <= 5).length;

    return (
        <section className="dashboard-grid">
            <div className="stat-card card-purple">
                <div>
                    <p className="stat-label">Total Products</p>
                    <h2>{products.length}</h2>
                </div>
            </div>
            <div className="stat-card card-teal">
                <div>
                    <p className="stat-label">Total Customers</p>
                    <h2>{customers.length}</h2>
                </div>
            </div>
            <div className="stat-card card-orange">
                <div>
                    <p className="stat-label">Total Orders</p>
                    <h2>{orders.length}</h2>
                </div>
            </div>
            <div className="stat-card card-pink">
                <div>
                    <p className="stat-label">Low Stock Items</p>
                    <h2>{lowStock}</h2>
                </div>
            </div>
        </section>
    );
}

export default DashboardPage;
