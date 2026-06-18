export const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://127.0.0.1:8000';

async function apiFetch(path, options = {}) {
    const response = await fetch(`${backendUrl}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`API request failed: ${response.status} ${message}`);
    }

    return response.status === 204 ? null : response.json();
}

export function checkBackendRoot() {
    return apiFetch('/');
}

export function getProducts() {
    return apiFetch('/products');
}

export function getCustomers() {
    return apiFetch('/customers');
}

export function getOrders() {
    return apiFetch('/orders');
}

export function createProduct(product) {
    return apiFetch('/products', {
        method: 'POST',
        body: product,
    });
}

export function updateProduct(id, product) {
    return apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: product,
    });
}

export function deleteProduct(id) {
    return apiFetch(`/products/${id}`, {
        method: 'DELETE',
    });
}

export function createCustomer(customer) {
    return apiFetch('/customers', {
        method: 'POST',
        body: customer,
    });
}

export function createOrder(order) {
    return apiFetch('/orders', {
        method: 'POST',
        body: order,
    });
}

export function updateCustomer(id, customer) {
    return apiFetch(`/customers/${id}`, {
        method: 'PUT',
        body: customer,
    });
}

export function deleteCustomer(id) {
    return apiFetch(`/customers/${id}`, {
        method: 'DELETE',
    });
}

export function updateOrder(id, order) {
    return apiFetch(`/orders/${id}`, {
        method: 'PUT',
        body: order,
    });
}

export function deleteOrder(id) {
    return apiFetch(`/orders/${id}`, {
        method: 'DELETE',
    });
}
