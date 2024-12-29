"use client"

import { FC } from "react"
import { Button } from "@mui/material"
import { Form, Formik } from "formik"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./ReplyCommentForm.module.scss"

import { useMutateReplyComment } from "@/hooks/useQueryComments"
import { AddCommentSchema } from "@/yupSchemas/AddCommentSchema"

type Props = {
  commentId: string
  onClose: () => void
}

const ReplyCommentForm: FC<Props> = ({ commentId, onClose }) => {
  const mutation = useMutateReplyComment(commentId)

  const handleSubmit = async (values: { text: string }) => {
    await mutation.mutateAsync(values)
    onClose()
  }

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={handleSubmit}
        validationSchema={AddCommentSchema()}
      >
        <Form className={s.form}>
          <h2>Please reply comment</h2>
          <CustomTextField
            name="text"
            id="outlined-basic"
            label="Reply"
            variant="outlined"
            multiline
            maxRows={4}
          />
          <Button variant="contained" type="submit">
            Reply
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default ReplyCommentForm
