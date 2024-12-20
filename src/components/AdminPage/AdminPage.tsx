import AddProductForm from "../AddProductForm"
import AdminProductsList from "../AdminProductsList"

import s from "./AdminPage.module.scss"
const AdminPage = () => {
  return (
    <div className={s.container}>
      <div className={s.flexWrapper}>
        <AddProductForm />
        <AdminProductsList />
      </div>
    </div>
  )
}

export default AdminPage
