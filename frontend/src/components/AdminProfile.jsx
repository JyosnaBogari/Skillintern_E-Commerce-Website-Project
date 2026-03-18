import { useEffect, useState } from "react" // React hooks for managing state and lifecycle
import axios from "axios" // HTTP client for API requests
import {
  adminPageWrapper,
  adminHeader,
  bodyText,
  adminCardClass,
  adminCardGrid,
  primaryBtn
} from "../styles/common" // Reusable styling classes
import { useNavigate } from "react-router" // Hook for programmatic navigation

function AdminProfile() {

  // ================== STATE MANAGEMENT ==================

  // Stores total number of products
  const [totalProducts, setTotalProducts] = useState(0)

  // Stores total number of orders
  const [totalOrders, setTotalOrders] = useState(0)

  // Stores total revenue generated
  const [totalRevenue, setTotalRevenue] = useState(0)

  // Navigation hook
  const navigate = useNavigate();

  // ================== FETCH DASHBOARD STATS ==================

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch all products and calculate total count
        const prodRes = await axios.get(
          "https://skillintern-e-commerce-website.onrender.com/product-api/products",
          { withCredentials: true }
        )
        setTotalProducts(prodRes.data.payload.length)

        // Fetch all orders
        const orderRes = await axios.get(
          "https://skillintern-e-commerce-website.onrender.com/admin-api/orders",
          { withCredentials: true }
        )

        // Set total number of orders
        setTotalOrders(orderRes.data.payload.length)

        // Calculate total revenue by summing all order amounts
        const revenue = orderRes.data.payload.reduce(
          (acc, order) => acc + order.totalAmount,
          0
        )

        // Round the revenue value
        const roundedRevenue = Math.round(revenue)

        // Format revenue according to Indian currency format (e.g., 2,45,000)
        setTotalRevenue(roundedRevenue.toLocaleString("en-IN"))

      } catch (err) {
        // Log error for debugging
        console.error("Error fetching stats", err)
      }
    }

    fetchStats() // Call function on component mount
  }, [])

  // ================== UI RENDER ==================

  return (
    <div className={adminPageWrapper}>

      {/* Dashboard Heading */}
      <h1 className={adminHeader}>Admin Dashboard</h1>

      {/* Welcome Message */}
      <p className={bodyText}>
        Welcome Admin. Manage your store from here.
      </p>

      {/* Dashboard Cards */}
      <div className={adminCardGrid + " mt-8"}>

        {/* Total Products Card */}
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-orange-500">
            {totalProducts}
          </p>
          <p className="text-gray-600 text-sm">Products Listed</p>
        </div>

        {/* Total Orders Card */}
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-green-500">
            {totalOrders}
          </p>
          <p className="text-gray-600 text-sm">Orders Completed</p>
        </div>

        {/* Total Revenue Card */}
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-blue-500">
            ₹{totalRevenue}
          </p>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>

        {/* Button to navigate to orders page */}
        <button
          onClick={() => navigate("/admin-orders")}
          className={primaryBtn + " w-full"}
        >
          View Orders
        </button>

      </div>
    </div>
  )
}

// Export component
export default AdminProfile