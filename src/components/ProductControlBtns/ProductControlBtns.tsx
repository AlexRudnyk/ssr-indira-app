"use client"

import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal } from "@mui/material"
import Link from "next/link"

import { addToCart } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CommentsForm from "../CommentsForm"

import s from "./ProductControlBtns.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { storageKeys } from "@/helpers/storageKeys"
import { useAuth } from "@/hooks/useAuth"
import { useQueryComments } from "@/hooks/useQueryComments"
import { useQueryProduct } from "@/hooks/useQueryProducts"

type Props = {
  productId: string
  isCommentsListOpen: boolean
  setIsCommentsListOpen: (arg: boolean) => void
}

const ProductControlBtns: FC<Props> = ({
  productId,
  isCommentsListOpen,
  setIsCommentsListOpen
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false)
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState<boolean>(false)
  const { cart, setCart } = useGlobalContext()
  const { isLoggedIn, user } = useAuth()
  const { data: product } = useQueryProduct(productId)
  const { data: comments } = useQueryComments(productId)
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCartClick = () => {
    if (!product) return

    const isInCart = isLoggedIn
      ? user?.productsInCart.some(item => item._id === productId)
      : cart.some(item => item._id === productId)

    if (isInCart) return

    const cartItem = {
      _id: productId,
      title: product.title,
      text: product.text,
      photoURL: product.photoURL,
      price: product.price,
      quantity: 1
    }

    if (isLoggedIn) {
      dispatch(addToCart(cartItem))
    } else {
      const updatedCart = [...cart, cartItem]
      sessionStorage.setItem(storageKeys.cart, JSON.stringify(updatedCart))
      setCart(updatedCart)
    }
  }

  useEffect(() => {
    const cartItems = isLoggedIn ? user?.productsInCart : cart
    const isInCart = cartItems?.some(item => item._id === productId)
    setIsAddedToCart(Boolean(isInCart))
  }, [cart, productId, isLoggedIn, user?.productsInCart])

  const handleAddCommentClick = () => {
    if (!isLoggedIn) {
      toast.warn("Please login to leave a comment")
    } else {
      setIsAddCommentModalOpen(true)
    }
  }

  return (
    <div className={s.btnsContainer}>
      <div className={s.btnWrapper}>
        {user?.role !== "ADMIN" && (
          <Button
            type="button"
            variant="contained"
            onClick={handleAddToCartClick}
            disabled={isAddedToCart}
          >
            Add to Cart
          </Button>
        )}
        <Link href={routes.home}>
          <Button type="button" variant="contained">
            Back to Home
          </Button>
        </Link>
      </div>
      <div className={s.btnWrapper}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsCommentsListOpen(!isCommentsListOpen)}
          disabled={comments?.length === 0}
        >
          Comments ({comments?.length})
        </Button>
        {user?.role !== "ADMIN" && (
          <Button type="button" variant="outlined" onClick={handleAddCommentClick}>
            Add Comment
          </Button>
        )}
        <Modal open={isAddCommentModalOpen} onClose={() => setIsAddCommentModalOpen(false)}>
          <CommentsForm productId={productId} onClose={() => setIsAddCommentModalOpen(false)} />
        </Modal>
      </div>
    </div>
  )
}

export default ProductControlBtns
