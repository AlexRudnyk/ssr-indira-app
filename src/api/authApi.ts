import axiosInstance from "./axiosInstance"

import { storageKeys } from "@/helpers/storageKeys"
import { LoginCreds, LoginRes } from "@/types/auth"

export const authApi = {
  login: async (creds: LoginCreds) => {
    try {
      const { data } = await axiosInstance.post<LoginRes>("auth/login", creds)
      localStorage.setItem(storageKeys.access_token, data.accessToken)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
