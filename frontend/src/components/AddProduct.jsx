import { useState } from "react"
import axios from "axios"
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast'

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

  // state to handle loading and error during API call
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // react-hook-form setup for handling form and validations
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  // function to handle product submission
  const productSubmit = async (newProduct) => {
    try{
       // set loading true before API call
      setLoading(true);

      // send POST request to backend to add product (admin only)
      await axios.post(
        'https://skillintern-e-commerce-website.onrender.com/product-api/products',
        newProduct,
        { withCredentials: true } // send cookies (JWT token) for authentication
      );

      // show success message after product is added
      toast.success("Product Added Successfully");
      
      // reset form fields after success
      reset();

    }catch(err){

      // store error if API fails
      setError(err);

    }finally{
    
      // stop loading after API completes (success or error)
      setLoading(false);

    }

  };

  return (

    <div className={adminPageWrapper}>

      {/* page heading */}
      <h1 className={adminHeader}>Add New Product</h1>

      <div className={adminFormCard}>
          {/* form to add new product */}
        <form onSubmit={handleSubmit(productSubmit)}>

          {/* product name input */}
          <div className={formGroup}>
            <label className={labelClass}>Product Name</label>
            <input type="text" placeholder="Enter product name" className={inputClass} {...register("name",{required:true})}/>
            {errors.name && <p className={errorClass}>Name is required</p>}
          </div>

          {/* product description input */}
          <div className={formGroup}>
            <label className={labelClass}>Description</label>
            <input type="text" placeholder="Enter product description" className={inputClass} {...register("description",{required:true})}/>
            {errors.description && <p className={errorClass}>Description is required</p>}
          </div>

          {/* price and stock inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className={formGroup}>
              <label className={labelClass}>Price ($)</label>
              <input type="number" placeholder="Enter price" className={inputClass} {...register("price",{required:true})}/>
              {errors.price && <p className={errorClass}>Price is required</p>}
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Stock Quantity</label>
              <input type="number" placeholder="Enter stock" className={inputClass} {...register("stock",{required:true})}/>
              {errors.stock && <p className={errorClass}>Stock is required</p>}
            </div>
          </div>

          {/* product image URL */}
          <div className={formGroup}>
            <label className={labelClass}>Image URL</label>
            <input type="text" placeholder="Enter image URL" className={inputClass} {...register("image",{required:true})}/>
            {errors.image && <p className={errorClass}>Image URL is required</p>}
          </div>

          {/* category and brand inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className={formGroup}>
              <label className={labelClass}>Category</label>
              <input type="text" placeholder="Enter category" className={inputClass} {...register("category",{required:true})}/>
              {errors.category && <p className={errorClass}>Category is required</p>}
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Brand</label>
              <input type="text" placeholder="Enter brand" className={inputClass} {...register("brand",{required:true})}/>
              {errors.brand && <p className={errorClass}>Brand is required</p>}
            </div>
          </div>

          {/* display backend error message if exists */}
          {error && <p className={errorClass}>{error.response?.data?.error || "Something went wrong"}</p>}

          {/* submit button with loading state */}
          <button type="submit" className={submitBtn}>
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddProduct