import { Middleware } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

import { clearState } from "../auth/authSlice"
import { RootState } from "../store"

import axiosInstance from "@/api/axiosInstance"
import { storageKeys } from "@/helpers/storageKeys"

export const checkTokenExpiryMiddleware: Middleware = store => next => action => {
  let hasLoggedOut = false

  if (typeof window === "undefined") {
    return next(action)
  }
  const token = localStorage.getItem(storageKeys.access_token)
  const { auth } = store.getState() as RootState

  if (token && auth.isLoggedIn && !hasLoggedOut) {
    const decoded = jwtDecode(token)
    const expiryDate = decoded.exp && decoded.exp * 1000
    const isExpired = expiryDate && Date.now() > expiryDate
    if (isExpired) {
      hasLoggedOut = true
      localStorage.removeItem(storageKeys.access_token)
      axiosInstance.defaults.headers.common.Authorization = undefined
      store.dispatch(clearState())

      setTimeout(() => {
        hasLoggedOut = false
      }, 0)
    }
  }
  return next(action)
}
