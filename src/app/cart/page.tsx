import { Metadata } from "next"

import CartPage from "@/components/CartPage"

export const metadata: Metadata = {
  title: "Cart Page",
  description: "Cart Page of Indira Shop"
}

export default function Cart() {
  return <CartPage />
}
