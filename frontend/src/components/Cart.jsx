import axios from "axios"; // HTTP client for API calls
import { useEffect, useState } from "react" // React hooks for state & lifecycle
import { 
  errorClass,
  loadingClass,
  bodyText,
  cartWrapper,
  cartCard,
  priceText,
  quantityText,
  totalPriceClass,
  removeBtn,
  primaryBtn
} from "../styles/common"; // Reusable styling classes
import BASE_URL from "../config/baseAPI";
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
          `${BASE_URL}/user-api/user-cart`,
          { withCredentials: true } // Include cookies for authentication
        );

        // Store fetched products in state
        setProducts(res.data.payload || []);

      } catch (err) {
        // Handle API error safely
        setError(err.response?.data?.error || "Unable to fetch cart items")
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
        `${BASE_URL}/user-api/remove-cart/${pid}`,
        { withCredentials: true }
      );

      // Update UI by filtering out removed product
      setProducts((current) => current.filter(items => items.product._id !== pid));

      // Refresh global cart state
      await refreshCart();
    } catch (err) {
      // Handle error
      setError(err.response?.data?.error || "Unable to remove item")
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

  if (error) {
    return (
      <div className={cartWrapper}>
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <p className={errorClass}>{error}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className={cartWrapper}>
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <p className="text-lg font-semibold text-[#131921] mb-3">Your cart is empty</p>
          <p className={bodyText}>Add products to your cart to begin checkout.</p>
        </div>
      </div>
    )
  }

  // ================== UI RENDER ==================

  return (
    <div className={cartWrapper}>

      {/* Display error if exists */}
      {error && <div className={errorClass + " mb-4"}>{error}</div>}

      <h1 className="text-2xl sm:text-3xl font-bold text-[#131921] mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {products.map((items) => (
          <div
            key={items.product._id}
            className={cartCard + " md:grid md:grid-cols-[140px_1fr] gap-4 items-start"}
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden rounded-lg border border-gray-200 bg-[#fafafa]">
              <img
                src={items.product.image}
                alt={items.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between gap-4 py-2 text-left">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#131921]">
                  {items.product.name}
                </h2>
                <p className={priceText}>Price: ₹{items.product.price}</p>
                <p className={quantityText}>Quantity: {items.quantity}</p>
                <p className={quantityText}>Subtotal: ₹{items.product.price * items.quantity}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  onClick={() => removeFromCart(items.product._id)}
                  className={removeBtn}
                >
                  Remove
                </button>
                <span className="text-sm text-[#666]">In stock: {items.product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={totalPriceClass}>Total Price: ₹{totalPrice}</p>
        <button onClick={gotoOrders} className={primaryBtn + " w-full sm:w-auto"}>
          Place Order
        </button>
      </div>
    </div>
  )
}

// Export component
export default Cart