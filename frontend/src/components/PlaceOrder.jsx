import { useState ,useEffect} from "react"
import axios from "axios";

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

 const [order,setOrder]=useState(null);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState(null);
const [paymentMethod,setPaymentMethod] = useState("COD")
 const navigate=useNavigate();

 useEffect(()=>{

  async function Order(){

   try{

    setLoading(true)

    let res=await axios.post(
     'http://localhost:3000/order-api/place-order',
     {},
     {withCredentials:true}
    )

    setOrder(res.data.payload);

   }catch(err){

    setError(err.response?.data?.error)

   }finally{

    setLoading(false)

   }

  }

  Order();

 },[])

 if(loading===true){
  return <p className={loadingClass}>Loading....</p>
 }

 return (

  <div className={pageWrapper}>

   {error && <p className={errorClass}>{error}</p>}

   <div className={cardClass + " text-center"}>

    <h1 className={headingClass}>
     Your Order Has Placed Successfully
    </h1>

    {order && (
     <p className={bodyText}>
      Total Amount: ₹{order.totalAmount}
     </p>
    )}

    <p className={bodyText}>
     Your Order Will Be Delivered Soon...
    </p>


    <div className="my-4">

 <p className="font-semibold mb-2">Select Payment Method</p>

 <select
  value={paymentMethod}
  onChange={(e)=>setPaymentMethod(e.target.value)}
  className="border p-2 rounded"
 >
  <option value="COD">Cash On Delivery</option>
  <option value="UPI">UPI</option>
  <option value="CARD">Card</option>
 </select>

</div>

    <button
 onClick={()=>{
  alert(`Payment Method: ${paymentMethod}`)
  navigate("/")
 }}
 className={primaryBtn + " mt-4"}
>
 Confirm Order
</button>

   </div>

  </div>

 )
}

export default PlaceOrder