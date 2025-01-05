"use client"

import { FC, useState } from "react"
import Image from "next/image"

import CommentsList from "../CommentsList"
import MayAlsoLikeList from "../MayAlsoLikeList"
import ProductControlBtns from "../ProductControlBtns"

import s from "./ProductPage.module.scss"

import { useQueryComments } from "@/hooks/useQueryComments"
import { useQueryProduct } from "@/hooks/useQueryProducts"

type Props = {
  id: string
}

const ProductPage: FC<Props> = ({ id }) => {
  const { data: product } = useQueryProduct(id)
  const { data: comments } = useQueryComments(id)
  const [isCommentsListOpen, setIsCommentsListOpen] = useState<boolean>(false)

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
            <ProductControlBtns
              productId={id}
              isCommentsListOpen={isCommentsListOpen}
              setIsCommentsListOpen={setIsCommentsListOpen}
            />
          </div>
        </div>
        {comments && isCommentsListOpen && <CommentsList comments={comments} />}
        <MayAlsoLikeList productId={id} />
      </div>
    )
  )
}

export default ProductPage
