import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import ProductsPage from './components/ProductsPage';
import CustomersPage from './components/CustomersPage';
import OrdersPage from './components/OrdersPage';
import { createCustomer as apiCreateCustomer, createOrder as apiCreateOrder, createProduct as apiCreateProduct, deleteCustomer as apiDeleteCustomer, deleteOrder as apiDeleteOrder, deleteProduct as apiDeleteProduct, getCustomers, getOrders, getProducts, updateCustomer as apiUpdateCustomer, updateOrder as apiUpdateOrder, updateProduct as apiUpdateProduct } from './api';

const fallbackProducts = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-010', price: 29.99, quantity: 25 },
    { id: 2, name: 'Keyboard', sku: 'KB-120', price: 49.99, quantity: 12 },
];

const fallbackCustomers = [
    { id: 1, full_name: 'Emma Johnson', email: 'emma.johnson@example.com', phone: '555-0100' },
    { id: 2, full_name: 'Liam Carter', email: 'liam.carter@example.com', phone: '555-0101' },
];

const fallbackOrders = [
    { id: 1, customer_id: 1, product_id: 1, total_amount: 129.95, created_at: '2026-06-15T10:20:00' },
    { id: 2, customer_id: 2, product_id: 2, total_amount: 49.99, created_at: '2026-06-16T14:30:00' },
];

function App() {
    const [activePage, setActivePage] = useState('dashboard');
    const [products, setProducts] = useState(fallbackProducts);
    const [customers, setCustomers] = useState(fallbackCustomers);
    const [orders, setOrders] = useState(fallbackOrders);
    const [productForm, setProductForm] = useState({
        name: '',
        sku: '',
        price: '',
        quantity: '',
    });
    const [customerForm, setCustomerForm] = useState({
        full_name: '',
        email: '',
        phone: '',
    });
    const [orderForm, setOrderForm] = useState({
        customer_id: customers.length > 0 ? customers[0].id : '',
        product_id: products.length > 0 ? products[0].id : '',
        total_amount: '',
        created_at: new Date().toISOString().slice(0, 16),
    });
    const [editingProductId, setEditingProductId] = useState(null);
    const [productEditValues, setProductEditValues] = useState({
        name: '',
        sku: '',
        price: '',
        quantity: '',
    });
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [customerEditValues, setCustomerEditValues] = useState({
        full_name: '',
        email: '',
        phone: '',
    });
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [orderEditValues, setOrderEditValues] = useState({
        customer_id: '',
        total_amount: '',
        created_at: '',
    });

    useEffect(() => {
        async function loadData() {
            try {
                const [backendProducts, backendCustomers, backendOrders] = await Promise.all([
                    getProducts(),
                    getCustomers(),
                    getOrders(),
                ]);

                setProducts(backendProducts ?? fallbackProducts);
                setCustomers(backendCustomers ?? fallbackCustomers);
                setOrders(backendOrders ?? fallbackOrders);
            } catch (error) {
                console.warn('Backend fetch failed, using fallback data.', error);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (customers.length && !orderForm.customer_id) {
            setOrderForm((prev) => ({
                ...prev,
                customer_id: customers[0].id,
            }));
        }
    }, [customers, orderForm.customer_id]);

    useEffect(() => {
        if (products.length && !orderForm.product_id) {
            setOrderForm((prev) => ({
                ...prev,
                product_id: products[0].id,
            }));
        }
    }, [products, orderForm.product_id]);

    const handleProductSubmit = async (event) => {
        event.preventDefault();

        const nextProduct = {
            id: products.length + 1,
            name: productForm.name,
            sku: productForm.sku,
            price: Number(productForm.price),
            quantity: Number(productForm.quantity),
        };

        try {
            const createdProduct = await apiCreateProduct(nextProduct);
            setProducts([...products, createdProduct]);
        } catch (error) {
            console.warn('Failed to save product to backend, keeping local copy.', error);
            setProducts([...products, nextProduct]);
        }

        setProductForm({ name: '', sku: '', price: '', quantity: '' });
    };

    const handleCustomerSubmit = async (event) => {
        event.preventDefault();

        const nextCustomer = {
            id: customers.length + 1,
            full_name: customerForm.full_name,
            email: customerForm.email,
            phone: customerForm.phone,
        };

        try {
            const createdCustomer = await apiCreateCustomer(nextCustomer);
            setCustomers([...customers, createdCustomer]);
        } catch (error) {
            console.warn('Failed to save customer to backend, keeping local copy.', error);
            setCustomers([...customers, nextCustomer]);
        }

        setCustomerForm({ full_name: '', email: '', phone: '' });
    };

    const handleOrderSubmit = async (event) => {
        event.preventDefault();

        const nextOrder = {
            id: orders.length + 1,
            customer_id: Number(orderForm.customer_id),
            product_id: Number(orderForm.product_id),
            total_amount: Number(orderForm.total_amount),
            created_at: new Date(orderForm.created_at).toISOString(),
        };

        try {
            const createdOrder = await apiCreateOrder(nextOrder);
            setOrders([...orders, createdOrder]);
        } catch (error) {
            console.warn('Failed to save order to backend, keeping local copy.', error);
            setOrders([...orders, nextOrder]);
        }

        setOrderForm({
            customer_id: customers.length > 0 ? customers[0].id : '',
            product_id: products.length > 0 ? products[0].id : '',
            total_amount: '',
            created_at: new Date().toISOString().slice(0, 16),
        });
    };

    const startProductEdit = (product) => {
        setEditingProductId(product.id);
        setProductEditValues({
            name: product.name,
            sku: product.sku,
            price: product.price,
            quantity: product.quantity,
        });
    };

    const cancelProductEdit = () => {
        setEditingProductId(null);
        setProductEditValues({ name: '', sku: '', price: '', quantity: '' });
    };

    const handleProductEditChange = (field, value) => {
        setProductEditValues((prev) => ({ ...prev, [field]: value }));
    };

    const saveProductEdit = async () => {
        if (editingProductId === null) return;

        const updatedProduct = {
            ...productEditValues,
            price: Number(productEditValues.price),
            quantity: Number(productEditValues.quantity),
        };

        try {
            const result = await apiUpdateProduct(editingProductId, updatedProduct);
            setProducts((prev) => prev.map((item) => (item.id === editingProductId ? result : item)));
        } catch (error) {
            console.warn('Product update failed, applying local update.', error);
            setProducts((prev) => prev.map((item) => (item.id === editingProductId ? { ...item, ...updatedProduct } : item)));
        }

        cancelProductEdit();
    };

    const startCustomerEdit = (customer) => {
        setEditingCustomerId(customer.id);
        setCustomerEditValues({
            full_name: customer.full_name,
            email: customer.email,
            phone: customer.phone,
        });
    };

    const cancelCustomerEdit = () => {
        setEditingCustomerId(null);
        setCustomerEditValues({ full_name: '', email: '', phone: '' });
    };

    const handleCustomerEditChange = (field, value) => {
        setCustomerEditValues((prev) => ({ ...prev, [field]: value }));
    };

    const saveCustomerEdit = async () => {
        if (editingCustomerId === null) return;

        const updatedCustomer = { ...customerEditValues };

        try {
            const result = await apiUpdateCustomer(editingCustomerId, updatedCustomer);
            setCustomers((prev) => prev.map((item) => (item.id === editingCustomerId ? result : item)));
        } catch (error) {
            console.warn('Customer update failed, applying local update.', error);
            setCustomers((prev) => prev.map((item) => (item.id === editingCustomerId ? { ...item, ...updatedCustomer } : item)));
        }

        cancelCustomerEdit();
    };

    const startOrderEdit = (order) => {
        setEditingOrderId(order.id);
        setOrderEditValues({
            customer_id: order.customer_id,
            product_id: order.product_id ?? products[0]?.id,
            total_amount: order.total_amount,
            created_at: new Date(order.created_at).toISOString().slice(0, 16),
        });
    };

    const cancelOrderEdit = () => {
        setEditingOrderId(null);
        setOrderEditValues({ customer_id: '', total_amount: '', created_at: '' });
    };

    const handleOrderEditChange = (field, value) => {
        setOrderEditValues((prev) => ({ ...prev, [field]: value }));
    };

    const saveOrderEdit = async () => {
        if (editingOrderId === null) return;

        const updatedOrder = {
            ...orderEditValues,
            customer_id: Number(orderEditValues.customer_id),
            total_amount: Number(orderEditValues.total_amount),
        };

        try {
            const result = await apiUpdateOrder(editingOrderId, updatedOrder);
            setOrders((prev) => prev.map((item) => (item.id === editingOrderId ? result : item)));
        } catch (error) {
            console.warn('Order update failed, applying local update.', error);
            setOrders((prev) => prev.map((item) => (item.id === editingOrderId ? { ...item, ...updatedOrder } : item)));
        }

        cancelOrderEdit();
    };

    const handleProductDelete = async (id) => {
        try {
            await apiDeleteProduct(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (error) {
            console.warn('Failed to delete product from backend, removing locally.', error);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        }
    };

    const handleCustomerDelete = async (id) => {
        try {
            await apiDeleteCustomer(id);
            setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        } catch (error) {
            console.warn('Failed to delete customer from backend, removing locally.', error);
            setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        }
    };

    const handleOrderDelete = async (id) => {
        try {
            await apiDeleteOrder(id);
            setOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (error) {
            console.warn('Failed to delete order from backend, removing locally.', error);
            setOrders((prev) => prev.filter((order) => order.id !== id));
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'products':
                return (
                    <ProductsPage
                        products={products}
                        productForm={productForm}
                        setProductForm={setProductForm}
                        handleProductSubmit={handleProductSubmit}
                        editingProductId={editingProductId}
                        productEditValues={productEditValues}
                        startProductEdit={startProductEdit}
                        cancelProductEdit={cancelProductEdit}
                        handleProductEditChange={handleProductEditChange}
                        saveProductEdit={saveProductEdit}
                        handleDeleteProduct={handleProductDelete}
                    />
                );
            case 'customers':
                return (
                    <CustomersPage
                        customers={customers}
                        customerForm={customerForm}
                        setCustomerForm={setCustomerForm}
                        handleCustomerSubmit={handleCustomerSubmit}
                        editingCustomerId={editingCustomerId}
                        customerEditValues={customerEditValues}
                        startCustomerEdit={startCustomerEdit}
                        cancelCustomerEdit={cancelCustomerEdit}
                        handleCustomerEditChange={handleCustomerEditChange}
                        saveCustomerEdit={saveCustomerEdit}
                        handleDeleteCustomer={handleCustomerDelete}
                    />
                );
            case 'orders':
                return (
                    <OrdersPage
                        products={products}
                        orders={orders}
                        customers={customers}
                        orderForm={orderForm}
                        setOrderForm={setOrderForm}
                        handleOrderSubmit={handleOrderSubmit}
                        editingOrderId={editingOrderId}
                        orderEditValues={orderEditValues}
                        startOrderEdit={startOrderEdit}
                        cancelOrderEdit={cancelOrderEdit}
                        handleOrderEditChange={handleOrderEditChange}
                        saveOrderEdit={saveOrderEdit}
                        handleDeleteOrder={handleOrderDelete}
                    />
                );
            case 'dashboard':
            default:
                return <DashboardPage products={products} customers={customers} orders={orders} />;
        }
    };

    return (
        <div className="app-shell">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="app-content">{renderPage()}</main>
        </div>
    );
}

export default App;
