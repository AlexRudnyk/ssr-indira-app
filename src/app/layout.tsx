import cn from "classnames"
import type { Metadata } from "next"
import { Great_Vibes, Outfit, Red_Hat_Display } from "next/font/google"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import Providers from "./providers"

import "./globals.scss"

import { GlobalContextProvider } from "@/context/store"

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--great-vibes-font"
})

export const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--red-hat-display-font"
})

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--outfit-font"
})

export const metadata: Metadata = {
  title: "Indira shop",
  description: "Indira - the place, where you can find hygiene products"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(outfit.variable, redHatDisplay.variable, greatVibes.variable)}>
        <Providers>
          <GlobalContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  )
}
