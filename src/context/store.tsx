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
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

import { storageKeys } from "@/helpers/storageKeys"

interface GlobalContextType {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = Cookies.get(storageKeys.access_token)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(accessToken))

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      const expiryDate = decoded.exp && decoded.exp * 1000
      const isExpired = expiryDate && Date.now() > expiryDate

      if (isExpired) {
        Cookies.remove(storageKeys.access_token)
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

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider")
  }
  return context
}
