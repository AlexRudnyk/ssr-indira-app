import { FC } from "react"

import s from "./CommentItem.module.scss"

import { Comment } from "@/types/comments"

type Props = {
  comment: Comment
}

const CommentItem: FC<Props> = ({ comment }) => {
  const { userName, text, createdAt } = comment

  const date = createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown Date"

  return (
    <li className={s.commentListItem}>
      <p className={s.userName}>{userName}:</p>
      <p>{text}</p>
      <p className={s.date}>{date}</p>
    </li>
  )
}

export default CommentItem
