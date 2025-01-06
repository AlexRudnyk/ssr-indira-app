"use client"

import { FC, useState } from "react"
import { IconButton, Modal } from "@mui/material"
import Image from "next/image"

import pencilIcon from "../../../public/icons/pencil.svg"
import trashBinIcon from "../../../public/icons/trash.svg"
import ConfirmActionModal from "../ConfirmActionModal"
import ReplyComment from "../ReplyComment"
import ReplyCommentForm from "../ReplyCommentForm"

import s from "./CommentItem.module.scss"

import { useAuth } from "@/hooks/useAuth"
import { useMutateRemoveComment } from "@/hooks/useQueryComments"
import { Comment } from "@/types/comments"

type Props = {
  comment: Comment
}

const CommentItem: FC<Props> = ({ comment }) => {
  const { _id, userName, text, createdAt, reply } = comment
  const { user } = useAuth()
  const mutation = useMutateRemoveComment()
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] = useState<boolean>(false)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false)

  const date = createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown Date"

  return (
    <li className={s.commentListItem}>
      <p className={s.userName}>{userName}:</p>
      <p className={s.text}>{text}</p>
      <p className={s.date}>{date}</p>
      {reply && <ReplyComment reply={reply} />}
      {user && user.role === "ADMIN" && (
        <div className={s.adminBtnsWrapper}>
          <IconButton onClick={() => setIsReplyModalOpen(true)}>
            <Image src={pencilIcon} alt="pencil icon" width={24} height={24} />
          </IconButton>
          <IconButton onClick={() => setIsConfirmActionModalOpen(true)}>
            <Image src={trashBinIcon} alt="trash bin icon" width={24} height={24} />
          </IconButton>
        </div>
      )}
      <Modal open={isReplyModalOpen} onClose={() => setIsReplyModalOpen(false)}>
        <ReplyCommentForm commentId={_id} onClose={() => setIsReplyModalOpen(false)} />
      </Modal>
      <ConfirmActionModal
        title="Do you want to remove this comment?"
        isConfirmActionModalOpen={isConfirmActionModalOpen}
        setIsConfirmActionModalOpen={setIsConfirmActionModalOpen}
        actionHandler={() => mutation.mutateAsync(_id)}
      />
    </li>
  )
}

export default CommentItem
