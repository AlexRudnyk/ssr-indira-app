import { CartItem } from "./products"

export type User = {
  _id: string
  name: string
  phone: string
  email: string
  role: "ADMIN" | "USER"
  productsInCart: CartItem[]
}

export type RegisterCreds = {
  name: string
  phone: string
  email: string
  password: string
}

export type LoginCreds = {
  email: string
  password: string
}

export type LoginRes = {
  accessToken: string
  user: User
}

export type AuthSliceState = {
  isLoggedIn: boolean
  isLoading: boolean
  user: User | null
  errorMessage: string | null
}
