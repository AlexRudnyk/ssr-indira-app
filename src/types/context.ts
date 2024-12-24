import { Dispatch, SetStateAction } from "react"

export type ContextType = {
  cart: string[]
  setCart: Dispatch<SetStateAction<string[]>>
}
