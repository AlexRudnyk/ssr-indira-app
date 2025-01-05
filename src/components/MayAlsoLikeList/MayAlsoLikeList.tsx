"use client"

import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import s from "./MayAlsoLikeList.module.scss"

import { useQueryProducts } from "@/hooks/useQueryProducts"

type Props = {
  productId: string
}

const MayAlsoLikeList: FC<Props> = ({ productId }) => {
  const { data: products } = useQueryProducts()
  if (!products) return

  const listWithoutCurrentProduct = products.filter(product => product._id !== productId)

  return (
    <>
      <h3>You may also like</h3>
      <div className={s.animationWrapper}>
        <ul className={s.list}>
          {listWithoutCurrentProduct.map(({ _id, photoURL }) => (
            <li key={_id}>
              <Link href={`/products/${_id}`}>
                <Image src={photoURL} alt="product image" width={150} height={150} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MayAlsoLikeList
