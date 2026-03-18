import axios from "axios"; // HTTP client for API calls
import { useEffect, useState } from "react" // React hooks for state & lifecycle
import { 
  errorClass,
  loadingClass,
  productCardClass,
  productName,
  productImage,
  primaryBtn,
  bodyText,
  pageWrapper
} from "../styles/common"; // Reusable styling classes

import { useNavigate } from "react-router"; // Hook for navigation
import { useAuth } from "../store/authStore"; // Global auth/cart state

function Cart() {

  // ================== STATE MANAGEMENT ==================

  // Stores cart products
  const [products, setProducts] = useState([]);

  // Loading state for API call
  const [loading, setLoading] = useState(false);

  // Error state for handling API errors
  const [error, setError] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  // ================== FETCH CART PRODUCTS ==================

  useEffect(() => {
    async function getCartProducts() {
      try {
        setLoading(true); // Start loading

        // API call to fetch user's cart items
        let res = await axios.get(
          'https://skillintern-e-commerce-website.onrender.com/user-api/user-cart',
          { withCredentials: true } // Include cookies for authentication
        );

        // Store fetched products in state
        setProducts(res.data.payload);

      } catch (err) {
        // Handle API error safely
        setError(err.response?.data?.error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    getCartProducts(); // Call API on component mount

  }, []);

  // ================== GLOBAL CART REFRESH ==================

  // Function from global store to refresh cart count (e.g., navbar badge)
  const refreshCart = useAuth(state => state.refreshCart)

  // ================== REMOVE PRODUCT FROM CART ==================

  async function removeFromCart(pid) {
    try {

      // API call to remove item from cart
      await axios.delete(
        `http://localhost:3000/user-api/remove-cart/${pid}`,
        { withCredentials: true }
      );

      // Update UI by filtering out removed product
      setProducts(products.filter(items => items.product._id !== pid));

      // Refresh global cart state
      refreshCart();

    } catch (err) {
      // Handle error
      setError(err.response?.data?.error);
    }
  }

  // ================== LOADING STATE ==================

  if (loading === true) {
    return <p className={loadingClass}>Loading...</p>
  }

  // ================== TOTAL PRICE CALCULATION ==================

  // Calculate total price based on product price * quantity
  const totalPrice = products.reduce(
    (acc, items) => acc + items.product.price * items.quantity,
    0
  );
 
  // ================== NAVIGATION ==================

  // Navigate to place order page
  const gotoOrders = () => {
    navigate('/place-order');
  }

  // ================== EMPTY CART UI ==================

  if (products.length == 0) {
    return (
      <p className={bodyText + " text-center mt-10"}>
        Cart Empty. To Order Please Add Products
      </p>
    )
  }

  // ================== UI RENDER ==================

  return (
    <div className={pageWrapper}>

      {/* Display error if exists */}
      {error && <p className={errorClass}>{error}</p>}
      
      {/* Render all cart products */}
      {products.map((items) => (
        <div
          key={items.product._id}
          className={productCardClass + " flex flex-col items-center text-center gap-3 mb-6"}
        >

          {/* Product Name */}
          <h1 className={productName}>{items.product.name}</h1>

          {/* Product Image */}
          <img
            src={items.product.image}
            alt={items.product.name}
            className={productImage}
          />

          {/* Product Price */}
          <p className={bodyText}>
            Price: ₹{items.product.price}
          </p>

          {/* Product Quantity */}
          <p className={bodyText}>
            Quantity: {items.quantity}
          </p>

          {/* Remove Product Button */}
          <button
            onClick={() => removeFromCart(items.product._id)}
            className="text-[#ff3b30] text-sm font-medium hover:underline cursor-pointer"
          >
            Remove
          </button>

        </div>
      ))}

      {/* Total Price Section */}
      <h2 className="text-xl font-semibold text-[#1d1d1f] mt-6">
        Total Price: ₹{totalPrice}
      </h2>

      {/* Place Order Button */}
      <button onClick={gotoOrders} className={primaryBtn + " mt-4"}>
        Place Order
      </button>

    </div>
  )
}

// Export component
export default Cart