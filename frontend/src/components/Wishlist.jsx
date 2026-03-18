import { useEffect, useState } from "react"; // React hooks for state and lifecycle
import { useNavigate } from "react-router"; // Navigation hook
import { toast } from "react-hot-toast"; // Toast notifications
import {
  pageWrapper,
  productCardClass,
  productName,
  productImage,
  primaryBtn,
  bodyText,
} from "../styles/common"; // Reusable styling classes

function Wishlist() {

  //STATE MANAGEMENT

  // Stores wishlist items
  const [items, setItems] = useState([]);

  // Navigation hook
  const navigate = useNavigate();

  // LOAD WISHLIST 

  useEffect(() => {
    // Load wishlist from localStorage
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setItems(stored);

    // Listener to sync wishlist updates across components
    const onWishlistUpdated = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
      setItems(updated);
    };

    // Add custom event listener
    window.addEventListener("wishlistUpdated", onWishlistUpdated);

    // Cleanup event listener on component unmount
    return () =>
      window.removeEventListener("wishlistUpdated", onWishlistUpdated);
  }, []);

  // REMOVE FROM WISHLIST

  const removeFromWishlist = (id) => {
    // Filter out the removed item
    const updated = items.filter((item) => item._id !== id);

    // Update state and localStorage
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // Trigger global update event
    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Removed from wishlist"); // Success feedback
  };

  // EMPTY STATE 

  if (items.length === 0) {
    return (
      <div className={pageWrapper}>
        <p className={bodyText + " text-center mt-10"}>
          Your wishlist is empty. Start adding favorites from the products page!
        </p>
      </div>
    );
  }

  //  UI RENDER 

  return (
    <div className={pageWrapper}>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>

      {/* Wishlist Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Render wishlist items */}
        {items.map((item) => (
          <div
            key={item._id}
            className={productCardClass + " flex flex-col items-center gap-3"}
          >

            {/* Product Name */}
            <h2 className={productName}>{item.name}</h2>

            {/* Product Image (click to view details) */}
            <img
              src={item.image}
              alt={item.name}
              className={productImage}
              onClick={() => navigate(`/product/${item._id}`)}
            />

            {/* Product Price */}
            <p className={bodyText}>Price: ₹{item.price}</p>

            {/* Action Buttons */}
            <div className="flex gap-2">

              {/* View Product Button */}
              <button
                className={primaryBtn}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                View
              </button>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export component
export default Wishlist;