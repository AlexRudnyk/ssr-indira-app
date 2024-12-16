"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import { jwtDecode } from "jwt-decode"

import axiosInstance from "@/api/axiosInstance"
import { storageKeys } from "@/helpers/storageKeys"

interface GlobalContextType {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(accessToken))

  useEffect(() => {
    const token = localStorage.getItem(storageKeys.access_token)
    if (token) setAccessToken(token)
  }, [])

  useEffect(() => {
    setIsLoggedIn(Boolean(accessToken))
  }, [accessToken])

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      const expiryDate = decoded.exp && decoded.exp * 1000
      const isExpired = expiryDate && Date.now() > expiryDate

      if (isExpired) {
        localStorage.removeItem(storageKeys.access_token)
        axiosInstance.defaults.headers.common.Authorization = undefined
        setIsLoggedIn(false)
      }
    }
  }, [accessToken])

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn
    }),
    [isLoggedIn]
  )

  console.log("TOKEN", accessToken)
  console.log("IS_LOGGED_IN", isLoggedIn)

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider")
  }
  return context
}
