"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Modal } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { clearCart } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CartProductsList from "../CartProductsList"

import s from "./CartPage.module.scss"

import { cartApi } from "@/api/cartApi"
import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"
import { MailBody } from "@/types/mailBody"

const CartPage = () => {
  const { isLoggedIn, user } = useAuth()
  const { cart } = useGlobalContext()
  const [totalSum, setTotalSum] = useState<number>(0)
  const [totalSumDB, setTotalSumDB] = useState<number>(0)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const { push } = useRouter()

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

  const handleOrderSubmit = async ({
    name,
    phone,
    email
  }: {
    name: string
    phone: string
    email: string
  }) => {
    const mailBody: MailBody = {
      name,
      phone,
      email,
      products: isLoggedIn ? user?.productsInCart : cart,
      totalSum: isLoggedIn ? totalSumDB : totalSum
    }
    await cartApi.sendOrder(mailBody)
    await dispatch(clearCart())
    push(routes.home)
  }

  const handleOrderClick = () => {
    if (isLoggedIn) {
      if (!user) return
      handleOrderSubmit({
        name: user.name,
        phone: user.phone,
        email: user.email
      })
    } else {
    }
  }

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
          <div className={s.makeOrderWrapper}>
            <p>
              Your order total amount is:{" "}
              <span className={s.totalSum}>{isLoggedIn ? totalSumDB : totalSum}</span> UAH
            </p>
            <Button type="button" variant="contained" onClick={handleOrderClick}>
              Make order
            </Button>
          </div>
        </div>
      )}
      <Modal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <></>
      </Modal>
    </div>
  )
}

export default CartPage
