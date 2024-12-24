"use client"

import { FC } from "react"

import CartProductItem from "../CartProductItem"

import s from "./CartProductsList.module.scss"

import { useQueryProducts } from "@/hooks/useQueryProducts"
import { Product } from "@/types/products"

type Props = {
  cart: string[]
}

const CartProductsList: FC<Props> = ({ cart }) => {
  const { data: products } = useQueryProducts()

  const productsInCart = cart.reduce<Product[]>((acc, productId) => {
    const foundProduct = products?.find(product => product._id === productId)
    if (foundProduct) acc.push(foundProduct)
    return acc
  }, [])

  return (
    <ul>
      {productsInCart.map(item => (
        <CartProductItem key={item._id} product={item} />
      ))}
    </ul>
  )
}

export default CartProductsList
