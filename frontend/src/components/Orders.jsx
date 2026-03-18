import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"

import {
 loadingClass,
 adminPageWrapper,
 adminHeader,
 adminCardClass,
 headingClass,
 bodyText,
 primaryBtn,
 errorClass
} from "../styles/common"

function Orders() {

 const [orders, setOrders] = useState([])
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 const navigate = useNavigate()

 // fetch all orders (admin only)
 useEffect(() => {

  async function getOrders() {

   try {

    setLoading(true)

    let res = await axios.get(
     "http://localhost:3000/admin-api/orders",
     { withCredentials: true }
    )

    setOrders(res.data.payload) // store orders

   } catch (err) {

    setError(err.response?.status) // store error status

   } finally {

    setLoading(false)

   }

  }

  getOrders()

 }, [])

 // loading UI
 if (loading === true) {
  return <p className={loadingClass}>Loading...</p>
 }

 return (

  <div className={adminPageWrapper}>

   <h1 className={adminHeader}>Orders</h1>

   {/* show login if not admin */}
   {(error === 403 || error === 401) && (
    <button
     onClick={() => navigate("/signin")}
     className={primaryBtn}
    >
     Only Admin can view Orders
    </button>
   )}

   {/* empty state */}
   {orders.length === 0 ? (

    <div className={errorClass + " text-center"}>
     <p className="font-semibold">No Orders Found</p>
    </div>

   ) : (

    <div className="space-y-6">

     {orders.map(order => (

      <div key={order._id} className={adminCardClass}>

       <div className="flex justify-between items-start mb-4">

        {/* order id */}
        <h2 className={headingClass}>
         Order #{order._id.slice(-8).toUpperCase()}
        </h2>

        {/* order status */}
        <span className="text-sm font-semibold bg-[#ff9900]/10 text-[#ff9900] px-3 py-1 rounded-full">
         Pending
        </span>

       </div>

       {/* customer details */}
       <p className={bodyText + " mb-2"}>
        <strong>Customer:</strong>{" "}
        {order.user?.firstName} {order.user?.lastName}
       </p>

       <p className={bodyText + " mb-4"}>
        <strong>Email:</strong> {order.user?.email}
       </p>

       {/* ordered items */}
       <div className="my-4 p-4 bg-[#f5f5f7] rounded-lg">

        <h3 className={headingClass + " text-base mb-3"}>
         Items Ordered
        </h3>

        {order.products.map((item, index) => (

         <div
          key={index}
          className="mb-3 pb-3 border-b border-gray-200 last:border-b-0"
         >

          <p className={bodyText}>
           <strong>Product:</strong> {item.product?.name}
          </p>

          <p className={bodyText}>
           <strong>Quantity:</strong> {item.quantity}
          </p>

          <p className={bodyText}>
           <strong>Price:</strong> ₹{item.product?.price}
          </p>

         </div>

        ))}

       </div>

       <div className="flex justify-between items-end">

        {/* total amount */}
        <p className={headingClass + " text-lg"}>
         Total: ₹{order.totalAmount}
        </p>

       </div>

      </div>

     ))}

    </div>

   )}

  </div>

 )

}

export default Orders