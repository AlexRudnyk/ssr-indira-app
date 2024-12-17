import axiosInstance from "./axiosInstance"

import { storageKeys } from "@/helpers/storageKeys"
import { LoginCreds, LoginRes, RegisterCreds, User } from "@/types/auth"

export const authApi = {
  register: async (creds: RegisterCreds) => {
    try {
      const { data } = await axiosInstance.post<User>("auth/register", creds)
      return data
    } catch (error) {
      console.log("REGISTER_ERROR")
      throw error
    }
  },

  login: async (creds: LoginCreds) => {
    try {
      const { data } = await axiosInstance.post<LoginRes>("auth/login", creds)
      localStorage.setItem(storageKeys.access_token, data.accessToken)
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
