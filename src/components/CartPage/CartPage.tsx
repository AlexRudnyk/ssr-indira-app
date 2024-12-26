"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import CartProductsList from "../CartProductsList"

import s from "./CartPage.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"

const CartPage = () => {
  const { isLoggedIn, user } = useAuth()
  const { cart } = useGlobalContext()
  const [totalSum, setTotalSum] = useState<number>(0)
  const [totalSumDB, setTotalSumDB] = useState<number>(0)

  const calculateTotal = (products: { price: number; quantity: number }[] | undefined): number => {
    return products?.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0
  }

  useEffect(() => {
    setTotalSum(calculateTotal(cart))
  }, [cart])

  useEffect(() => {
    setTotalSumDB(calculateTotal(user?.productsInCart))
  }, [user?.productsInCart])
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
        <div className={s.cartProductListWrapper}>
          <h3 className={s.title}>Products in your Cart</h3>
          <CartProductsList cart={isLoggedIn ? user?.productsInCart : cart} />
          <p>
            Your order total amount is:{" "}
            <span className={s.totalSum}>{isLoggedIn ? totalSumDB : totalSum}</span> UAH
          </p>
        </div>
      )}
    </div>
  )
}

export default CartPage
