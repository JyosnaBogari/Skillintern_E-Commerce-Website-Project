import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  errorClass,
  loadingClass,
  pageWrapper,
  cardClass,
  headingClass,
  bodyText,
  primaryBtn
} from "../styles/common";

import { useNavigate } from "react-router";

function PlaceOrder() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [payLoading, setPayLoading] = useState(false);

  const navigate = useNavigate();

  // fetch order data
  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3000/order-api/place-order",
          {},
          { withCredentials: true }
        );
        setOrder(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, []);

  // Handle payment via Razorpay
  const handlePayment = async () => {
    if (!order) return;

    setPayLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        { amount: order.totalAmount },
        { withCredentials: true }
      );

      const razorOrder = res.data;

      const options = {
        key: "YOUR_KEY_ID",
        amount: razorOrder.amount,
        currency: "INR",
        name: "My E-Commerce App",
        order_id: razorOrder.id,
        description: "Order Payment",
        prefill: { name: "User Name", email: "user@example.com" },
        theme: { color: "#3399cc" },
        handler: async function (response) {
          try {
            const verify = await axios.post(
              "/api/payment/verify",
              response,
              { withCredentials: true }
            );

            if (verify.data.success) {
              await axios.post(
                "http://localhost:3000/order-api/confirm-order",
                {
                  orderId: order._id,
                  paymentId: response.razorpay_payment_id,
                  status: "paid",
                  paymentMethod
                },
                { withCredentials: true }
              );
              navigate("/order-success");
            } else {
              toast.error("Payment Failed! Please try again.");
            }
          } catch (err) {
            toast.error("Error verifying payment.");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Failed to initiate payment.");
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading...</p>;

  return (
    <div className={pageWrapper + " flex justify-center px-3 sm:px-6"}>
      
      {error && <p className={errorClass}>{error}</p>}

      {/* RESPONSIVE CARD */}
      <div
        className={
          cardClass +
          " w-full max-w-md sm:max-w-lg md:max-w-xl text-center p-4 sm:p-6 shadow-md rounded-xl"
        }
      >
        <h1 className={headingClass + " text-lg sm:text-xl md:text-2xl"}>
          Your Order Summary
        </h1>

        {order && (
          <>
            <p className={bodyText + " mt-3 text-base sm:text-lg"}>
              Total Amount: ₹{order.totalAmount}
            </p>
            <p className={bodyText + " text-sm sm:text-base"}>
              Your Order Will Be Delivered Soon...
            </p>
          </>
        )}

        {/* PAYMENT SELECT */}
        <div className="my-5 text-left">
          <p className="font-semibold mb-2 text-sm sm:text-base">
            Select Payment Method
          </p>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 p-2 sm:p-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="UPI">UPI / Wallet</option>
            <option value="CARD">Card / Netbanking</option>
          </select>
        </div>

        {/* BUTTONS */}
        {paymentMethod !== "COD" ? (
          <button
            onClick={handlePayment}
            className={primaryBtn + " mt-4 w-full text-sm sm:text-base"}
            disabled={payLoading}
          >
            {payLoading ? "Processing Payment..." : "Pay Now"}
          </button>
        ) : (
          <button
            onClick={() => navigate("/")}
            className={primaryBtn + " mt-4 w-full text-sm sm:text-base"}
          >
            Confirm Order
          </button>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;