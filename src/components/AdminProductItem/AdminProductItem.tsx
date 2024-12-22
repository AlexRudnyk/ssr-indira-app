"use client"

import { FC, useState } from "react"
import { IconButton, Modal } from "@mui/material"
import Image from "next/image"

import pencilIcon from "../../../public/icons/pencil.svg"
import trashBinIcon from "../../../public/icons/trash.svg"
import ConfirmActionModal from "../ConfirmActionModal"
import EditProductForm from "../EditProductForm"

import s from "./AdminProductItem.module.scss"

import { productsApi } from "@/api/productsApi"
import { useMutateDeleteProduct } from "@/hooks/useQueryProducts"
import { Product } from "@/types/products"

type Props = {
  product: Product
}

const AdminProductItem: FC<Props> = ({ product }) => {
  const { _id, photoURL, title, price, comments } = product
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] = useState<boolean>(false)
  const mutation = useMutateDeleteProduct()

  return (
    <li className={s.productItem}>
      <Image
        src={photoURL}
        alt="product image"
        width={100}
        height={100}
        className={s.productImage}
      />
      <div>
        <p className={s.title}>{title}</p>
        <p>Comments ({comments.length})</p>
      </div>
      <div className={s.priceAndBtnBlock}>
        <p className={s.productPrice}>{price} UAH</p>
        <div className={s.btnWrapper}>
          <IconButton onClick={() => setIsEditModalOpen(true)}>
            <Image src={pencilIcon} alt="pencil icon" width={32} height={32} />
          </IconButton>
          <IconButton onClick={() => setIsConfirmActionModalOpen(true)}>
            <Image src={trashBinIcon} alt="trash bin icon" width={32} height={32} />
          </IconButton>
        </div>
      </div>
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProductForm onClose={() => setIsEditModalOpen(false)} product={product} />
      </Modal>
      <ConfirmActionModal
        title="Do you really want to delete this item?"
        isConfirmActionModalOpen={isConfirmActionModalOpen}
        setIsConfirmActionModalOpen={setIsConfirmActionModalOpen}
        actionHandler={() => mutation.mutateAsync(_id)}
      />
    </li>
  )
}

export default AdminProductItem
