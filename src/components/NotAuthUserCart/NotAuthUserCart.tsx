"use client"

import Link from "next/link"

import CartProductsList from "../CartProductsList"

import s from "./NotAuthUserCart.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"

const NotAuthUserCart = () => {
  const { cart } = useGlobalContext()

  return cart.length === 0 ? (
    <div className={s.messageEmptywrapper}>
      <p className={s.messageCartEmpty}>Your Cart is empty</p>
      <Link href={routes.home} className={s.link}>
        To go shopping
      </Link>
    </div>
  ) : (
    <>
      <h3>Products in your Cart</h3>
      <CartProductsList cart={cart} />
    </>
  )
}

export default NotAuthUserCart
