"use client"

import { FC, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { useGlobalContext } from "@/context/store"

type Props = {
  children: React.ReactNode
}

const AuthWrapper: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useGlobalContext()
  const { push } = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/login" && pathname !== "/register") push("/login")
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) push("/")
  }, [isLoggedIn, pathname, push])

  return children
}

export default AuthWrapper
