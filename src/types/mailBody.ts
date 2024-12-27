import { CartItem } from "./products"

export type MailBody = {
  name: string
  phone: string
  email: string
  products: CartItem[] | undefined
  totalSum: number
}
