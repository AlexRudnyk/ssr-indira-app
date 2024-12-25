import { FC } from "react"
import { IconButton } from "@mui/material"
import Image from "next/image"

import trashBinIcon from "../../../public/icons/trash.svg"

import s from "./CartProductItem.module.scss"

import { CartItem } from "@/types/products"

type Props = {
  product: CartItem
}

const CartProductItem: FC<Props> = ({ product }) => {
  const { title, text, price, photoURL, quantity } = product

  return (
    <li className={s.cartItemWrapper}>
      <Image src={photoURL} alt="product image" width={90} height={90} className={s.image} />
      <div className={s.textWrapper}>
        <p className={s.title}>{title}</p>
        <p>{text}</p>
      </div>
      <div className={s.priceAndQuantityWrapper}>
        <p>Price: {price} UAH</p>
        <div className={s.quantityControlsWrapper}>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            -
          </IconButton>
          <p>{quantity}</p>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            +
          </IconButton>
        </div>
        <IconButton
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image src={trashBinIcon} alt="trash bin icon" width={32} height={32} />
        </IconButton>
      </div>
    </li>
  )
}

export default CartProductItem
