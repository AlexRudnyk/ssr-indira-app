"use client"

import { FC } from "react"

import CartProductItem from "../CartProductItem"

import s from "./CartProductsList.module.scss"

import { CartItem } from "@/types/products"

type Props = {
  cart: CartItem[] | undefined
}

const CartProductsList: FC<Props> = ({ cart }) => {
  return (
    cart && (
      <ul className={s.cartItemsList}>
        {cart.map(item => (
          <CartProductItem key={item._id} product={item} />
        ))}
      </ul>
    )
  )
}

export default CartProductsList
