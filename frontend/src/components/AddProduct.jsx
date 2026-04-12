import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import BASE_URL from "../config/baseAPI"

import {
  adminPageWrapper,
  adminHeader,
  adminFormCard,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  errorClass
} from "../styles/common"

function AddProduct() {

  // human state for loading and error handling
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // human react-hook-form setup
  const { handleSubmit, register, reset, formState: { errors } } = useForm()

  // human submit handler
  const productSubmit = async (newProduct) => {
    try {
      setLoading(true)

      // human create FormData for backend file upload
      const form = new FormData()

      form.append("name", newProduct.name)
      form.append("description", newProduct.description)
      form.append("price", newProduct.price)
      form.append("stock", newProduct.stock)
      form.append("category", newProduct.category)
      form.append("brand", newProduct.brand)

      // human image file handling
      if (newProduct.image && newProduct.image[0]) {
        form.append("image", newProduct.image[0])
      }

      // human API request
      await axios.post(`${BASE_URL}/product-api/products`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      toast.success("Product Added Successfully")
      reset()

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={adminPageWrapper}>

      <h1 className={adminHeader}>Add New Product</h1>

      <div className={adminFormCard}>

        <form onSubmit={handleSubmit(productSubmit)}>

          {/* Product Name */}
          <div className={formGroup}>
            <label className={labelClass}>Product Name</label>
            <input className={inputClass} {...register("name", { required: true })} />
            {errors.name && <p className={errorClass}>Name is required</p>}
          </div>

          {/* Description */}
          <div className={formGroup}>
            <label className={labelClass}>Description</label>
            <input className={inputClass} {...register("description", { required: true })} />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div className={formGroup}>
              <label className={labelClass}>Price</label>
              <input type="number" className={inputClass} {...register("price", { required: true })} />
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Stock</label>
              <input type="number" className={inputClass} {...register("stock", { required: true })} />
            </div>

          </div>

          {/* Image Upload */}
          <div className={formGroup}>
            <label className={labelClass}>Upload Image</label>
            <input type="file" className={inputClass} {...register("image", { required: true })} />
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div className={formGroup}>
              <label className={labelClass}>Category</label>
              <input className={inputClass} {...register("category", { required: true })} />
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Brand</label>
              <input className={inputClass} {...register("brand", { required: true })} />
            </div>

          </div>

          {/* Error display */}
          {error && <p className={errorClass}>{error}</p>}

          {/* Submit */}
          <button className={submitBtn}>
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default AddProduct