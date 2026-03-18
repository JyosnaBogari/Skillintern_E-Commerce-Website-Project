import { useForm } from "react-hook-form" // Form management library
import axios from "axios" // HTTP client for API calls
import { useAuth } from "../store/authStore" // Global auth store to access current user
import { toast } from "react-hot-toast" // Toast notifications

import {
  formCard,
  formTitle,
  formGroup,
  inputClass,
  submitBtn
} from "../styles/common" // Reusable styling classes

function EditUser() {

  // Initialize form handling
  const { register, handleSubmit } = useForm()

  // Get currently logged-in user from global state
  const currentUser = useAuth(state => state.currentUser)

  // ================== UPDATE USER HANDLER ==================

  const updateUser = async (data) => {
    try {
      // API call to update user details using user ID
      await axios.put(
        `https://skillintern-e-commerce-website.onrender.com/user-api/update-user/${currentUser._id}`,
        data,
        { withCredentials: true } // Include authentication cookies
      )

      toast.success("Profile updated successfully!") // Success feedback

    } catch (err) {
      console.error(err) // Log error for debugging
      toast.error("Failed to update profile.") // Error feedback
    }
  }

  return (
    <div className="py-16">

      {/* Profile Edit Form */}
      <form onSubmit={handleSubmit(updateUser)} className={formCard}>

        {/* Form Title */}
        <h1 className={formTitle}>Edit Profile</h1>

        {/* First Name Input */}
        <div className={formGroup}>
          <input
            type="text"
            placeholder="First Name"
            className={inputClass}
            {...register("firstName")} // Register field
          />
        </div>

        {/* Last Name Input */}
        <div className={formGroup}>
          <input
            type="text"
            placeholder="Last Name"
            className={inputClass}
            {...register("lastName")}
          />
        </div>

        {/* Email Input */}
        <div className={formGroup}>
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            {...register("email")}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={submitBtn}>
          Update
        </button>

      </form>
    </div>
  )
}

// Export component
export default EditUser