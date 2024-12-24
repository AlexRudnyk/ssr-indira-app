"use client"

import { FC } from "react"

import CartProductItem from "../CartProductItem"

import s from "./CartProductsList.module.scss"

// import { useQueryProducts } from "@/hooks/useQueryProducts"
import { CartItem } from "@/types/products"

type Props = {
  cart: CartItem[] | undefined
}

const CartProductsList: FC<Props> = ({ cart }) => {
  // const { data: products } = useQueryProducts()

  // const productsInCart = cart.reduce<Product[]>((acc, productId) => {
  //   const foundProduct = products?.find(product => product._id === productId)
  //   if (foundProduct) acc.push(foundProduct)
  //   return acc
  // }, [])

  return (
    cart && (
      <ul>
        {cart.map(item => (
          <CartProductItem key={item._id} product={item} />
        ))}
      </ul>
    )
  )
}

export default CartProductsList
