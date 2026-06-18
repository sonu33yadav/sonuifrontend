import React from 'react';

const navItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'products', label: 'Products' },
    { key: 'customers', label: 'Customers' },
    { key: 'orders', label: 'Orders' },
];

function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <div className="brand-bar">
                <span>InventoryHub</span>
            </div>
            <nav>
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        className={activePage === item.key ? 'nav-button active' : 'nav-button'}
                        onClick={() => setActivePage(item.key)}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
