"use client"

import AuthUserCart from "../AuthUserCart"
import NotAuthUserCart from "../NotAuthUserCart"

import s from "./CartPage.module.scss"

import { useAuth } from "@/hooks/useAuth"

const CartPage = () => {
  const { isLoggedIn } = useAuth()

  return <div className={s.container}>{isLoggedIn ? <AuthUserCart /> : <NotAuthUserCart />}</div>
}

export default CartPage
