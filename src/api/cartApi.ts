import axiosInstance from "./axiosInstance"

import { MailBody } from "@/types/mailBody"
import { CartItem } from "@/types/products"

export const cartApi = {
  addToCart: async (newCartItem: CartItem) => {
    try {
      const { data } = await axiosInstance.post<CartItem>("cart", newCartItem)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to add product to cart"
      throw new Error(errorMessage)
    }
  },

  decrement: async (id: string) => {
    try {
      const { data } = await axiosInstance.post<number>(`cart/decrement/${id}`)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to decrement"
      throw new Error(errorMessage)
    }
  },

  increment: async (id: string) => {
    try {
      const { data } = await axiosInstance.post<number>(`cart/increment/${id}`)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to increment"
      throw new Error(errorMessage)
    }
  },

  removeFromCart: async (id: string) => {
    try {
      const { data } = await axiosInstance.delete<string>(`cart/${id}`)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete from cart"
      throw new Error(errorMessage)
    }
  },

  clearCart: async () => {
    try {
      await axiosInstance.post<{ message: string }>("cart/clear")
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to clear cart"
      throw new Error(errorMessage)
    }
  },

  sendOrder: async (mailBody: MailBody) => {
    try {
      await axiosInstance.post(`order`, mailBody)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send order to email"
      throw new Error(errorMessage)
    }
  }
}
