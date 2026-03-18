import { useState, useEffect } from "react"; // React hooks
import axios from "axios"; // API calls
import toast from "react-hot-toast"; // notifications

import {
  errorClass,
  loadingClass,
  pageWrapper,
  cardClass,
  headingClass,
  bodyText,
  primaryBtn
} from "../styles/common"; // reusable styles

import { useNavigate } from "react-router"; // navigation

function PlaceOrder() {
  const [order, setOrder] = useState(null); // store order details
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state
  const [paymentMethod, setPaymentMethod] = useState("COD"); // selected payment method
  const [payLoading, setPayLoading] = useState(false); // payment loading

  const navigate = useNavigate();

  // fetch order data
  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        // make API request
        const res = await axios.post(
          "http://localhost:3000/order-api/place-order",
          {}, // no user object sending
          { withCredentials: true } // send cookies/session
        );
        setOrder(res.data.payload); // store order data
      } catch (err) {
        setError(err.response?.data?.error); // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchOrder(); // call function
  }, []);

  // handle Razorpay payment
const handlePayment = async () => {
  if (!order) return;

  setPayLoading(true);

  try {
    // create payment order
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

      // ✅ SUCCESS HANDLER
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

            toast.success("Payment Successful ✅");
            navigate("/order-success");
          } else {
            toast.error("Payment Failed! Please try again.");
          }
        } catch (err) {
          toast.error("Error verifying payment.");
        }
      },

      // ✅ HANDLE USER CLOSE / CANCEL
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled ❌");
        }
      }
    };

    const rzp = new window.Razorpay(options);

    // ✅ HANDLE PAYMENT FAILURE (IMPORTANT FIX)
    rzp.on("payment.failed", function () {
      toast.error("Payment Failed ❌");
    });

    rzp.open();

  } catch (err) {
    toast.error("Failed to initiate payment.");
  } finally {
    setPayLoading(false);
  }
};

  // loading UI
  if (loading) return <p className={loadingClass}>Loading...</p>;

  return (
    <div className={pageWrapper + " flex justify-center px-3 sm:px-6"}>
      
      {error && <p className={errorClass}>{error}</p>} {/* show error */}

      {/* order summary card */}
      <div
        className={
          cardClass +
          " w-full max-w-md sm:max-w-lg md:max-w-xl text-center p-4 sm:p-6 shadow-md rounded-xl"
        }
      >
        <h1 className={headingClass + " text-lg sm:text-xl md:text-2xl"}>
          Your Order Summary
        </h1>

        {/* show order details */}
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

        {/* payment selection */}
        <div className="my-5 text-left">
          <p className="font-semibold mb-2 text-sm sm:text-base">
            Select Payment Method
          </p>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)} // update method
            className="border border-gray-300 p-2 sm:p-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="UPI">UPI / Wallet</option>
            <option value="CARD">Card / Netbanking</option>
          </select>
        </div>

        {/* buttons */}
        {paymentMethod !== "COD" ? (
          <button
            onClick={handlePayment} // trigger payment
            className={primaryBtn + " mt-4 w-full text-sm sm:text-base"}
            disabled={payLoading}
          >
            {payLoading ? "Processing Payment..." : "Pay Now"}
          </button>
        ) : (
          <button
            onClick={() => navigate("/")} // confirm COD order
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