import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import BASE_URL from "../config/baseAPI"
import {
  adminPageWrapper,
  adminHeader,
  bodyText,
  adminCardClass,
  adminCardGrid,
  primaryBtn
} from "../styles/common"

function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchStats() {
      try {
        const prodRes = await axios.get(`${BASE_URL}/product-api/products`, {
          withCredentials: true
        })
        setTotalProducts(prodRes.data.payload.length)

        const orderRes = await axios.get(`${BASE_URL}/admin-api/orders`, {
          withCredentials: true
        })
        setTotalOrders(orderRes.data.payload.length)

        const revenue = orderRes.data.payload.reduce(
          (acc, order) => acc + order.totalAmount,
          0
        )
        setTotalRevenue(Math.round(revenue).toLocaleString("en-IN"))
      } catch (err) {
        console.error("Error fetching admin dashboard stats", err)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className={adminPageWrapper}>
      <h1 className={adminHeader}>Admin Dashboard</h1>
      <p className={bodyText}>Welcome Admin. Manage your store from here.</p>
      <div className={adminCardGrid + " mt-8"}>
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-orange-500">{totalProducts}</p>
          <p className="text-gray-600 text-sm">Products Listed</p>
        </div>
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-green-500">{totalOrders}</p>
          <p className="text-gray-600 text-sm">Orders Completed</p>
        </div>
        <div className={adminCardClass}>
          <p className="text-2xl font-bold text-blue-500">₹{totalRevenue}</p>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>
        <button
          onClick={() => navigate("/admin-profile/admin-orders")}
          className={primaryBtn + " w-full"}
        >
          View Orders
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
