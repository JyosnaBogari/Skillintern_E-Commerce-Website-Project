import { useLocation,useNavigate} from "react-router"

import {
 primaryBtn,
 pageWrapper,
 cardClass,
 headingClass,
 bodyText,
 productImage
} from "../styles/common"

import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import axios from "axios";

function ProductCard() {

 const [error,setError]=useState(null);
const [wishlist,setWishlist] = useState([])
 let {state}=useLocation()

 const navigate=useNavigate();

 const product = state?.product

 if(!product){
  return <p className={bodyText}>Product not found</p>
 }

 const gotoCart=async(productObj)=>{

  try{

   let res=await axios.put(
    `http://localhost:3000/user-api/user-cart/${productObj._id}`,
    {},
    {withCredentials:true}
   )

   if(res.status===200){

    toast.success("Product Added to Cart Successfully", {
     duration: 3000,
     position: 'top-center'
    })

   }

  }catch(err){

   if(err.response?.status === 403 || err.response?.status === 401){
    setError(err.response?.status)
    toast.error("Please login first", {
     duration: 3000,
     position: 'top-center'
    })
   }else{
    toast.error("Failed to add product to cart", {
     duration: 3000,
     position: 'top-center'
    })
   }

  }

 }

// load wishlist from localStorage
useEffect(()=>{
 const stored = JSON.parse(localStorage.getItem("wishlist")) || []
 setWishlist(stored)
},[])


const addToWishlist = (productObj)=>{

 let updatedWishlist = [...wishlist]

 const alreadyExists = updatedWishlist.find(p=>p._id === productObj._id)

 if(alreadyExists){
  toast("Already in Wishlist")
  return
 }

 updatedWishlist.push(productObj)

 setWishlist(updatedWishlist)

 localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

 toast.success("Added to Wishlist ❤️")

 // Similar product notification
 toast("You may also like similar products!",{
  duration:3000
 })
}

 return (

  <div className={pageWrapper}>

   <div className={cardClass + " text-center flex flex-col items-center gap-4"}>

    {(error===403 || error===401 ) && (

     <button
      onClick={()=>navigate('/signin')}
      className={primaryBtn}
     >
      Only User Has access to add the products to Cart.Please Login
     </button>

    )}

    <h1 className={headingClass}>{product?.name}</h1>

    <img src={product?.image} className={productImage}/>

    <p className={bodyText}>{product?.description}</p>

    <p className={bodyText}>Category: {product?.category}</p>

    <p className={bodyText}>Brand: {product?.brand}</p>

    <p className={headingClass}>${product?.price}</p>

    <p className={bodyText}>
     {product?.stock>0 ? `In Stock ${product?.stock}` : `Out Of Stock`}
    </p>

    <button
     className={primaryBtn}
     disabled={product?.stock === 0}
     onClick={()=>gotoCart(product)}
    >
     Add To Cart
    </button>

   <button
 className={primaryBtn}
 onClick={()=>addToWishlist(product)}
>
 ❤️ Add To Wishlist
</button>

   </div>

  </div>

 )
}

export default ProductCard