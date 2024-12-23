import { FC } from "react"

import s from "./CartProductItem.module.scss"

import { Product } from "@/types/products"

type Props = {
  product: Product
}

const CartProductItem: FC<Props> = ({ product }) => {
  return <li>{product.title}</li>
}

export default CartProductItem
