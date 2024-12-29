import { FC } from "react"
import { Button } from "@mui/material"

import s from "./ConfirmModalBody.module.scss"

import { Product } from "@/types/products"

type Props = {
  title: string
  onClose: () => void
  actionHandler: () => Promise<Product | undefined> | Promise<void>
}

const ConfirmModalBody: FC<Props> = ({ title, onClose, actionHandler }) => {
  return (
    <div className={s.wrapper}>
      <h2>{title}</h2>
      <div className={s.btnWrapper}>
        <Button type="button" variant="contained" onClick={actionHandler}>
          Confirm
        </Button>
        <Button type="button" variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ConfirmModalBody
