import { useNavigate } from "react-router" // Hook for navigation
import { useEffect, useState } from "react" // React hooks for state & lifecycle
import axios from "axios" // HTTP client for API requests

import {
 loadingClass,
 adminPageWrapper,
 adminHeader,
 adminCardClass,
 headingClass,
 bodyText,
 primaryBtn,
 secondaryBtn
} from "../styles/common"; // Reusable styling classes
import BASE_URL from "../config/baseAPI";
import { toast } from "react-hot-toast"; // Toast notifications

function Users() {

 //STATE MANAGEMENT

 // Stores list of users
 const [users, setUsers] = useState([]);

 // Loading state for API calls
 const [loading, setLoading] = useState(false)

 // Error state (used for auth errors)
 const [error, setError] = useState(null)

 // Navigation hook
 const navigate = useNavigate()

 // FETCH USERS 

 useEffect(() => {

  async function getUsers() {
   try {
    setLoading(true) // Start loading

    // API call to fetch all users
    let res = await axios.get(
     `${BASE_URL}/user-api/users`,
     { withCredentials: true } // Include authentication cookies
    )

    // Store users in state
    setUsers(res.data.payload)

   } catch (err) {

    // Capture error status (e.g., 401/403 for unauthorized)
    setError(err.response?.status)

   } finally {

    setLoading(false) // Stop loading

   }
  }

  getUsers() // Call function on component mount

 }, [])

 // BLOCK USER 

 const blockUser = async (userId) => {
  try {

   // API call to block user
   await axios.put(
    `${BASE_URL}/admin-api/blockuser`,
    { userId },
    { withCredentials: true }
   )

   toast.success("User Blocked") // Success feedback

   // Update UI: mark user as inactive
   setUsers(users.map(user =>
    user._id === userId ? { ...user, isActive: false } : user
   ))

  } catch (err) {
   console.log(err) // Log error
  }
 }

 //  UNBLOCK USER 

 const unblockUser = async (userId) => {
  try {

   // API call to unblock user
   await axios.put(
    `${BASE_URL}/admin-api/unblockuser`,
    { userId },
    { withCredentials: true }
   )

   toast.success("User Unblocked") // Success feedback

   // Update UI: mark user as active
   setUsers(users.map(user =>
    user._id === userId ? { ...user, isActive: true } : user
   ))

  } catch (err) {
   console.log(err) // Log error
  }
 }

 //LOADING STATE 

 if (loading === true) {
  return <p className={loadingClass}>Loading...</p>
 }

 // UI RENDER

 return (

  <div className={adminPageWrapper}>

   {/* Page Title */}
   <h1 className={adminHeader}>Users Management</h1>

   {/* Show message if unauthorized */}
   {(error === 403 || error === 401) && (
    <button onClick={() => navigate('/signin')} className={primaryBtn}>
     Only Admin can view Users
    </button>
   )}

   {/* Users Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Render each user */}
    {users.map(user => (

     <div key={user._id} className={adminCardClass}>

      {/* User Header */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h2 className={headingClass + " text-lg mb-1"}>
         {user.firstName} {user.lastName}
        </h2>
        <p className="text-xs text-[#666]">{user.role}</p>
      </div>

      {/* User Email */}
      <p className={bodyText + " mb-2"}>
        <strong>Email:</strong> {user.email}
      </p>

      {/* User Status */}
      <p className={bodyText + " mb-3"}>
       <strong>Status:</strong> 
       <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
         user.isActive
           ? 'bg-green-100 text-green-700'
           : 'bg-red-100 text-red-700'
       }`}>
        {user.isActive ? "Active" : "Blocked"}
       </span>
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">

       {/* Conditional rendering: Block / Unblock */}
       {user.isActive ? (

        <button
         onClick={() => blockUser(user._id)}
         className={secondaryBtn + " flex-1"}
        >
         Block
        </button>

       ) : (

        <button
         onClick={() => unblockUser(user._id)}
         className={primaryBtn + " flex-1"}
        >
         Unblock
        </button>

       )}

      </div>

     </div>

    ))}

   </div>

  </div>

 )
}

// Export component
export default Users