import exp from "express";
import { razorpay } from "../utils/razorpay.js";

export const testRoute = exp.Router();


testRoute.get("/test-razorpay", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 100,      // ₹1 (always in paise)
      currency: "INR",
      receipt: "test_rcpt_001",
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

