export type User = {
  _id: string
  name: string
  phone: string
  email: string
  role: "ADMIN" | "USER"
}

export type LoginRes = {
  accessToken: string
  user: User
}

export type LoginCreds = {
  email: string
  password: string
}
