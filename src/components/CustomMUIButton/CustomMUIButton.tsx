"use client"

import { FC } from "react"
import { Button } from "@mui/material"
import cn from "classnames"

import s from "./CustomMUIButton.module.scss"

type Props = {
  type: "button" | "reset" | "submit"
  variant: "contained" | "outlined" | "text"
  handleClick?: () => void
  title: string
  styles?: string
  disabled?: boolean
}

const CustomMUIButton: FC<Props> = ({ title, type, variant, handleClick, styles, disabled }) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={handleClick}
      className={cn(styles, s.customStyle, {
        [s.disabled]: disabled,
        [s.outlined]: variant === "outlined"
      })}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}

export default CustomMUIButton
