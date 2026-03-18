import { useForm } from "react-hook-form" // Form handling with validation support
import axios from "axios" // HTTP client for API requests
import { toast } from "react-hot-toast" // Toast notifications

import {
  formCard,
  formTitle,
  formGroup,
  inputClass,
  submitBtn
} from "../styles/common" // Reusable styling classes

function ChangePassword() {

  // Initialize react-hook-form with reset support
  const { register, handleSubmit, reset } = useForm()

  // ================== CHANGE PASSWORD HANDLER ==================

  const changePass = async (data) => {
    try {
      // API call to update password
      await axios.put(
        "http://localhost:3000/common-api/change-password",
        data,
        { withCredentials: true } // Include authentication cookies
      )

      toast.success("Password changed successfully!") // Show success feedback

      reset() // Clear form fields after successful submission

    } catch (err) {
      console.error(err) // Log error for debugging
      toast.error("Failed to change password.") // Show error feedback
    }
  }

  return (
    <div className="py-16">

      {/* Form container */}
      <form onSubmit={handleSubmit(changePass)} className={formCard}>

        {/* Form title */}
        <h1 className={formTitle}>Change Password</h1>

        {/* Email input */}
        <div className={formGroup}>
          <input
            placeholder="Email"
            className={inputClass}
            {...register("email")} // Register field with react-hook-form
          />
        </div>

        {/* Old password input */}
        <div className={formGroup}>
          <input
            type="password"
            placeholder="Old Password"
            className={inputClass}
            {...register("password")}
          />
        </div>

        {/* New password input */}
        <div className={formGroup}>
          <input
            type="password"
            placeholder="New Password"
            className={inputClass}
            {...register("newpassword")}
          />
        </div>

        {/* Submit button */}
        <button type="submit" className={submitBtn}>
          Change Password
        </button>

      </form>
    </div>
  )
}

export default ChangePassword