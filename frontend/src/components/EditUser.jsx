import { useEffect } from "react" // React effect hook for lifecycle
import { useForm } from "react-hook-form" // Form management library
import axios from "axios" // HTTP client for API calls
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

function EditUser() {

  // Initialize form handling
  const { register, handleSubmit, setValue } = useForm()

  // Get currently logged-in user from global state
  const currentUser = useAuth(state => state.currentUser)
  const setCurrentUser = useAuth(state => state.setCurrentUser)
  const currentUserId = currentUser?._id || currentUser?.userId

  useEffect(() => {
    if (currentUser) {
      setValue("firstName", currentUser.firstName || "")
      setValue("lastName", currentUser.lastName || "")
      setValue("email", currentUser.email || "")
    }
  }, [currentUser, setValue])

  // ================== UPDATE USER HANDLER ==================

  const updateUser = async (data) => {
    try {
      if (!currentUserId) {
        toast.error("Unable to update profile. Please sign in again.")
        return
      }

      const response = await axios.put(
        `${BASE_URL}/user-api/update-user/${currentUserId}`,
        data,
        { withCredentials: true } // Include authentication cookies
      )

      if (response?.data?.payload) {
        setCurrentUser(response.data.payload)
      }

      toast.success("Profile updated successfully!") // Success feedback

    } catch (err) {
      console.error(err) // Log error for debugging
      toast.error(err.response?.data?.message || "Failed to update profile.") // Error feedback
    }
  }

  return (
    <div className={pageWrapper + " flex justify-center items-start py-10"}>
      <form onSubmit={handleSubmit(updateUser)} className={formCard}>
        <h1 className={formTitle}>Edit Profile</h1>
        <p className={bodyText + " mb-6 text-center text-sm text-[#555]"}>
          Update your name and email. Leave fields empty to keep existing values.
        </p>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className={inputClass}
            {...register("firstName")}
          />
        </div>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className={inputClass}
            {...register("lastName")}
          />
        </div>

        <div className={formGroup}>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={inputClass}
            {...register("email")}
          />
        </div>

        <button type="submit" className={submitBtn}>
          Update Profile
        </button>
      </form>
    </div>
  )
}

// Export component
export default EditUser