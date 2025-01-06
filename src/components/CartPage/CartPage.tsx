"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Modal } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { clearCart } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CartProductsList from "../CartProductsList"
import CustomMUIButton from "../CustomMUIButton"
import OrderModal from "../OrderModal"

import s from "./CartPage.module.scss"

import { cartApi } from "@/api/cartApi"
import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { storageKeys } from "@/helpers/storageKeys"
import { useAuth } from "@/hooks/useAuth"
import { MailBody } from "@/types/mailBody"

const CartPage = () => {
  const { isLoggedIn, user } = useAuth()
  const { cart, setCart } = useGlobalContext()
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
  }: Pick<MailBody, "name" | "phone" | "email">) => {
    const mailBody: MailBody = {
      name,
      phone,
      email,
      products: isLoggedIn ? user?.productsInCart : cart,
      totalSum: isLoggedIn ? totalSumDB : totalSum
    }
    await cartApi.sendOrder(mailBody)
    if (isLoggedIn) {
      push(routes.home)
      dispatch(clearCart())
    } else {
      push(routes.home)
      setIsOrderModalOpen(false)
      setCart([])
      sessionStorage.removeItem(storageKeys.cart)
    }
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
      setIsOrderModalOpen(true)
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
            <CustomMUIButton
              title="Make order"
              type="button"
              variant="contained"
              handleClick={handleOrderClick}
            />
          </div>
        </div>
      )}
      <Modal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <OrderModal
          onOrderSubmit={handleOrderSubmit}
          setIsOrderModalOpen={() => setIsOrderModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default CartPage
