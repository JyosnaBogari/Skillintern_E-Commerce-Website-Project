
import { useEffect, useState } from "react"
import {
  loadingClass,
  productCardClass,
  productGrid,
  productImage,
  productName,
  pageWrapper,
  pageTitleClass,
  bodyText,
  emptyStateClass,
  filterSidebar,
  filterTitle,
  filterInput,
  filterButton,
  errorClass,
  filterLabel
} from "../styles/common"

import axios from "axios"
import { useNavigate, useLocation } from "react-router"

function Products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlistCount(stored.length)
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const initialSearch = queryParams.get("q") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")

  const gotoProduct = (productObj) => {
    navigate("/productcard", { state: { product: productObj } })
  }

  useEffect(() => {
    setSearchTerm(initialSearch)
  }, [initialSearch])

  const fetchProducts = async () => {
    try {

      setLoading(true)
      setError(null)

      let res = await axios.get(
        "http://localhost:3000/product-api/products",
        { withCredentials: true }
      )

      setProducts(res.data.payload)

    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className={pageWrapper}>
        <p className={loadingClass}>Loading Products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={pageWrapper}>
        <div className={errorClass}>
          <p className="font-semibold">Something went wrong</p>
          <p>{error.message}</p>

          <button
            onClick={fetchProducts}
            className="mt-4 bg-[#ff9900] px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const categories = [...new Set(products.map(p => p.category))]
  const brands = [...new Set(products.map(p => p.brand))]

  const priceMinValue = priceMin ? parseFloat(priceMin) : 0
  const priceMaxValue = priceMax ? parseFloat(priceMax) : Infinity

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory = category ? product.category === category : true
    const matchesBrand = brand ? product.brand === brand : true

    const matchesPrice =
      product.price >= priceMinValue &&
      product.price <= priceMaxValue

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice
    )
  })

  return (

    <div className={pageWrapper}>

      <h1 className={pageTitleClass}>Products</h1>
      <p className="text-right font-semibold">
        ❤️ Wishlist: {wishlistCount}
      </p>
      <p className={bodyText + " mb-8"}>
        Explore our collection of products
      </p>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* FILTER SIDEBAR */}

        <aside className={filterSidebar}>

          {/* Search Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className={filterTitle}>
              🔍 Search
            </p>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={filterInput}
              placeholder="Search products..."
            />
          </div>

          {/* Category Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className={filterTitle}>
              📂 Category
            </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={filterInput}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className={filterTitle}>
              🏷️ Brand
            </p>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={filterInput}
            >
              <option value="">All Brands</option>
              {brands.map((b, index) => (
                <option key={index} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className={filterTitle}>
              💰 Price Range
            </p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={filterLabel}>Min Price</label>
                <input
                  type="number"
                  min="0"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className={filterInput}
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <label className={filterLabel}>Max Price</label>
                <input
                  type="number"
                  min="0"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className={filterInput}
                  placeholder="∞"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setCategory("")
              setBrand("")
              setPriceMin("")
              setPriceMax("")
              setSearchTerm("")
            }}
            className={filterButton}
          >
            🗑️ Clear All Filters
          </button>

        </aside>

        {/* MAIN CONTENT */}

        <main className="flex-1 bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm">

          {/* OFFERS SECTION */}

          <div className="bg-[#f9f9f9] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">

            <h2 className="text-lg sm:text-xl font-bold text-[#131921] mb-4">
              🎉 Special Offers
            </h2>

            <div className="flex gap-4 overflow-x-auto">

              {products.slice(0, 5).map((product, index) => (

                <div
                  key={index}
                  onClick={() => gotoProduct(product)}
                  className="shrink-0 w-48 bg-gray-100 p-3 rounded cursor-pointer hover:shadow"
                >

                  <span className="text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
                    🔥 Deal
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain mx-auto my-2"
                  />

                  <h3 className="text-sm text-center font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-center text-orange-500 font-bold">
                    ${product.price}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* PRODUCTS GRID */}

          {filteredProducts.length === 0 ? (

            <div className={emptyStateClass}>

              <p className="text-lg font-semibold">
                No products match your search
              </p>

              <p>
                Try clearing filters or search again
              </p>

            </div>

          ) : (

            <div className={productGrid + " mt-6 sm:mt-8"}>

              {filteredProducts.map((product, index) => (

                <div
                  key={index}
                  onClick={() => gotoProduct(product)}
                  className={productCardClass}
                >

                  {product.stock <= 5 && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      Low Stock
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className={productImage}
                  />

                  <h2 className={productName + " text-center"}>
                    {product.name}
                  </h2>

                  <p className="text-center font-semibold">
                    ${product.price}
                  </p>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>

    </div>

  )
}

export default Products

