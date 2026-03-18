
import { useAuth } from "../store/authStore";
import PublicNavBar from "./PublicNavBar";
import UserNavBar from "./UserNavBar";
import AdminNavBar from "./AdminNavBar";

function Navbar() {
  const currentUser=useAuth(state=>state.currentUser)
  const isAuthenticated=useAuth(state=>state.isAuthenticated)
  // if user not Authenticated and no current user show PublicNavBar
    if(!currentUser && !isAuthenticated)
    {
      return <PublicNavBar/>
    }
    // user Authenticated and with role show UserNavBar
    if(currentUser?.role==="USER")
    {
     return <UserNavBar/>
    }
     // user Authenticated and with role show AdminNavBar
    if(currentUser?.role==="ADMIN")
    {
     return <AdminNavBar/>
   } 
  // default navbar
   return <PublicNavBar/>
}

export default Navbar;