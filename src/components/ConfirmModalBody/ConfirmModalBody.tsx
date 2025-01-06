import { FC } from "react"

import CustomMUIButton from "../CustomMUIButton"

import s from "./ConfirmModalBody.module.scss"

import { Product } from "@/types/products"

type Props = {
  title: string
  onClose: () => void
  actionHandler: () => Promise<Product | undefined> | Promise<void> | void
}

const ConfirmModalBody: FC<Props> = ({ title, onClose, actionHandler }) => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.btnWrapper}>
        <CustomMUIButton
          title="Confirm"
          type="button"
          variant="contained"
          handleClick={actionHandler}
        />
        <CustomMUIButton title="Cancel" type="button" variant="contained" handleClick={onClose} />
      </div>
    </div>
  )
}

export default ConfirmModalBody
