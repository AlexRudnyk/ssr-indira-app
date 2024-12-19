import AddProductForm from "../AddProductForm"

import s from "./AdminPage.module.scss"
const AdminPage = () => {
  return (
    <div className={s.container}>
      <div className={s.flexWrapper}>
        <AddProductForm />
        <div>List</div>
      </div>
    </div>
  )
}

export default AdminPage
