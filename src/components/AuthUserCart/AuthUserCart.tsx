"use client"

import Link from "next/link"

import CartProductsList from "../CartProductsList"

import s from "./AuthUserCart.module.scss"

import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"

const AuthUserCart = () => {
  const { user } = useAuth()

  return user?.productsInCart.length === 0 ? (
    <div className={s.messageEmptywrapper}>
      <p className={s.messageCartEmpty}>Your Cart is empty</p>
      <Link href={routes.home} className={s.link}>
        To go shopping
      </Link>
    </div>
  ) : (
    <>
      <h3>Products in your Cart</h3>
      <CartProductsList cart={user?.productsInCart} />
    </>
  )
}

export default AuthUserCart
