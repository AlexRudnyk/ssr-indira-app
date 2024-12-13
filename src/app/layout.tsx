import type { Metadata } from "next"

import Providers from "./providers"

import "./globals.scss"

import { GlobalContextProvider } from "@/context/store"

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
      <body>
        <Providers>
          <GlobalContextProvider>
            <main>{children}</main>
          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  )
}
