import axiosInstance from "./axiosInstance"

import { AddProductInitValues, EditProductInitValues } from "@/types/initFormValuesTypes"
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
      throw new Error(errorMessage)
    }
  },

  addProduct: async (values: AddProductInitValues): Promise<Product | undefined> => {
    try {
      const { data } = await axiosInstance.post("products", values)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to add a product"
      throw new Error(errorMessage)
    }
  },

  editProduct: async (id: string, values: EditProductInitValues): Promise<Product | undefined> => {
    try {
      const { data } = await axiosInstance.patch(`products/${id}`, values)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update a product"
      throw new Error(errorMessage)
    }
  }
}
