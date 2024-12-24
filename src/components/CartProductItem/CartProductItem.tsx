import { FC } from "react"

import s from "./CartProductItem.module.scss"

import { CartItem } from "@/types/products"

type Props = {
  product: CartItem
}

const CartProductItem: FC<Props> = ({ product }) => {
  return (
    <li>
      <p>{product.title}</p>
      <p>{product.quantity}</p>
    </li>
  )
}

export default CartProductItem
