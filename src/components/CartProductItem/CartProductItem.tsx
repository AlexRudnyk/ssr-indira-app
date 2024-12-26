"use client"

import { FC } from "react"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import Image from "next/image"

import { decrement, increment, removeFromCart } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import trashBinIcon from "../../../public/icons/trash.svg"

import s from "./CartProductItem.module.scss"

import { useGlobalContext } from "@/context/store"
import { storageKeys } from "@/helpers/storageKeys"
import { useAuth } from "@/hooks/useAuth"
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
  const { _id, title, text, price, photoURL, quantity } = product
  const { cart, setCart } = useGlobalContext()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn } = useAuth()

  const handleProductQuantity = (action: "increase" | "decrease") => {
    const updateQuantity = (quantity: number) =>
      action === "increase" ? quantity + 1 : quantity - 1

    if (isLoggedIn) {
      const actionDispatcher = action === "increase" ? increment : decrement
      dispatch(actionDispatcher(_id))
    } else {
      const stringCart = sessionStorage.getItem(storageKeys.cart)
      if (!stringCart) return

      const cartFromStorage = JSON.parse(stringCart)
      const index = cart.findIndex(item => item._id === product._id)
      const storageIndex = cartFromStorage.findIndex((item: CartItem) => item._id === product._id)

      if (index === -1 || storageIndex === -1) return

      const updatedProduct = {
        ...product,
        quantity: updateQuantity(product.quantity)
      }

      const updatedCart = [...cart]
      const updatedStorageCart = [...cartFromStorage]

      updatedCart[index] = updatedProduct
      updatedStorageCart[storageIndex] = updatedProduct

      setCart(updatedCart)
      sessionStorage.setItem(storageKeys.cart, JSON.stringify(updatedStorageCart))
    }
  }

  const handleDeleteClick = () => {
    const removeFromCartHandler = (cartArray: CartItem[]) =>
      cartArray.filter(product => product._id !== _id)

    if (isLoggedIn) {
      dispatch(removeFromCart(_id))
    } else {
      const stringCart = sessionStorage.getItem(storageKeys.cart)
      if (!stringCart) return

      const cartFromStorage = JSON.parse(stringCart)
      const updatedCart = removeFromCartHandler(cart)
      const updatedStorageCart = removeFromCartHandler(cartFromStorage)

      setCart(updatedCart)
      sessionStorage.setItem(storageKeys.cart, JSON.stringify(updatedStorageCart))
    }
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
            onClick={() => handleProductQuantity("decrease")}
            disabled={product.quantity <= 1}
          >
            -
          </IconButton>
          <p className={s.quantity}>{quantity}</p>
          <IconButton sx={customStyle} onClick={() => handleProductQuantity("increase")}>
            +
          </IconButton>
        </div>
        <IconButton sx={customStyle} onClick={handleDeleteClick}>
          <Image src={trashBinIcon} alt="trash bin icon" width={32} height={32} />
        </IconButton>
      </div>
    </li>
  )
}

export default CartProductItem
