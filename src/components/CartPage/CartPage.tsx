"use client"

import Link from "next/link"

import CartProductsList from "../CartProductsList"

import s from "./CartPage.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"

const CartPage = () => {
  const { isLoggedIn, user } = useAuth()
  const { cart } = useGlobalContext()

  const isEmptyCart = isLoggedIn ? user?.productsInCart.length === 0 : cart.length === 0

  return (
    <div className={s.container}>
      {isEmptyCart ? (
        <div className={s.messageEmptywrapper}>
          <p className={s.messageCartEmpty}>Your Cart is empty</p>
          <Link href={routes.home} className={s.link}>
            To go shopping
          </Link>
        </div>
      ) : (
        <>
          <h3 className={s.title}>Products in your Cart</h3>
          <CartProductsList cart={isLoggedIn ? user?.productsInCart : cart} />
        </>
      )}
    </div>
  )
}

export default CartPage
