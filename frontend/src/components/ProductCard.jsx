import { useNavigate, useParams } from "react-router"
import {
 primaryBtn,
 pageWrapper,
 cardClass,
 headingClass,
 bodyText,
 productImage
} from "../styles/common"

import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { useAuth } from "../store/authStore";

function ProductCard() {

  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)

  const { productId } = useParams() // get product id from URL
  const navigate = useNavigate();
  const refreshCart = useAuth(state => state.refreshCart)

  // fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `http://localhost:3000/product-api/product-id/${productId}`
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

  // load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlist(stored)
  }, [])

  // add product to cart (API call)
  const gotoCart = async (productObj) => {
    try {
      let res = await axios.put(
        `http://localhost:3000/user-api/user-cart/${productObj._id}`,
        {},
        { withCredentials: true }
      )

      if (res.status === 200) {
        toast.success("Product Added to Cart Successfully")
        await refreshCart() // update cart count globally
      }

    } catch (err) {
      // handle auth errors
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError(err.response?.status)
        toast.error("Please login first")
      } else {
        toast.error("Failed to add product to cart")
      }
    }
  }

  // add product to wishlist (localStorage)
  const addToWishlist = (productObj) => {
    let updatedWishlist = [...wishlist]

    // check if already exists
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
    window.dispatchEvent(new Event('wishlistUpdated')) // notify other components

    toast.success("Added to Wishlist ❤️")
  }

  // loading state UI
  if (loading) {
    return <p className={bodyText}>Loading product...</p>
  }

  // error UI
  if (error && typeof error === "string") {
    return <p className={bodyText}>{error}</p>
  }

  // no product found
  if (!product) {
    return <p className={bodyText}>Product not found</p>
  }

  return (
    <div className={pageWrapper}>

      <div className={cardClass + " text-center flex flex-col items-center gap-4"}>

        {/* show login button if unauthorized */}
        {(error === 403 || error === 401) && (
          <button
            onClick={() => navigate('/signin')}
            className={primaryBtn}
          >
            Please Login to Add to Cart
          </button>
        )}

        <h1 className={headingClass}>{product?.name}</h1>

        <img src={product?.image} className={productImage} />

        <p className={bodyText}>{product?.description}</p>
        <p className={bodyText}>Category: {product?.category}</p>
        <p className={bodyText}>Brand: {product?.brand}</p>

        <p className={headingClass}>${product?.price}</p>

        {/* stock availability */}
        <p className={bodyText}>
          {product?.stock > 0
            ? `In Stock ${product?.stock}`
            : `Out Of Stock`}
        </p>

        <button
          className={primaryBtn}
          disabled={product?.stock === 0} // disable if out of stock
          onClick={() => gotoCart(product)}
        >
          Add To Cart
        </button>

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