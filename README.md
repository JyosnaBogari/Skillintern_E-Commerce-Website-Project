# 🛒 E-Commerce Web Application

A full-stack E-commerce web application with user authentication, product management, cart functionality, and admin dashboard built with React, Node.js, Express, and MongoDB.

---

## 🌐 Live Demo

- **Frontend**: [https://skillintern-e-commerce-website-proj.vercel.app](https://skillintern-e-commerce-website-proj.vercel.app)
- **Backend API**: [https://skillintern-e-commerce-website.onrender.com](https://skillintern-e-commerce-website.onrender.com)

> **Note**: The backend is deployed on Render (Free Tier). The server may go into sleep mode after inactivity. First request can take 30–60 seconds to respond. Please wait for a moment if data doesn't load initially.

---

## 🚀 Features

### 👤 User Features
- ✅ User Registration & Login (JWT Authentication)
- ✅ Browse Products with Search & Filters
- ✅ Add to Cart & Wishlist
- ✅ Place Orders (COD & Online Payment via Razorpay)
- ✅ View Order History
- ✅ Responsive Design

### 🛠️ Admin Features
- ✅ Admin Dashboard with Statistics
- ✅ Add / Update / Delete Products
- ✅ Manage Users & Orders
- ✅ Image Upload to Cloudinary
- ✅ Secure Admin Routes

---

## 🏗️ Tech Stack

### Frontend
- **React.js** - UI Framework
- **React Router** - Client-side Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **Zustand** - State Management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Cloudinary** - Image Storage
- **Multer** - File Upload
- **Razorpay** - Payment Gateway

### Deployment
- **Vercel** - Frontend
- **Render** - Backend

---

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

---

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Skillintern_E-Commerce-Website-Project.git
cd Skillintern_E-Commerce-Website-Project
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Variables
Create a `.env` file in the `backend` folder and add:
```env
DB_URL=mongodb://localhost:27017/E-commerceProject
PORT=3000
SECRET_KEY=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

#### Cloudinary Setup
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to `.env` file

#### Razorpay Setup (for payments)
1. Create account at [razorpay.com](https://razorpay.com)
2. Get Test API Keys
3. Add to `.env` file

#### Run Backend
```bash
npm start
# or for development
npx nodemon server.js
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Run Frontend
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 📁 Project Structure

```
├── backend/
│   ├── APIs/           # API routes
│   ├── config/         # Configuration files
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # MongoDB models
│   ├── Services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── server.js       # Main server file
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── config/     # API configuration
│   │   ├── store/      # Zustand stores
│   │   ├── styles/     # Styling
│   │   └── main.jsx    # App entry point
│   └── package.json
└── README.md
```

---

## 🔐 API Endpoints

### Authentication
- `POST /common-api/authenticate` - Login
- `POST /user-api/users` - Register

### Products
- `GET /product-api/products` - Get all products
- `GET /product-api/product-id/:id` - Get single product
- `POST /product-api/products` - Add product (Admin)
- `PUT /product-api/update-product/:id` - Update product (Admin)

### Cart
- `PUT /user-api/user-cart/:id` - Add to cart
- `GET /user-api/user-cart` - Get cart items
- `DELETE /user-api/remove-cart/:id` - Remove from cart

### Orders
- `POST /order-api/orders` - Place order
- `GET /admin-api/orders` - Get all orders (Admin)

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Cart persistence after login
- [ ] Order placement
- [ ] Admin product management
- [ ] Image upload to Cloudinary
- [ ] Responsive design on mobile/desktop

### API Testing
Use tools like Postman or Thunder Client to test endpoints.

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Render)
1. Create account on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Jyosna Bogari**
- GitHub: [your-github-username](https://github.com/your-github-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- React documentation
- Tailwind CSS
- MongoDB documentation
- Cloudinary documentation
- Razorpay integration guides
- MongoDB (Mongoose)


### install packages
npm install express dotenv mongoose nodemon brcyptjs jsonwebtoken cookie-parser

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