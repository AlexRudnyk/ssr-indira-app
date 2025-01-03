"use client"

import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

import { addToCart } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import CommentsForm from "../CommentsForm"
import CommentsList from "../CommentsList"

import s from "./ProductPage.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { storageKeys } from "@/helpers/storageKeys"
import { useAuth } from "@/hooks/useAuth"
import { useQueryComments } from "@/hooks/useQueryComments"
import { useQueryProduct } from "@/hooks/useQueryProducts"

type Props = {
  id: string
}

const ProductPage: FC<Props> = ({ id }) => {
  const { data: product } = useQueryProduct(id)
  const { data: comments } = useQueryComments(id)
  const { cart, setCart } = useGlobalContext()
  const { isLoggedIn, user } = useAuth()
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false)
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState<boolean>(false)
  const [isCommentsListOpen, setIsCommentsListOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCartClick = () => {
    if (!product) return

    const isInCart = isLoggedIn
      ? user?.productsInCart.some(item => item._id === id)
      : cart.some(item => item._id === id)

    if (isInCart) return

    const cartItem = {
      _id: id,
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
    const isInCart = cartItems?.some(item => item._id === id)
    setIsAddedToCart(Boolean(isInCart))
  }, [cart, id, isLoggedIn, user?.productsInCart])

  const handleAddCommentClick = () => {
    if (!isLoggedIn) {
      toast.warn("Please login to leave a comment")
    } else {
      setIsAddCommentModalOpen(true)
    }
  }

  return (
    product && (
      <div className={s.container}>
        <div className={s.productItemInfoWrapper}>
          <Image
            src={product?.photoURL}
            alt="chosen product image"
            width={400}
            height={400}
            className={s.productImage}
          />
          <div className={s.descAndBtnsWrapper}>
            <div className={s.descriptionWrapper}>
              <h3>{product.title}</h3>
              <p>{product.text}</p>
              <p>{product.description}</p>
              <p>Price: {product.price} UAH</p>
            </div>
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
                  <CommentsForm productId={id} onClose={() => setIsAddCommentModalOpen(false)} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {comments && isCommentsListOpen && <CommentsList comments={comments} />}
      </div>
    )
  )
}

export default ProductPage
