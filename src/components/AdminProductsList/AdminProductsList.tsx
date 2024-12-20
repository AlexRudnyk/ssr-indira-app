"use client"

import AdminProductItem from "../AdminProductItem"

import s from "./AdminProductsList.module.scss"

import { useQueryProducts } from "@/hooks/useQueryProducts"
import { Product } from "@/types/products"

const AdminProductsList = () => {
  const { data: products } = useQueryProducts()

  return (
    <ul className={s.productList}>
      {products?.map((product: Product) => (
        <AdminProductItem key={product._id} product={product}></AdminProductItem>
      ))}
    </ul>
  )
}

export default AdminProductsList
