
import { useAuth } from "../store/authStore"
import { errorClass } from "../styles/common";
import Unauthorized from './Unauthorized';
import {Navigate, redirect} from 'react-router';

function ProtectedRoute({children,allowedRoles}) {
    let {loading,currentUser,isAuthenticated}=useAuth();
   //loading status
    if(loading)
    {
        return <p className={errorClass}>Loading...</p>
    }
    //if user not logged in
    if(!isAuthenticated)
    {
        return <Navigate to='/signin' replace/>
    }
   
    //check user role
    if(allowedRoles && !allowedRoles.includes(currentUser?.role))
    {
       return <Navigate to='unauthorized' replace state={{redirectTo:'/'}}/>
    }

   return children
}

export default ProtectedRoute
