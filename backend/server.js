import exp from 'express';
import { connect } from "mongoose";
import { config } from 'dotenv';
import { paymentRoute } from "./APIs/paymentAPI.js";
import { userRoute } from "./APIs/userAPI.js";
import { commonRoute } from './APIs/commonAPI.js';
import { adminRoute } from './APIs/adminAPI.js';
import { productRoute } from './APIs/productAPI.js';
import {testRoute} from './APIs/testAPI.js'
import cookieParser from 'cookie-parser';
import { OrderRoute } from './APIs/orderAPI.js';
import cors from 'cors';
config();

//create express application
const app = exp();
//add cors
// app.use(cors({origin: ['https://skillintern-e-commerce-website-proj.vercel.app'],credentials:true}));
app.use(cors({
  origin: [
    "https://skillintern-e-commerce-website-proj.vercel.app",
    "https://skillintern-e-commerce-websi-git-4a6f20-jyosna-bogaris-projects.vercel.app",
    "https://skillintern-e-commerce-website-project-f5spb6umt.vercel.app"
  ],
  credentials: true
}));

//port
const PORT = process.env.PORT || 3000;
//body parser 
app.use(exp.json());
app.use(cookieParser());

//database connection
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("MongoDB connected");
    //express server
    app.listen(PORT, () => {
      console.log(`server running on the port ${PORT}`)
    })
  } catch (err) {
    console.log("Error Ocuured while connecting to database:", err)
  }
}
//database calling
connectDB();

app.use('/user-api', userRoute);
app.use('/common-api', commonRoute);
app.use('/admin-api', adminRoute);
app.use('/product-api', productRoute)
app.use('/order-api', OrderRoute)
// Add this with other routes
app.use("/payment-api", paymentRoute);


//test API razorpay 

app.use('/test-api',testRoute)
//dealing with invalid path
//after checking all the pathsi.e APIs then if not match come to here
app.use((req, res, next) => {
  console.log(req.url);
  res.json({ message: `${req.url} is Invalid path` })
});


app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});