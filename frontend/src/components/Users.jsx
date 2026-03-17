import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"

import {
 loadingClass,
 adminPageWrapper,
 adminHeader,
 adminCardClass,
 headingClass,
 bodyText,
 primaryBtn,
 secondaryBtn
} from "../styles/common";

import { toast } from "react-hot-toast";

function Users() {

 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 const navigate = useNavigate()

 useEffect(() => {

  async function getUsers() {

   try{

    setLoading(true)

    let res = await axios.get(
     "http://localhost:3000/user-api/users",
     { withCredentials: true }
    )

    setUsers(res.data.payload)

   }catch (err){

    setError(err.response?.status)

   }finally{

    setLoading(false)

   }

  }

  getUsers()

 }, [])

 const blockUser = async (userId) => {

  try{

   await axios.put(
    "http://localhost:3000/admin-api/blockuser",
    { userId },
    { withCredentials: true }
   )

   toast.success("User Blocked")

   setUsers(users.map(user =>
    user._id === userId ? { ...user, isActive: false } : user
   ))

  }catch(err){

   console.log(err)

  }

 }

 const unblockUser = async (userId) => {

  try{

   await axios.put(
    "http://localhost:3000/admin-api/unblockuser",
    { userId },
    { withCredentials: true }
   )

   toast.success("User Unblocked")

   setUsers(users.map(user =>
    user._id === userId ? { ...user, isActive: true } : user
   ))

  }catch(err){

   console.log(err)

  }

 }

 if (loading === true) {
  return <p className={loadingClass}>Loading...</p>
 }

 return (

  <div className={adminPageWrapper}>

   <h1 className={adminHeader}>Users Management</h1>

   {(error === 403 || error === 401) && (
    <button onClick={() => navigate('/signin')} className={primaryBtn}>
     Only Admin can view Users
    </button>
   )}

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {users.map(user => (

     <div key={user._id} className={adminCardClass}>

      <div className="mb-3 pb-3 border-b border-gray-200">
        <h2 className={headingClass + " text-lg mb-1"}>
         {user.firstName} {user.lastName}
        </h2>
        <p className="text-xs text-[#666]">{user.role}</p>
      </div>

      <p className={bodyText + " mb-2"}><strong>Email:</strong> {user.email}</p>

      <p className={bodyText + " mb-3"}>
       <strong>Status:</strong> 
       <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {user.isActive ? "Active" : "Blocked"}
       </span>
      </p>

      <div className="flex gap-2">

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

export default Users