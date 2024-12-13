import { Great_Vibes, Outfit, Red_Hat_Display } from "next/font/google"

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
