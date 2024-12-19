import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import s from "./ProductItem.module.scss"

import { Product } from "@/types/products"

type Props = {
  product: Product
}

const ProductItem: FC<Props> = ({ product }) => {
  const { _id, title, text, photoURL, price } = product

  return (
    <li className={s.productCardWrapper}>
      <Link href={`/products/${_id}`} className={s.productItemLink}>
        <div>
          <Image src={photoURL} alt="product" width={400} height={400} className={s.productImage} />
          <div className={s.productTextWrapper}>
            <p>{title}</p>
            <p>{text}</p>
          </div>
        </div>
        <p className={s.productPrice}>{price} UAH</p>
      </Link>
    </li>
  )
}

export default ProductItem
