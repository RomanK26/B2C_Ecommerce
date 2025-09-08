
-----

# B2C E-commerce Platform

This is a full-stack B2C e-commerce platform built with **React** for the frontend and **Django REST Framework (DRF)** for the backend. It's designed to be a robust, scalable, and feature-rich application for managing an online store.

## 🚀 Features

  * **User Management:** Secure, role-based authentication and authorization for users, including customers and administrators.
  * **Admin Dashboard:** A dedicated interface for administrators to manage the store's content.

 * **Product Management:** Admins can add, edit, and delete products, including details like price, description, and images.

* **Category Management:** Admins have the ability to create and update product categories to keep the catalog organized.
  * **Product Catalog:** A comprehensive system for managing products, including detailed information, images, and categories.
  * **Shopping Cart:** Intuitive shopping cart functionality that allows users to add, update, and remove items.
  * **Responsive Design:** A seamless user experience across all devices, from desktops to mobile phones.

## 🛠️ Technology Stack

  * **Frontend:** **React** powered by **Redux Toolkit** for state management and **TanStack Query** for efficient data fetching and caching following feature sliced design pattern.
  * **Backend:** **Django REST Framework** following a **service-layer pattern** for clean separation of business logic.
  * **Database:** **PostgreSQL** for reliable and structured data storage.

## ⚙️ Getting Started

### 1\. Clone the repository

```bash
git clone https://github.com/RomanK26/B2C_Ecommerce.git
cd B2C_Ecommerce
```

### 2\. Set up environment variables

Create a `.env` file in the `server` directory and add the following:

```env
SECRET_KEY=your_django_secret
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/ecomdb
```

Then, create a `.env` file in the `client` directory and add the following:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

### 3\. Install dependencies

First, install the backend dependencies:

```bash
cd server/
uv sync
```

Next, install the frontend dependencies:

```bash
cd ../client/
npm install
```

### 4\. Run the development server

Start the backend server:

```bash
cd ../server/
uv run manage.py runserver
```

Open a new terminal and start the frontend development server:

```bash
cd ../client/
npm run dev
```

The application will be accessible at `http://localhost:5173`.

-----

## 📂 Folder Structure

```
/B2C_Ecommerce
├── /client      # Frontend (React) source code
└── /server      # Backend (Django) source code
```

-----

## 🤝 Contributing

Contributions are highly encouraged\! Feel free to open issues to report bugs or suggest new features, and submit pull requests to contribute directly to the project.

-----

## 📄 License

This project is licensed under the **MIT License**.