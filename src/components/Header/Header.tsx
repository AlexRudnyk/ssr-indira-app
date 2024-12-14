"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import logo from "../../../public/images/mandala.png"
import Navigation from "../Navigation"

import s from "./Header.module.scss"

import routes from "@/helpers/routes"

const Header = () => {
  const currentRoute = usePathname()

  const handleUpClick = () => {
    if (currentRoute === routes.home) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <header>
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.headerWrapper}>
            {currentRoute === routes.home ? (
              <div className={s.logoWrapper} onClick={handleUpClick}>
                <Image
                  src={logo}
                  alt="logo mandala icon"
                  width={80}
                  height={80}
                  className={s.logoIcon}
                />
                <p className={s.logoBrand}>Indira</p>
              </div>
            ) : (
              <Link href={routes.home} onClick={handleUpClick}>
                <div className={s.logoWrapper}>
                  <Image
                    src={logo}
                    alt="logo mandala icon"
                    width={80}
                    height={80}
                    className={s.logoIcon}
                  />
                  <p className={s.logoBrand}>Indira</p>
                </div>
              </Link>
            )}
            <Navigation />
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
