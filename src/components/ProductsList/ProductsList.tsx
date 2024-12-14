"use client"

import { CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import ProductItem from "../ProductItem"

import s from "./ProductsList.module.scss"

import { productsApi } from "@/api/productsApi"
import { Product } from "@/types/products"

const ProductsList = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getProducts()
  })

  return (
    <div className={s.container}>
      {isPending ? (
        <CircularProgress />
      ) : (
        products && (
          <ul>
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
