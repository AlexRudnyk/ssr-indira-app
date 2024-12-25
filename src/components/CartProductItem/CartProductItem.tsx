"use client"

import { FC } from "react"
import { IconButton } from "@mui/material"
import Image from "next/image"

import trashBinIcon from "../../../public/icons/trash.svg"

import s from "./CartProductItem.module.scss"

import { useGlobalContext } from "@/context/store"
import { storageKeys } from "@/helpers/storageKeys"
import { CartItem } from "@/types/products"

type Props = {
  product: CartItem
}

const customStyle = {
  width: 48,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const CartProductItem: FC<Props> = ({ product }) => {
  const { title, text, price, photoURL, quantity } = product
  const { cart, setCart } = useGlobalContext()

  const handleDecreaseClick = () => {
    const stringCart = sessionStorage.getItem(storageKeys.cart)
    if (!stringCart) return
    const cartFromStorage = JSON.parse(stringCart)
    const index = cart.findIndex(item => item._id === product._id)
    const storageIndex = cartFromStorage.findIndex((item: CartItem) => item._id === product._id)
    if (index === -1 || storageIndex === -1) return

    const decreasedQuantityProduct = {
      ...product,
      quantity: product.quantity - 1
    }
    const updatedCart = [...cart]
    const updatedStorageCart = [...cartFromStorage]
    updatedCart[index] = decreasedQuantityProduct
    updatedStorageCart[storageIndex] = decreasedQuantityProduct

    setCart(updatedCart)
    sessionStorage.setItem(storageKeys.cart, JSON.stringify(updatedStorageCart))
  }

  const handleIncreaseClick = () => {
    const stringCart = sessionStorage.getItem(storageKeys.cart)
    if (!stringCart) return
    const cartFromStorage = JSON.parse(stringCart)
    const index = cart.findIndex(item => item._id === product._id)
    const storageIndex = cartFromStorage.findIndex((item: CartItem) => item._id === product._id)
    if (index === -1 || storageIndex === -1) return

    const increasedQuantityProduct = {
      ...product,
      quantity: product.quantity + 1
    }
    const updatedCart = [...cart]
    const updatedStorageCart = [...cartFromStorage]
    updatedCart[index] = increasedQuantityProduct
    updatedStorageCart[storageIndex] = increasedQuantityProduct

    setCart(updatedCart)
    sessionStorage.setItem(storageKeys.cart, JSON.stringify(updatedStorageCart))
  }

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
            sx={customStyle}
            onClick={handleDecreaseClick}
            disabled={product.quantity <= 1}
          >
            -
          </IconButton>
          <p className={s.quantity}>{quantity}</p>
          <IconButton sx={customStyle} onClick={handleIncreaseClick}>
            +
          </IconButton>
        </div>
        <IconButton sx={customStyle}>
          <Image src={trashBinIcon} alt="trash bin icon" width={32} height={32} />
        </IconButton>
      </div>
    </li>
  )
}

export default CartProductItem
