import axios from "axios"

import { storageKeys } from "@/helpers/storageKeys"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN
})

axiosInstance.interceptors.request.use(request => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem(storageKeys.access_token)
    request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : undefined
  }
  return request
})
export default axiosInstance
