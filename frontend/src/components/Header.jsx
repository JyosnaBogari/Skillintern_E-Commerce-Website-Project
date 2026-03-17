
import { useAuth } from "../store/authStore";
import PublicNavBar from "./PublicNavBar";
import UserNavBar from "./UserNavBar";
import AdminNavBar from "./AdminNavBar";

function Navbar() {
  const currentUser=useAuth(state=>state.currentUser)
  const isAuthenticated=useAuth(state=>state.isAuthenticated)
    if(!currentUser && !isAuthenticated)
    {
      return <PublicNavBar/>
    }
    
    if(currentUser?.role==="USER")
    {
     return <UserNavBar/>
    }
    if(currentUser?.role==="ADMIN")
    {
     return <AdminNavBar/>
   } 
 
   return <PublicNavBar/>
}

export default Navbar;