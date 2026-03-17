import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import {
  pageBackground,
  formCard,
  formTitle,
  formBackground,
  inputClass,
  formGroup,
  submitBtn,
  errorClass,
  labelClass
} from "../styles/common";

function SignIn() {

  const { register, handleSubmit, formState:{errors} } = useForm();

  const error = useAuth(state=>state.error);
  const login = useAuth(state=>state.login);
  const isAuthenticated = useAuth(state=>state.isAuthenticated);
  const currentUser = useAuth(state=>state.currentUser);

  const navigate = useNavigate();

  const onUserLogin = async(userCredObj)=>{
    await login(userCredObj);
  }

  useEffect(()=>{

    if(isAuthenticated && currentUser){

      if(currentUser.role==="USER"){
        toast.success("Logged In successfully")
        navigate('/user-profile')
      }

      if(currentUser.role==="ADMIN"){
        navigate('/admin-profile')
      }

    }

  },[isAuthenticated,currentUser])

  return (

    <div className={formBackground}>

      <form
        onSubmit={handleSubmit(onUserLogin)}
        className={formCard}
      >

        <h2 className={formTitle}>Sign In</h2>

        {error && <p className={errorClass}>{error}</p>}

        {/* Email */}
        <div className={formGroup}>

          <label className={labelClass}>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
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
          Sign In
        </button>

      </form>

    </div>
  );
}

export default SignIn;