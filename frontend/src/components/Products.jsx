import { useEffect, useState } from "react" // React hooks for lifecycle and state
import {
  loadingClass,
  productCardClass,
  productGrid,
  productImage,
  productName,
  pageWrapper,
  emptyStateClass,
  filterTitle,
  filterInput,
  filterButton,
  errorClass
} from "../styles/common" // Reusable CSS classes

import axios from "axios" // For API requests
import { useNavigate, useLocation } from "react-router" // Routing hooks

function Products() {

  //  HERO IMAGES
  // Banner images with text and CTA
  const heroImages = [
    {
      src: "https://images.meesho.com/images/marketing/1744698265981.webp",
      alt: "Shop trending collections",
      cta: "Shop Now",
    },
    {
      src: "https://ecommercephotographyindia.com/assets/img/gallery/jewellery4.jpg",
      alt: "Premium jewellery",
      cta: "Explore Jewellery",
    },
    {
      src: "https://ecommercephotographyindia.com/assets/img/gallery/bangles-set-dark-bg.jpg",
      alt: "Stylish bangles",
      cta: "See More",
    },
    {
      src: "https://voilastudio.in/mega_menu/img/indexpagebanner/mobilebanner/luxury_shoot_mobile_banner.webp",
      alt: "Luxury fashion",
      cta: "Browse Now",
    },
  ];

  // STATE
  const [heroIndex, setHeroIndex] = useState(0) // Current hero image index
  const [products, setProducts] = useState([]) // All products
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState(null) // Error state
  const [wishlistCount, setWishlistCount] = useState(0) // Wishlist count

  // WISHLIST COUNT 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlistCount(stored.length) // Set count from localStorage
  }, [])

  // HERO AUTO SLIDE 
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length) // Loop images
    }, 7000)
    return () => clearInterval(interval) // Cleanup
  }, [])

  //  ROUTING 
  const location = useLocation()
  const navigate = useNavigate()

  //  SEARCH PARAM
  const queryParams = new URLSearchParams(location.search)
  const initialSearch = queryParams.get("q") || "" // Get search query from URL

  //  FILTER STATES 
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")

  //  NAVIGATE TO PRODUCT 
  const gotoProduct = (productObj) => {
    navigate(`/product/${productObj._id}`)
  }

  // UPDATE SEARCH 
  useEffect(() => {
    setSearchTerm(initialSearch)
  }, [initialSearch])

  //  FETCH PRODUCTS 
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      let res = await axios.get(
        "http://localhost:3000/product-api/products",
        { withCredentials: true }
      )

      setProducts(res.data.payload) // Save products

    } catch (err) {
      setError(err) // Save error
    } finally {
      setLoading(false) // Stop loading
    }
  }

  // INITIAL LOAD 
  useEffect(() => {
    fetchProducts()
  }, [])

  //  LOADING UI
  if (loading) {
    return (
      <div className={pageWrapper}>
        <p className={loadingClass}>Loading Products...</p>
      </div>
    )
  }

  // ERROR UI 
  if (error) {
    return (
      <div className={pageWrapper}>
        <div className={errorClass}>
          <p className="font-semibold">Something went wrong</p>
          <p>{error.message}</p>

          {/* Retry button */}
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

  // UNIQUE FILTER VALUES 
  const categories = [...new Set(products.map(p => p.category))]
  const brands = [...new Set(products.map(p => p.brand))]

  //  PRICE CONVERSION 
  const priceMinValue = priceMin ? parseFloat(priceMin) : 0
  const priceMaxValue = priceMax ? parseFloat(priceMax) : Infinity

  //  FILTER LOGIC 
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

  //   UI
  return (
    <div className={pageWrapper}>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden shadow-lg mb-6">
        <img
          src={heroImages[heroIndex].src}
          alt={heroImages[heroIndex].alt}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-105 object-center"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            {heroImages[heroIndex].alt}
          </h2>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-orange-500 text-white rounded-full"
          >
            {heroImages[heroIndex].cta}
          </button>
        </div>
      </section>

      {/* WISHLIST BUTTON */}
      <div className="flex justify-end mb-4">
        <div
          onClick={() => navigate("/wishlist")}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-full cursor-pointer"
        >
          ❤️ Wishlist
          <span className="bg-pink-500 text-white px-2 rounded-full text-xs">
            {wishlistCount}
          </span>
        </div>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 w-full">

        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-75 lg:sticky lg:top-20 self-start flex flex-col gap-4">

          {/* Search filter */}
          <div className="bg-white p-4 border rounded">
            <p className={filterTitle}>🔍 Search</p>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={filterInput}
              placeholder="Search..."
            />
          </div>

          {/* Category filter */}
          <div className="bg-white p-4 border rounded">
            <p className={filterTitle}>📂 Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={filterInput}
            >
              <option value="">All</option>
              {categories.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>
          </div>

          {/* Brand filter */}
          <div className="bg-white p-4 border rounded">
            <p className={filterTitle}>🏷️ Brand</p>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={filterInput}
            >
              <option value="">All</option>
              {brands.map((b, i) => (
                <option key={i}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price filter */}
          <div className="bg-white p-4 border rounded">
            <p className={filterTitle}>💰 Price</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className={filterInput}
                placeholder="Min"
              />
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className={filterInput}
                placeholder="Max"
              />
            </div>
          </div>

          {/* Clear filters */}
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
            Clear Filters
          </button>

        </aside>

        {/* PRODUCTS SECTION */}
        <main className="w-full min-w-0 bg-white rounded-lg p-4 sm:p-6 shadow-sm">

          {/* Empty state */}
          {filteredProducts.length === 0 ? (
            <div className={emptyStateClass}>
              No products found
            </div>
          ) : (
            // Product grid
            <div className={productGrid}>
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => gotoProduct(product)}
                  className={productCardClass}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={productImage}
                  />
                  <h2 className={productName}>{product.name}</h2>
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