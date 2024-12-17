"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import logo from "../../../public/images/mandala.png"

import s from "./Logo.module.scss"

import routes from "@/helpers/routes"

const Logo = () => {
  const currentRoute = usePathname()

  const handleUpClick = () => {
    if (currentRoute === routes.home) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return currentRoute === routes.home ? (
    <div className={s.logoWrapper} onClick={handleUpClick}>
      <Image src={logo} alt="logo mandala icon" width={60} height={60} className={s.logoIcon} />
      <p className={s.logoBrand}>Indira</p>
    </div>
  ) : (
    <Link href={routes.home} onClick={handleUpClick}>
      <div className={s.logoWrapper}>
        <Image src={logo} alt="logo mandala icon" width={60} height={60} className={s.logoIcon} />
        <p className={s.logoBrand}>Indira</p>
      </div>
    </Link>
  )
}

export default Logo
