import { useEffect } from "react";
import { useNavigate ,useLocation, redirect} from "react-router";
function Unauthorized({delay=5000}) {

  const navigate=useNavigate();
  const location=useLocation();

  const redirectTo=location.state?.redirectTo || "/signin";

  useEffect(()=>{
    const timer=setTimeout(()=>{
    navigate(redirectTo ,{replace:true})
    },delay);
    
    return ()=>clearTimeout(timer);
  },[redirectTo,navigate,delay]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-2">You don’t have permission to access this page.</p>
      <p className="text-sm text-gray-500">Redirecting...</p>
    </div>
  )
}

export default Unauthorized
