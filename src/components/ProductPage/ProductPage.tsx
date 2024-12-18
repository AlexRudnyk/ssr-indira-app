"use client"

import { FC } from "react"
import Image from "next/image"

import s from "./ProductPage.module.scss"

import { useQueryProduct } from "@/hooks/useQueryProducts"

type Props = {
  id: string
}

const ProductPage: FC<Props> = ({ id }) => {
  const { data: product } = useQueryProduct(id)

  return (
    product && (
      <div className={s.container}>
        <div className={s.productItemInfoWrapper}>
          <Image
            src={product?.photoURL}
            alt="chosen product image"
            width={400}
            height={400}
            className={s.productImage}
          />
          <div className={s.descriptionWrapper}>
            <h3>{product.title}</h3>
            <p>{product.text}</p>
            <p>{product.description}</p>
            <p>Price: {product.price} UAH</p>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductPage
