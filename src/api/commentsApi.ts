import axiosInstance from "./axiosInstance"

import { Comment } from "@/types/comments"

export const commentsApi = {
  getComments: async (productId: string) => {
    try {
      const { data } = await axiosInstance.get<Comment[]>(`comments/${productId}`)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to get comments"
      throw new Error(errorMessage)
    }
  },

  addComment: async ({ productId, values }: { productId: string; values: { text: string } }) => {
    try {
      const { data } = await axiosInstance.post<Comment>(`comments/${productId}`, values)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to add comment"
      throw new Error(errorMessage)
    }
  },

  removeComment: async (commentId: string) => {
    try {
      await axiosInstance.delete(`comments/${commentId}`)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to remove comment"
      throw new Error(errorMessage)
    }
  },

  replyComment: async ({ commentId, values }: { commentId: string; values: { text: string } }) => {
    try {
      const { data } = await axiosInstance.patch<Comment>(`comments/${commentId}`, values)
      return data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to reply a comment"
      throw new Error(errorMessage)
    }
  }

  //   decrement: async (id: string) => {
  //     try {
  //       const { data } = await axiosInstance.post<number>(`cart/decrement/${id}`)
  //       return data
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || "Failed to decrement"
  //       throw new Error(errorMessage)
  //     }
  //   },

  //   increment: async (id: string) => {
  //     try {
  //       const { data } = await axiosInstance.post<number>(`cart/increment/${id}`)
  //       return data
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || "Failed to increment"
  //       throw new Error(errorMessage)
  //     }
  //   },

  //   removeFromCart: async (id: string) => {
  //     try {
  //       const { data } = await axiosInstance.delete<string>(`cart/${id}`)
  //       return data
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || "Failed to delete from cart"
  //       throw new Error(errorMessage)
  //     }
  //   },

  //   clearCart: async () => {
  //     try {
  //       await axiosInstance.post<{ message: string }>("cart/clear")
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || "Failed to clear cart"
  //       throw new Error(errorMessage)
  //     }
  //   },

  //   sendOrder: async (mailBody: MailBody) => {
  //     try {
  //       await axiosInstance.post(`order`, mailBody)
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || "Failed to send order to email"
  //       throw new Error(errorMessage)
  //     }
  //   }
}
