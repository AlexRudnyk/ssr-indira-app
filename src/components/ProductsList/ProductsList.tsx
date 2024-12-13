"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import { useGlobalContext } from "@/context/store"
import { getProducts } from "@/utils/getProducts"

const ProductsList = () => {
  const { isLoggedIn } = useGlobalContext()
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts()
  })

  console.log("IS_LOGGED_IN", isLoggedIn)

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {products.map((product: { _id: string; title: string; photoURL: string }) => (
        <li key={product._id}>
          <p>{product.title}</p>
          <Image src={product.photoURL} alt="product" width={300} height={300} />
        </li>
      ))}
    </ul>
  )
}

export default ProductsList
