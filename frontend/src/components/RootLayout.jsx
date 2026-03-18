import { Outlet } from "react-router"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { pageBackground } from "../styles/common"

function RootLayout() {
  return (
    <div className={pageBackground}>
      <Header />
      <div className="mx-20 min-h-screen">
        {/* placeholder  */}
        <Outlet /> 
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout




