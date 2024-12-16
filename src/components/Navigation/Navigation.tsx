"use client"

import Link from "next/link"

import s from "./Navigation.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"

const Navigation = () => {
  const { isLoggedIn } = useGlobalContext()

  return (
    <div className={s.navWrapper}>
      {!isLoggedIn && (
        <Link href={routes.login} className={s.cartLink}>
          SignIn
        </Link>
      )}
      <Link href={routes.cart} className={s.cartLink}>
        Cart
      </Link>
    </div>
  )
}

export default Navigation
