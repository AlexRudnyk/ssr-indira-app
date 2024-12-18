"use client"

import ProductItem from "../ProductItem"

import s from "./ProductsList.module.scss"

import { useQueryProducts } from "@/hooks/useQueryProducts"
import { Product } from "@/types/products"

const ProductsList = () => {
  const { data: products } = useQueryProducts()

  return (
    <div className={s.container}>
      {products && (
        <ul className={s.productList}>
          {products.map((product: Product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductsList
