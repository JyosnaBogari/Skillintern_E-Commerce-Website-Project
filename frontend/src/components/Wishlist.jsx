import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import {
  pageWrapper,
  productCardClass,
  productName,
  productImage,
  primaryBtn,
  bodyText,
} from "../styles/common";

function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setItems(stored);

    const onWishlistUpdated = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
      setItems(updated);
    };

    window.addEventListener("wishlistUpdated", onWishlistUpdated);
    return () => window.removeEventListener("wishlistUpdated", onWishlistUpdated);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = items.filter((item) => item._id !== id);
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    toast.success("Removed from wishlist");
  };

  if (items.length === 0) {
    return (
      <div className={pageWrapper}>
        <p className={bodyText + " text-center mt-10"}>
          Your wishlist is empty. Start adding favorites from the products page!
        </p>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className={productCardClass + " flex flex-col items-center gap-3"}
          >
            <h2 className={productName}>{item.name}</h2>
            <img
              src={item.image}
              alt={item.name}
              className={productImage}
              onClick={() => navigate(`/product/${item._id}`)}
            />
            <p className={bodyText}>Price: ₹{item.price}</p>
            <div className="flex gap-2">
              <button
                className={primaryBtn}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                View
              </button>
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

export default Wishlist;
