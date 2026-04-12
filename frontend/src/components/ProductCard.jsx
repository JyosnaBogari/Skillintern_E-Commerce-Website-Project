import { useNavigate, useParams } from "react-router"
import {
 primaryBtn,
 pageWrapper,
 cardClass,
 headingClass,
 bodyText,
 productImage
} from "../styles/common"
import BASE_URL from "../config/baseAPI";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { useAuth } from "../store/authStore";

function ProductCard() {

  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [product, setProduct] = useState(null)

  const { productId } = useParams() //human get product id from URL
  const navigate = useNavigate();
  const refreshCart = useAuth(state => state.refreshCart)

  //human fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${BASE_URL}/product-api/product-id/${productId}`
        )
        setProduct(res.data.payload)
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  //human load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlist(stored)
  }, [])

  //human add product to cart using API
  const gotoCart = async (productObj) => {
    try {
      setCartLoading(true)
      const res = await axios.put(
        `${BASE_URL}/user-api/user-cart/${productObj._id}`,
        {},
        { withCredentials: true }
      )

      if (res.status >= 200 && res.status < 300) {
        toast.success("Product added to cart")
        await refreshCart()
      } else {
        throw new Error("Unable to add item to cart")
      }
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError("login")
        toast.error("Please login first")
      } else {
        toast.error(err.response?.data?.message || "Failed to add product to cart")
      }
    } finally {
      setCartLoading(false)
    }
  }

  //human add product to wishlist (stored in localStorage)
  const addToWishlist = (productObj) => {
    let updatedWishlist = [...wishlist]

    //human check if product already exists
    const alreadyExists = updatedWishlist.find(
      p => p._id === productObj._id
    )

    if (alreadyExists) {
      toast("Already in Wishlist")
      return
    }

    updatedWishlist.push(productObj)

    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    //human notify other components
    window.dispatchEvent(new Event('wishlistUpdated'))

    toast.success("Added to Wishlist ❤️")
  }

  //human loading UI
  if (loading) {
    return <p className={bodyText}>Loading product...</p>
  }

  //human error UI
  if (error && typeof error === "string") {
    return <p className={bodyText}>{error}</p>
  }

  //human if product not found
  if (!product) {
    return <p className={bodyText}>Product not found</p>
  }

  return (
    <div className={pageWrapper}>

      <div className={cardClass + " text-center flex flex-col items-center gap-4"}>

        {/* human show login button if unauthorized */}
        {(error === 403 || error === 401) && (
          <button
            onClick={() => navigate('/signin')}
            className={primaryBtn}
          >
            Please Login to Add to Cart
          </button>
        )}

        <h1 className={headingClass}>{product?.name}</h1>

        {/* human show product image from cloudinary */}
        <img 
          src={product?.image} 
          alt={product?.name} 
          className={productImage} 
        />

        <p className={bodyText}>{product?.description}</p>
        <p className={bodyText}>Category: {product?.category}</p>
        <p className={bodyText}>Brand: {product?.brand}</p>

        <p className={headingClass}>${product?.price}</p>

        {/* human stock display */}
        <p className={bodyText}>
          {product?.stock > 0
            ? `In Stock ${product?.stock}`
            : `Out Of Stock`}
        </p>

        {/* human add to cart button */}
        <button
          className={primaryBtn}
          disabled={product?.stock === 0 || cartLoading}
          onClick={() => gotoCart(product)}
        >
          {cartLoading ? "Adding..." : "Add To Cart"}
        </button>

        {/* human wishlist button */}
        <button
          className={primaryBtn}
          onClick={() => addToWishlist(product)}
        >
          ❤️ Add To Wishlist
        </button>

      </div>

    </div>
  )
}

export default ProductCard