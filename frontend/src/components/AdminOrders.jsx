import { useEffect, useState } from "react" // React hooks for state and lifecycle
import axios from "axios" // For making HTTP requests
import {
  adminPageWrapper,
  adminHeader,
  adminTableClass,
  adminTableHeader,
  adminTableRow,
  adminTableCell,
  bodyText
} from "../styles/common" // Importing reusable CSS classes

function AdminOrders() {
  // State to store orders data
  const [orders, setOrders] = useState([])

  // State to handle loading status
  const [loading, setLoading] = useState(false)

  // State to handle errors
  const [error, setError] = useState(null)

  // useEffect runs once when component mounts
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true) // Start loading
        setError(null)   // Reset any previous errors

        // API call to fetch all orders (admin route)
        const res = await axios.get("https://skillintern-e-commerce-website.onrender.com/admin-api/orders", {
          withCredentials: true, // send cookies for authentication
        })

        // Store fetched orders in state
        setOrders(res.data.payload)
      } catch (err) {
        setError(err) // Store error if API fails
      } finally {
        setLoading(false) // Stop loading in all cases
      }
    }

    fetchOrders() // Call the function
  }, []) // Empty dependency → runs only once

  // Show loading UI
  if (loading) {
    return (
      <div className={adminPageWrapper}>
        <p className={bodyText}>Loading orders...</p>
      </div>
    )
  }

  // Show error UI
  if (error) {
    return (
      <div className={adminPageWrapper}>
        <p className="text-red-600 font-semibold">Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className={adminPageWrapper}>
      {/* Page Heading */}
      <h1 className={adminHeader}>All Orders</h1>

      {/* If no orders available */}
      {orders.length === 0 ? (
        <p className={bodyText}>No orders found.</p>
      ) : (
        // Orders Table
        <table className={adminTableClass}>
          <thead>
            <tr>
              <th className={adminTableHeader}>Order ID</th>
              <th className={adminTableHeader}>User</th>
              <th className={adminTableHeader}>Products</th>
              <th className={adminTableHeader}>Total Amount</th>
              <th className={adminTableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through each order */}
            {orders.map((order) => (
              <tr key={order._id} className={adminTableRow}>
                
                {/* Order ID */}
                <td className={adminTableCell}>{order._id}</td>

                {/* Username (safe optional chaining) */}
                <td className={adminTableCell}>
                  {order.user?.username || "N/A"}
                </td>

                {/* List of products in the order */}
                <td className={adminTableCell}>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {/* Product name and quantity */}
                      {p.product?.name} × {p.quantity}
                    </div>
                  ))}
                </td>

                {/* Total amount */}
                <td className={adminTableCell}>₹{order.totalAmount}</td>

                {/* Order creation date */}
                <td className={adminTableCell}>
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// Export component
export default AdminOrders