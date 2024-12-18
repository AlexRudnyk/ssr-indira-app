import axiosInstance from "./axiosInstance"

import { Product } from "@/types/products"

export const productsApi = {
  getProducts: async (): Promise<Product[] | undefined> => {
    try {
      const { data } = await axiosInstance.get("products")
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch products"
      console.error("API Error:", errorMessage)
      throw new Error(errorMessage)
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const { data } = await axiosInstance.get(`products/${id}`)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch products"
      console.error("API Error:", errorMessage)
      throw new Error(errorMessage)
    }
  }
}
