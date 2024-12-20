export type RegisterInitValues = {
  name: string
  phone: string
  email: string
  password: string
}

export type LoginInitValues = {
  email: string
  password: string
}

export type AddProductInitValues = {
  title: string
  text: string
  description: string
  photoURL: string
  price: number
}

export type EditProductInitValues = Omit<AddProductInitValues, "photoURL">
