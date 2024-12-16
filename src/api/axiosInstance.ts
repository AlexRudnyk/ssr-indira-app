import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { storageKeys } from "@/helpers/storageKeys"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN
})

axiosInstance.interceptors.request.use(request => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem(storageKeys.access_token)

    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      const expiryDate = decoded.exp && decoded.exp * 1000
      const isExpired = expiryDate && Date.now() > expiryDate

      if (isExpired) {
        axiosInstance.defaults.headers.common.Authorization = undefined
        localStorage.removeItem(storageKeys.access_token)
        window.location.reload()
      }
    }

    request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : undefined
  }
  return request
})
export default axiosInstance
