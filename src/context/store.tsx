"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

import { ContextType } from "@/types/context"
import { CartItem } from "@/types/products"

const GlobalContext = createContext<ContextType | undefined>(undefined)

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCartData = sessionStorage.getItem("cart")

    if (storedCartData) {
      try {
        const cartData = JSON.parse(storedCartData)
        setCart(cartData)
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error)
      }
    }
  }, [])

  const value = useMemo(
    () => ({
      cart,
      setCart
    }),
    [cart]
  )

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = (): ContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider")
  }
  return context
}
