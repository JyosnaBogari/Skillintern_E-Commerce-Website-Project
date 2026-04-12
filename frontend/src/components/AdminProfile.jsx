import { Outlet } from "react-router"
import { adminPageWrapper } from "../styles/common"

function AdminProfile() {
  return (
    <div className={adminPageWrapper}>
      <Outlet />
    </div>
  )
}

export default AdminProfile