import { useState } from 'react' // React hook for state management
import { useForm } from 'react-hook-form' // Form handling & validation
import axios from 'axios' // HTTP client for API calls
import { useNavigate } from 'react-router' // Navigation hook

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

  // FORM HANDLING

  // react-hook-form setup with validation and reset support
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  //STATE MANAGEMENT 

  // Loading state for API request
  const [loading, setLoading] = useState(false)

  // Error state for displaying API errors
  const [error, setError] = useState(null)

  // Navigation hook
  const navigate = useNavigate()
  
  // FORM SUBMISSION 

  const submitForm = async (newUser) => {
    setLoading(true) // Start loading

    try {
      // API call to register new user
      let resObj = await axios.post(
        "https://skillintern-e-commerce-website.onrender.com/user-api/users",
        newUser,
        { withCredentials: true } // Include cookies if needed
      )

      // On successful registration
      if (resObj.status === 201) {
        reset() // Clear form fields
        navigate("/signin") // Redirect to login page
      }

    } catch (err) {
      // Handle API error safely
      setError(err.response?.data?.error || "Registration failed")

    } finally {
      setLoading(false) // Stop loading
    }
  }

  //  LOADING STATE

  if (loading) {
    return <p className={loadingClass}>Loading...</p>
  }

  // UI RENDER 

  return (
    <div className={formBackground}>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit(submitForm)} // Form submission handler
        className={formCard}
      >

        {/* Form Title */}
        <h2 className={formTitle}>Create Account</h2>

        {/* Display API error */}
        {error && <p className={errorClass}>{error}</p>}

        {/*  FIRST NAME */}
        <div className={formGroup}>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            className={inputClass}
            {...register("firstName", { required: true, minLength: 3 })} // Validation rules
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              Firstname required
            </p>
          )}
        </div>

        {/* LAST NAME  */}
        <div className={formGroup}>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            className={inputClass}
            {...register("lastName", { required: true, minLength: 3 })}
          />
        </div>

        {/* EMAIL */}
        <div className={formGroup}>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className={inputClass}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              Email required
            </p>
          )}
        </div>

        {/* PASSWORD*/}
        <div className={formGroup}>
          <label className={labelClass}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className={inputClass}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              Password required
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
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

// Export component
export default SignUp