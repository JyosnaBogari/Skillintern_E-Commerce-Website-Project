import { adminPageWrapper, adminHeader, bodyText } from "../styles/common"

function AdminProfile() {

  return (

    <div className={adminPageWrapper}>

      <h1 className={adminHeader}>
        Admin Dashboard
      </h1>

      <p className={bodyText}>
        Welcome Admin. Manage your store from here.
      </p>

    </div>

  )

}

export default AdminProfile