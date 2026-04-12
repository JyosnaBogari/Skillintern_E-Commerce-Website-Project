import { Outlet } from "react-router"
import Footer from '../components/Footer'
import { pageBackground } from "../styles/common"
import NavBar from "./NavBar"

function RootLayout() {
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




