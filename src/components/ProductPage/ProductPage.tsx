"use client"

import { FC } from "react"

import { useQueryProduct } from "@/hooks/useProducts"

type Props = {
  id: string
}

const ProductPage: FC<Props> = ({ id }) => {
  const { data: product } = useQueryProduct(id)

  return <div>{product?.title}</div>
}

export default ProductPage
