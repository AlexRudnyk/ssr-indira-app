import { FC } from "react"

import s from "./ReplyComment.module.scss"

type Props = {
  reply: string
}

const ReplyComment: FC<Props> = ({ reply }) => {
  return (
    <div className={s.reply}>
      <p className={s.adminName}>Indira Soap:</p>
      <p>{reply}</p>
    </div>
  )
}

export default ReplyComment
