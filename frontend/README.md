# 🛒 E-Commerce Web Application

A full-stack E-commerce web application with user authentication, product management, cart functionality, and admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Products
- Search Products (Frontend)
- Add to Cart
- Place Orders (COD & Online Payment)
- View Orders

### 🛠️ Admin Features
- Admin Dashboard
- Add / Update / Delete Products
- View Users
- Manage Orders

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Payment
- Razorpay Integration

---

## 📁 Project Structure
E-commerce-project/
│
├── backend/
│ ├── APIs/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── styles/common.js
│ ├── store/authStore.js
│ └── App.jsx
│
└── README.md




## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone 
cd E-CommerceProject

### backend
cd backend
npm install
Run Backend: node server.js

### frontend
cd frontend
npm install
npm run dev

### Payment Integration
Razorpay is used for online payments

### Supports:
UPI
Cards
Net Banking

### 🔐 Security Features
JWT Authentication
Protected Routes
Role-based Access (Admin/User)
Secure API Calls (withCredentials)

### 🚀 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

### 📌 Future Improvements
Product Search (Backend optimization)
Filters (Price, Brand)
Wishlist Feature
Order Tracking
Email Notifications

###👩‍💻 Author
Bogari Jyosna


## 🧪 API Testing

API endpoints were tested using REST Client (.http files) inside the backend folder.

You can use tools like VS Code REST Client or Postman to test APIs.