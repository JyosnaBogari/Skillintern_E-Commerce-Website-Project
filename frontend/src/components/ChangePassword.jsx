import { useForm } from "react-hook-form"
import axios from "axios"

import {
  formCard,
  formTitle,
  formGroup,
  inputClass,
  submitBtn
} from "../styles/common"

function ChangePassword(){

 const {register,handleSubmit} = useForm()

 const changePass = async(data)=>{
   await axios.put(
     'http://localhost:3000/common-api/change-password',
     data ,{withCredentials:true}
   )
 }

 return(

  <div className="py-16">

  <form onSubmit={handleSubmit(changePass)} className={formCard}>

   <h1 className={formTitle}>Change Password</h1>

   <div className={formGroup}>
    <input
     placeholder="Email"
     className={inputClass}
     {...register("email")}
    />
   </div>

   <div className={formGroup}>
    <input
     type="password"
     placeholder="Old Password"
     className={inputClass}
     {...register("password")}
    />
   </div>

   <div className={formGroup}>
    <input
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