import { EditProductInitValues } from "./initFormValuesTypes"

export type Product = {
  _id: string
  title: string
  text: string
  description: string
  photoURL: string
  price: number
  comments: string[]
}

export type ProductsSliceState = {
  products: Product[]
  product: Product | null
  isLoading: boolean
  errorMessage: string | null
}

export type EditProductBody = {
  id: string
  values: EditProductInitValues
}
