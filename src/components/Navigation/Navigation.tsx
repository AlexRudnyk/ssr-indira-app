"use client"

import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

import { logout } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import logoutIcon from "../../../public/icons/logout.svg"

import s from "./Navigation.module.scss"

import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"

const Navigation = () => {
  const { isLoggedIn, user } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={s.navWrapper}>
      {!isLoggedIn && (
        <Link href={routes.login} className={s.cartLink}>
          SignIn
        </Link>
      )}
      {user?.role !== "ADMIN" && (
        <Link href={routes.cart} className={s.cartLink}>
          Cart
        </Link>
      )}
      {user?.role === "ADMIN" && (
        <Link href={routes.admin} className={s.cartLink}>
          Admin
        </Link>
      )}
      {isLoggedIn && (
        <>
          <p>{user?.name}</p>
          <IconButton onClick={handleLogout}>
            <Image src={logoutIcon} alt="logout door icon" width={24} height={24} />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default Navigation
