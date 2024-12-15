"use client"

import { CircularProgress } from "@mui/material"

import ProductItem from "../ProductItem"

import s from "./ProductsList.module.scss"

import { useQueryProducts } from "@/hooks/useProducts"
import { Product } from "@/types/products"

const ProductsList = () => {
  const { data: products, isPending } = useQueryProducts()

  return (
    <div className={s.container}>
      {isPending ? (
        <CircularProgress />
      ) : (
        products && (
          <ul className={s.productList}>
            {products.map((product: Product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </ul>
        )
      )}
    </div>
  )
}

export default ProductsList
