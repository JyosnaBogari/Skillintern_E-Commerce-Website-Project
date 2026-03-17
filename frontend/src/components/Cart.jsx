import axios from "axios";
import { useEffect, useState } from "react"
import { 
  errorClass,
  loadingClass,
  productCardClass,
  productName,
  productImage,
  primaryBtn,
  bodyText,
  pageWrapper
} from "../styles/common";

import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function Cart() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    async function getCartProducts() {
      try {
        setLoading(true);
        let res = await axios.get(
          'http://localhost:3000/user-api/user-cart',
          { withCredentials: true }
        );

        setProducts(res.data.payload);

      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    }

    getCartProducts();

  }, []);


  const refreshCart = useAuth(state => state.refreshCart)

  async function removeFromCart(pid) {
    try {

      await axios.delete(
        `http://localhost:3000/user-api/remove-cart/${pid}`,
        { withCredentials: true }
      );

      setProducts(products.filter(items => items.product._id !== pid));
      refreshCart();

    } catch (err) {
      setError(err.response?.data?.error);
    }
  }


  if (loading === true) {
    return <p className={loadingClass}>Loading...</p>
  }

  const totalPrice = products.reduce(
    (acc, items) => acc + items.product.price * items.quantity,
    0
  );
 
  const gotoOrders=()=>{
    navigate('/place-order');
  }

  if(products.length==0)
  {
    return <p className={bodyText + " text-center mt-10"}>Cart Empty. To Order Please Add Products</p>
  }

  return (
    <div className={pageWrapper}>

      {error && <p className={errorClass}>{error}</p>}
      
      {products.map((items) => (
        <div key={items.product._id} className={productCardClass + " flex flex-col items-center text-center gap-3 mb-6"}>

          <h1 className={productName}>{items.product.name}</h1>

          <img
            src={items.product.image}
            alt={items.product.name}
            className={productImage}
          />

          <p className={bodyText}>Price: ₹{items.product.price}</p>

          <p className={bodyText}>Quantity: {items.quantity}</p>

          <button
            onClick={() => removeFromCart(items.product._id)}
            className="text-[#ff3b30] text-sm font-medium hover:underline cursor-pointer"
          >
            Remove
          </button>

        </div>
      ))}

      <h2 className="text-xl font-semibold text-[#1d1d1f] mt-6">
        Total Price: ₹{totalPrice}
      </h2>

      <button onClick={gotoOrders} className={primaryBtn + " mt-4"}>
        Place Order
      </button>

    </div>
  )
}

export default Cart