import { FC } from "react"

import CommentItem from "../CommentItem"

import s from "./CommentsList.module.scss"

import { Comment } from "@/types/comments"

type Props = {
  comments: Comment[]
}

const CommentsList: FC<Props> = ({ comments }) => {
  return (
    <ul className={s.commentsList}>
      {comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </ul>
  )
}

export default CommentsList
