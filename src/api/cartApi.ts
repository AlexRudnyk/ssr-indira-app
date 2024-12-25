import axiosInstance from "./axiosInstance"

import { storageKeys } from "@/helpers/storageKeys"
import { CartItem } from "@/types/products"

export const cartApi = {
  addToCart: async (newCartItem: CartItem) => {
    try {
      const { data } = await axiosInstance.post<CartItem>(storageKeys.cart, newCartItem)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to add product to cart"
      throw new Error(errorMessage)
    }
  }
}
