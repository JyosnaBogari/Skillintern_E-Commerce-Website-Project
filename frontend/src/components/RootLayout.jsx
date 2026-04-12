import { Outlet } from "react-router"
import Footer from '../components/Footer'
import { pageBackground } from "../styles/common"
import NavBar from "./NavBar"
import { useEffect } from "react"
import { useAuth } from "../store/authStore"

function RootLayout() {
  const checkAuth = useAuth(state => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className={pageBackground}>
      <NavBar/>
      <div className="min-h-screen">
        {/* placeholder  */}
        <Outlet /> 
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout




