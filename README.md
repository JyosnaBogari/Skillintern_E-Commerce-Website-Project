# 🛒 E-Commerce Web Application

A full-stack E-commerce web application with user authentication, product management, cart functionality, and admin dashboard.

---



## 🌐 Live Demo

Frontend:https://skillintern-e-commerce-website-proj.vercel.app
Backend API: https://skillintern-e-commerce-website.onrender.com

### The backend is deployed on Render (Free Tier).

The server may go into sleep mode after inactivity
First request can take 30–60 seconds to respond

👉 Please wait for a moment if data doesn’t load initially.


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

### Payment Integration
Razorpay is used for online payments.

Install Razorpay package:
```bash
npm install razorpay
### Supports:
UPI
Cards
Net Banking


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
git clone https://github.com/JyosnaBogari/Skillintern_E-Commerce-Website-Project
cd E-CommerceProject

### backend
cd backend
npm install
Run Backend: node server.js

### frontend
cd frontend
npm install
npm run dev


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

### 👩‍💻 Author
Bogari Jyosna


## 🧪 API Testing
API endpoints were tested using REST Client (.http files) inside the backend folder.
You can use tools like VS Code REST Client or Postman to test APIs.

### 🔑 Environment Variables Section
Create a `.env` file in the backend folder and add:

PORT=3000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret