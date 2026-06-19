# Inventory Frontend

A lightweight React + Vite frontend for an inventory management app. It provides:

- Products management with quantity tracking
- Customers management
- Order creation and editing
- A dashboard summarizing products, customers, orders, and low-stock items

## Tech Stack

- React 18
- Vite
- JavaScript (ESM)

## Project Structure

- `src/`
  - `App.jsx` — main app shell and state management
  - `main.jsx` — app entry point
  - `api.js` — backend API helper functions
  - `components/`
    - `Sidebar.jsx` — navigation sidebar
    - `DashboardPage.jsx` — dashboard view
    - `ProductsPage.jsx` — products CRUD UI
    - `CustomersPage.jsx` — customers CRUD UI
    - `OrdersPage.jsx` — orders CRUD UI
  - `hooks/`
    - `useEditableList.js` — reusable editable list hook
- `public/` — static assets
- `index.html` — Vite app shell
- `package.json` — project metadata and scripts
- `vite.config.js` — Vite configuration

## Setup

```bash
cd d:/inventory/frontend
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Notes

- The app uses fallback data when backend fetches fail.
- Product quantity is stored under `quantity`.
- The app is configured as an ESM module via `type: "module"` in `package.json`.
