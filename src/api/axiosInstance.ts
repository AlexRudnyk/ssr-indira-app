import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { clearState } from "@/redux/auth/authSlice"
import { store } from "@/redux/store"

import { storageKeys } from "@/helpers/storageKeys"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN
})

axiosInstance.interceptors.request.use(request => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(storageKeys.access_token)
    if (token) {
      const decoded = jwtDecode(token)
      const expiryDate = decoded.exp && decoded.exp * 1000
      const isExpired = expiryDate && Date.now() > expiryDate

      if (isExpired) {
        axiosInstance.defaults.headers.common.Authorization = undefined
        localStorage.removeItem(storageKeys.access_token)
        store.dispatch(clearState())
      }
      request.headers.Authorization = token ? `Bearer ${token}` : undefined
    }
  }
  return request
})
export default axiosInstance
