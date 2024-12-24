import { Dispatch, SetStateAction } from "react"

import { CartItem } from "./products"

export type ContextType = {
  cart: CartItem[]
  setCart: Dispatch<SetStateAction<CartItem[]>>
}
