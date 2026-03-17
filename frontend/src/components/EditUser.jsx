import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "../store/authStore"

import {
  formCard,
  formTitle,
  formGroup,
  inputClass,
  submitBtn
} from "../styles/common"

function EditUser() {

 const {register,handleSubmit} = useForm()

 const currentUser = useAuth(state=>state.currentUser)

 const updateUser = async(data)=>{

   await axios.put(
     `http://localhost:3000/user-api/update-user/${currentUser._id}`,
     data,
     {withCredentials:true}
   )

 }

 return(

  <div className="py-16">

  <form onSubmit={handleSubmit(updateUser)} className={formCard}>

    <h1 className={formTitle}>Edit Profile</h1>

    <div className={formGroup}>
      <input
        type="text"
        placeholder="First Name"
        className={inputClass}
        {...register("firstName")}
      />
    </div>

    <div className={formGroup}>
      <input
        type="text"
        placeholder="Last Name"
        className={inputClass}
        {...register("lastName")}
      />
    </div>

    <div className={formGroup}>
      <input
        type="email"
        placeholder="Email"
        className={inputClass}
        {...register("email")}
      />
    </div>

    <button type="submit" className={submitBtn}>
      Update
    </button>

  </form>

  </div>

 )

}

export default EditUser