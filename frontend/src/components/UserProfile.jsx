import { useEffect, useState } from "react"
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
// import { useAuth } from "../store/authStore";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function UserProfile() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const gotoProduct = (productObj) => {
    navigate(`/product/${productObj._id}`)
  }

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true)
        let res = await axios.get('http://localhost:3000/product-api/products', { withCredentials: true })
        setProducts(res.data.payload)
        console.log(res.data.payload)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProduct();

  }, [])

  if (loading == true) {
    return <p className={loadingClass}>Loading...</p>
  }

  if (error) {
    return <p className={bodyText}>{error.message}</p>
  }

  return (
    <>
      <div className={pageBackground}>
        <div className={pageWrapper}>

          <div>
          </div>
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-10">
            Products
          </h1>
          <div className={productGrid} >
            {products.map((product, index) => (
              <div
                onClick={() => gotoProduct(product)}
                key={index}
                className={`${productCardClass} flex flex-col items-center text-center gap-3`}
              >
                <h1 className={productName}>{product.name}</h1>

                {/* ? product.image: "https://via.placeholder.com/200" */}
                <img
                  src={product.image}
                  alt={product.name}
                  className={productImage}
                />

                <p className={bodyText}>Price: ${product.price}</p>

              </div>
            )
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default UserProfile