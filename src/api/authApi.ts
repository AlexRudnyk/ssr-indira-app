import axiosInstance from "./axiosInstance"

import { storageKeys } from "@/helpers/storageKeys"
import { LoginCreds, LoginRes, RegisterCreds, User } from "@/types/auth"

export const authApi = {
  register: async (creds: RegisterCreds) => {
    try {
      const { data } = await axiosInstance.post<User>("auth/register", creds)
      return data
    } catch (error) {
      throw error
    }
  },

  login: async (creds: LoginCreds) => {
    try {
      const { data } = await axiosInstance.post<LoginRes>("auth/login", creds)
      localStorage.setItem(storageKeys.access_token, data.accessToken)
      return data
    } catch (error) {
      throw error
    }
  },

  getCurrentUser: async () => {
    try {
      const { data } = await axiosInstance.get<User>("auth/getCurrent")
      return data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      axiosInstance.get("auth/logout")
    } catch (error) {
      throw error
    }
  }
}
