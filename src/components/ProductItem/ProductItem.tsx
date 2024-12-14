import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import { Product } from "@/types/products"

type Props = {
  product: Product
}

const ProductItem: FC<Props> = ({ product }) => {
  const { _id, title, text, descripition, photoURL, price } = product

  return (
    <li>
      <Link href={`/products/${_id}`}>
        <p>{product.title}</p>
        <Image src={product.photoURL} alt="product" width={300} height={300} />
      </Link>
    </li>
  )
}

export default ProductItem
