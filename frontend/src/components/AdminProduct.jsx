import { useEffect, useState } from "react"
import axios from "axios"

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
} from "../styles/common"

import { toast } from "react-hot-toast"

function AdminProducts() {

  const [products,setProducts]=useState([])
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  useEffect(()=>{

    async function getProducts(){

      let res = await axios.get(
        "http://localhost:3000/product-api/products",
        {withCredentials:true}
      )

      setProducts(res.data.payload)

    }

    getProducts()

  },[])

  const deleteProduct = async(id)=>{

    try{

      await axios.delete(
        `http://localhost:3000/admin-api/product-id/${id}`,
        {withCredentials:true}
      )

      toast.success("Product Deleted")

      setProducts(products.filter(p=>p._id!==id))

    }catch(err){

      console.log(err)

    }

  }

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  const priceMinValue = priceMin ? parseFloat(priceMin) : 0
  const priceMaxValue = priceMax ? parseFloat(priceMax) : Infinity

  const filteredProducts = products.filter(product=>{
    const matchesCategory = category ? product.category === category : true
    const matchesBrand = brand ? product.brand === brand : true
    const matchesPrice = product.price >= priceMinValue && product.price <= priceMaxValue
    return matchesCategory && matchesBrand && matchesPrice
  })

  return (

    <div className={layoutWrapper}>

      {/* Filter Sidebar */}
      <aside className={filterSidebar}>

        <h3 className={filterTitle}>Filters</h3>

        <div>
          <p className={filterTitle}>Category</p>
          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className={filterInput}
          >
            <option value="">All Categories</option>
            {categories.map((cat,idx)=>(
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className={filterTitle}>Brand</p>
          <select
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
            className={filterInput}
          >
            <option value="">All Brands</option>
            {brands.map((b,idx)=>(
              <option key={idx} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <p className={filterTitle}>Price Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={priceMin}
              onChange={(e)=>setPriceMin(e.target.value)}
              className={filterInput}
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              value={priceMax}
              onChange={(e)=>setPriceMax(e.target.value)}
              className={filterInput}
              placeholder="Max"
            />
          </div>
        </div>

        <button
          onClick={()=>{
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

      {/* Main Content */}
      <div className={contentArea}>

        <div className="mb-6">
          <h1 className={adminHeader}>Manage Products</h1>
        </div>

        <div className={productGrid}>

          {filteredProducts.map(product=>(

            <div key={product._id} className={productCardClass + " relative group"}>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={()=>deleteProduct(product._id)}
                  className={dangerBtn}
                  title="Delete product"
                >
                  ✕
                </button>
              </div>

              <img src={product.image} className={productImage}/>

              <h3 className={productName}>{product.name}</h3>

              <p className={bodyText}>${product.price}</p>

              <p className="text-xs text-[#666]">{product.category}</p>

              <button
                onClick={()=>deleteProduct(product._id)}
                className={primaryBtn + " w-full"}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default AdminProducts