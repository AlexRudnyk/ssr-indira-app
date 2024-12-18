import axios from "axios"

import { storageKeys } from "@/helpers/storageKeys"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN
})

axiosInstance.interceptors.request.use(request => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(storageKeys.access_token)
    if (token) {
      request.headers.Authorization = token ? `Bearer ${token}` : undefined
    }
  }
  return request
})
export default axiosInstance
