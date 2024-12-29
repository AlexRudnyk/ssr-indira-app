import { FC } from "react"
import { Modal } from "@mui/material"

import ConfirmModalBody from "../ConfirmModalBody"

import { Product } from "@/types/products"

type Props = {
  isConfirmActionModalOpen: boolean
  setIsConfirmActionModalOpen: (arg: boolean) => void
  actionHandler: () => Promise<Product | undefined> | Promise<void> | void
  title: string
}

const ConfirmActionModal: FC<Props> = ({
  isConfirmActionModalOpen,
  setIsConfirmActionModalOpen,
  actionHandler,
  title
}) => {
  return (
    <Modal open={isConfirmActionModalOpen} onClose={() => setIsConfirmActionModalOpen(false)}>
      <ConfirmModalBody
        title={title}
        onClose={() => setIsConfirmActionModalOpen(false)}
        actionHandler={actionHandler}
      />
    </Modal>
  )
}

export default ConfirmActionModal
