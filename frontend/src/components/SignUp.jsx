import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router'

import {
  pageBackground,
  formCard,
  formTitle,
  formBackground,
  inputClass,
  formGroup,
  submitBtn,
  loadingClass,
  errorClass,
  labelClass
} from "../styles/common.js"

function SignUp() {

  const { register, handleSubmit, formState:{errors} } = useForm()

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  const submitForm = async (newUser)=>{
    setLoading(true)

    try{
      let resObj = await axios.post(
        "http://localhost:3000/user-api/users",
        newUser,
        {withCredentials:true}
      )

      if(resObj.status===201){
        navigate("/signin")
      }

    }catch(err){
      setError(err.response?.data?.error || "Registration failed")
    }
    finally{
      setLoading(false)
    }
  }

  if(loading){
    return <p className={loadingClass}>Loading...</p>
  }

  return (

    <div className={formBackground}>

      <form
        onSubmit={handleSubmit(submitForm)}
        className={formCard}
      >

        <h2 className={formTitle}>Create Account</h2>

        {error && <p className={errorClass}>{error}</p>}

        {/* First Name */}
        <div className={formGroup}>
          <label className={labelClass}>First Name</label>

          <input
            type="text"
            placeholder="Enter first name"
            className={inputClass}
            {...register("firstName",{required:true,minLength:3})}
          />

          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              Firstname required
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className={formGroup}>
          <label className={labelClass}>Last Name</label>

          <input
            type="text"
            placeholder="Enter last name"
            className={inputClass}
            {...register("lastName",{required:true,minLength:3})}
          />
        </div>

        {/* Email */}
        <div className={formGroup}>
          <label className={labelClass}>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            className={inputClass}
            {...register("email",{required:true})}
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              Email required
            </p>
          )}
        </div>

        {/* Password */}
        <div className={formGroup}>
          <label className={labelClass}>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            className={inputClass}
            {...register("password",{required:true})}
          />

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              Password required
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className={submitBtn}
        >
          Sign Up
        </button>

      </form>

    </div>
  )
}

export default SignUp