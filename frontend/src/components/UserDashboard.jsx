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
import axios from 'axios';
import BASE_URL from "../config/baseAPI";
import { Outlet, useNavigate } from "react-router";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/product-api/products`,
          { withCredentials: true }
        );
        setProducts(res.data.payload);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, []);

  if (loading) {
    return <p className={loadingClass}>Loading...</p>
  }

  if (error) {
    return <p className={bodyText}>{error.message || "Failed to load products."}</p>
  }

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <h1 className="text-3xl text-center font-bold text-[#d7a851] mb-10">
          Products
        </h1>

        <div className={productGrid}>
          {products.map((product, index) => (
            <div
              key={product._id || index}
              onClick={() => navigate(`/product/${product._id}`)}
              className={`${productCardClass} flex flex-col items-center text-center gap-3`}
            >
              <h1 className={productName}>{product.name}</h1>
              <img
                src={product.image}
                alt={product.name}
                className={productImage}
              />
              <p className={bodyText}>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
