"use client"

import { FC, useEffect, useState } from "react"
import { Button } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

import s from "./ProductPage.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { useQueryProduct } from "@/hooks/useQueryProducts"

type Props = {
  id: string
}

const ProductPage: FC<Props> = ({ id }) => {
  const { data: product } = useQueryProduct(id)
  const { cart, setCart } = useGlobalContext()
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false)

  const handleAddtoCartClick = () => {
    const isInCart = cart.includes(id)
    if (isInCart) {
      return
    } else {
      sessionStorage.setItem("cart", JSON.stringify([...cart, id]))
      setCart([...cart, id])
    }
  }

  useEffect(() => {
    const isInCart = cart.includes(id)
    if (isInCart) setIsAddedToCart(true)
  }, [cart, id])

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
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleAddtoCartClick}
                  disabled={isAddedToCart}
                >
                  Add to Cart
                </Button>
                <Link href={routes.home}>
                  <Button type="button" variant="contained">
                    Back to Home
                  </Button>
                </Link>
              </div>
              <div className={s.btnWrapper}>
                <Button type="button" variant="outlined">
                  Comments
                </Button>
                <Button type="button" variant="outlined">
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductPage
