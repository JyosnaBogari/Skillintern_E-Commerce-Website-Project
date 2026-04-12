import { Outlet } from "react-router"
import { pageBackground, pageWrapper } from "../styles/common"

function UserProfile() {
  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <Outlet />
      </div>
    </div>
  )
}

export default UserProfile