import express from "express";
import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto";
import { verifyToken } from "../middlewares/verifyToken.js";

export const paymentRoute = express.Router();

//  Create Order
paymentRoute.post("/create-order", verifyToken("USER"), async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
});

//  Verify Payment
paymentRoute.post("/verify", verifyToken("USER"), (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});