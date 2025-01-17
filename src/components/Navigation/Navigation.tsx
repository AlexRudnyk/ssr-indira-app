"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import Badge from "@mui/material/Badge"
import Image from "next/image"
import Link from "next/link"

import { getCurrentUser, logout } from "@/redux/auth/operations"
import { AppDispatch } from "@/redux/store"

import logoutIcon from "../../../public/icons/logout.svg"
import ConfirmActionModal from "../ConfirmActionModal"

import s from "./Navigation.module.scss"

import { useGlobalContext } from "@/context/store"
import routes from "@/helpers/routes"
import { useAuth } from "@/hooks/useAuth"

const Navigation = () => {
  const { isLoggedIn, user } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] = useState<boolean>(false)
  const { cart } = useGlobalContext()

  const handleLogout = async () => {
    await dispatch(logout())
    setIsConfirmActionModalOpen(false)
  }

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrentUser())
  }, [dispatch, isLoggedIn])

  return (
    <div className={s.navWrapper}>
      {!isLoggedIn && (
        <Link href={routes.login} className={s.cartLink}>
          SignIn
        </Link>
      )}
      {user?.role !== "ADMIN" && (
        <Badge
          badgeContent={isLoggedIn && user ? user.productsInCart.length : cart.length}
          color="error"
        >
          <Link href={routes.cart} className={s.cartLink}>
            Cart
          </Link>
        </Badge>
      )}
      {user?.role === "ADMIN" && (
        <Link href={routes.admin} className={s.cartLink}>
          Admin
        </Link>
      )}
      {isLoggedIn && (
        <>
          <p>{user?.name}</p>
          <IconButton onClick={() => setIsConfirmActionModalOpen(true)}>
            <Image src={logoutIcon} alt="logout door icon" width={24} height={24} />
          </IconButton>
          <ConfirmActionModal
            title="Do you really want to logout?"
            actionHandler={handleLogout}
            isConfirmActionModalOpen={isConfirmActionModalOpen}
            setIsConfirmActionModalOpen={setIsConfirmActionModalOpen}
          />
        </>
      )}
    </div>
  )
}

export default Navigation
