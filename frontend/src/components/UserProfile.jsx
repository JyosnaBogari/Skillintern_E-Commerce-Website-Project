import { useEffect, useState } from "react" // React hooks for state & lifecycle
import {
  loadingClass,
  productCardClass,
  productGrid,
  productImage,
  productName,
  bodyText,
  pageBackground,
  pageWrapper
} from "../styles/common"; 

import axios from 'axios'; // HTTP client for API calls
// import { useAuth } from "../store/authStore";

import { useNavigate } from "react-router"; // Navigation hook
import toast from "react-hot-toast"; // Toast notifications (currently unused)

function UserProfile() {

  //STATE MANAGEMENT

  // Stores all products
  const [products, setProducts] = useState([]);

  // Loading state for API call
  const [loading, setLoading] = useState(false);

  // Error state for handling API failures
  const [error, setError] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  //  NAVIGATION HANDLER

  // Navigate to product details page
  const gotoProduct = (productObj) => {
    navigate(`/product/${productObj._id}`)
  }

  // FETCH PRODUCTS
  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true) // Start loading

        // API call to fetch all products
        let res = await axios.get(
          'https://skillintern-e-commerce-website.onrender.com/product-api/products',
          { withCredentials: true }
        )

        // Store fetched products in state
        setProducts(res.data.payload)

        // Debug log (can be removed in production)
        console.log(res.data.payload)

      } catch (err) {
        setError(err) // Store error
      } finally {
        setLoading(false) // Stop loading
      }
    }

    getProduct(); // Call function on component mount

  }, [])

  //  LOADING STATE 

  if (loading == true) {
    return <p className={loadingClass}>Loading...</p>
  }

 
// ERROR STATE
  if (error) {
    return <p className={bodyText}>{error.message}</p>
  }

  // UI RENDER 

  return (
    <>
      <div className={pageBackground}>
        <div className={pageWrapper}>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-10">
            Products
          </h1>

          {/* Products Grid */}
          <div className={productGrid} >

            {/* Render all products */}
            {products.map((product, index) => (
              <div
                onClick={() => gotoProduct(product)} // Navigate on click
                key={index}
                className={`${productCardClass} flex flex-col items-center text-center gap-3`}
              >

                {/* Product Name */}
                <h1 className={productName}>{product.name}</h1>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className={productImage}
                />

                {/* Product Price */}
                <p className={bodyText}>Price: ${product.price}</p>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

// Export component
export default UserProfile