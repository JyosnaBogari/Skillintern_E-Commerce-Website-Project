import { useEffect } from "react" // React effect hook for lifecycle
import { useForm } from "react-hook-form" // Form handling with validation support
import axios from "axios" // HTTP client for API requests
import { useAuth } from "../store/authStore" // Global auth store to access current user
import { toast } from "react-hot-toast" // Toast notifications
import BASE_URL from "../config/baseAPI"
import {
  pageWrapper,
  formCard,
  formTitle,
  formGroup,
  inputClass,
  labelClass,
  submitBtn,
  bodyText
} from "../styles/common" // Reusable styling classes

function ChangePassword() {

  // Initialize react-hook-form with reset support
  const { register, handleSubmit, reset, setValue } = useForm()
  const currentUser = useAuth(state => state.currentUser)

  useEffect(() => {
    if (currentUser?.email) {
      setValue("email", currentUser.email)
    }
  }, [currentUser, setValue])

  // ================== CHANGE PASSWORD HANDLER ==================

  const changePass = async (data) => {
    try {
      const requestBody = {
        ...data,
        email: currentUser?.email || data.email
      }

      // API call to update password
      await axios.put(
        `${BASE_URL}/common-api/change-password`,
        requestBody,
        { withCredentials: true } // Include authentication cookies
      )

      toast.success("Password changed successfully!") // Show success feedback

      reset() // Clear form fields after successful submission

    } catch (err) {
      console.error(err) // Log error for debugging
      toast.error(err.response?.data?.message || "Failed to change password.") // Show error feedback
    }
  }

  return (
    <div className={pageWrapper + " flex justify-center items-start py-10"}>
      <form onSubmit={handleSubmit(changePass)} className={formCard}>
        <h1 className={formTitle}>Change Password</h1>
        <p className={bodyText + " mb-6 text-center text-sm text-[#555]"}>
          Use a strong new password and keep your account secure.
        </p>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={inputClass}
            {...register("email")}
            readOnly
          />
        </div>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="password">Current Password</label>
          <input
            id="password"
            type="password"
            placeholder="Current Password"
            className={inputClass}
            {...register("password")}
          />
        </div>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="newpassword">New Password</label>
          <input
            id="newpassword"
            type="password"
            placeholder="New Password"
            className={inputClass}
            {...register("newpassword")}
          />
        </div>

        <button type="submit" className={submitBtn}>
          Change Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword