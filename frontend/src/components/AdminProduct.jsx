import { useEffect, useState } from "react" // React hooks for state & lifecycle
import axios from "axios" // HTTP client for API calls

import {
  adminPageWrapper,
  adminHeader,
  productGrid,
  productCardClass,
  productImage,
  primaryBtn,
  productName,
  bodyText,
  dangerBtn,
  filterSidebar,
  filterTitle,
  filterInput,
  filterButton,
  layoutWrapper,
  contentArea
} from "../styles/common" // Reusable styling classes

import { toast } from "react-hot-toast" // Notification library
import BASE_URL from "../config/baseAPI"

function AdminProducts() {

  // ================== STATE MANAGEMENT ==================

  // Stores all products fetched from backend
  const [products, setProducts] = useState([])

  // Filter states
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  // ================== FETCH PRODUCTS ==================

  useEffect(() => {

    // Function to fetch products from API
    async function getProducts() {
      let res = await axios.get(
        `${BASE_URL}/product-api/products`,
        { withCredentials: true } // Include cookies for authentication
      )

      // Store fetched products in state
      setProducts(res.data.payload)
    }

    getProducts() // Call API on component mount

  }, [])

  // ================== DELETE PRODUCT ==================

  const deleteProduct = async (id) => {

    try {
      // API call to delete product by ID
      await axios.delete(
        `${BASE_URL}/admin-api/product-id/${id}`,
        { withCredentials: true }
      )

      toast.success("Product Deleted") // Show success message

      // Update UI by removing deleted product from state
      setProducts(products.filter(p => p._id !== id))

    } catch (err) {
      console.log(err) // Log error for debugging
    }

  }

  // ================== FILTER LOGIC ==================

  // Extract unique categories & brands for dropdowns
  const categories = [...new Set(products.map(p => p.category))]
  const brands = [...new Set(products.map(p => p.brand))]

  // Convert price inputs to numeric values
  const priceMinValue = priceMin ? parseFloat(priceMin) : 0
  const priceMaxValue = priceMax ? parseFloat(priceMax) : Infinity

  // Apply filtering based on selected criteria
  const filteredProducts = products.filter(product => {
    const matchesCategory = category ? product.category === category : true
    const matchesBrand = brand ? product.brand === brand : true
    const matchesPrice =
      product.price >= priceMinValue && product.price <= priceMaxValue

    return matchesCategory && matchesBrand && matchesPrice
  })

  // ================== UI RENDER ==================

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 w-full mt-10">

      {/* ================== FILTER SIDEBAR ================== */}
      <aside className="w-full lg:w-75 lg:sticky lg:top-20 self-start flex flex-col gap-4 bg-white p-4 border rounded">

        <h3 className={filterTitle}>Filters</h3>

        {/* Category Filter */}
        <div>
          <p className={filterTitle}>Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={filterInput}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <p className={filterTitle}>Brand</p>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={filterInput}
          >
            <option value="">All Brands</option>
            {brands.map((b, idx) => (
              <option key={idx} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <p className={filterTitle}>Price Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className={filterInput}
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className={filterInput}
              placeholder="Max"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setCategory('')
            setBrand('')
            setPriceMin('')
            setPriceMax('')
          }}
          className={filterButton}
        >
          Clear Filters
        </button>
      </aside>

      {/* ================== MAIN CONTENT ================== */}
      <main className="w-full min-w-0 bg-white rounded-lg p-4 sm:p-6 shadow-sm">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className={adminHeader}>Manage Products</h1>
        </div>

        {/* Product Grid */}
        <div className={productGrid}>

          {/* Render filtered products */}
          {filteredProducts.map(product => (
            <div key={product._id} className={productCardClass + " relative group"}>

              {/* Delete button (top-right hover) */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className={dangerBtn}
                  title="Delete product"
                >
                  ✕
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                className={productImage}
                alt={product.name}
              />

              {/* Product Details */}
              <h3 className={productName}>{product.name}</h3>
              <p className={bodyText}>${product.price}</p>
              <p className="text-xs text-[#666]">{product.category}</p>

              {/* Delete Button */}
              <button
                onClick={() => deleteProduct(product._id)}
                className={primaryBtn + " w-full"}
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// Export component
export default AdminProducts