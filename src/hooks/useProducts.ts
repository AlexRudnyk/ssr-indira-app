import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"

export const useProducts = () => {
  const { products, product, isLoading, errorMessage } = useSelector(
    (state: RootState) => state.products
  )

  return {
    products,
    product,
    isLoading,
    errorMessage
  }
}
