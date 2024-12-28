"use client"

import { FC } from "react"
import { Button } from "@mui/material"
import { Form, Formik } from "formik"

import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./CommentsForm.module.scss"

import { useMutateAddComment } from "@/hooks/useQueryComments"
import { AddCommentSchema } from "@/yupSchemas/AddCommentSchema"

type Props = {
  productId: string
  onClose: () => void
}

const CommentsForm: FC<Props> = ({ productId, onClose }) => {
  const mutation = useMutateAddComment(productId)

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
          <h2>Please leave your comment</h2>
          <CustomTextField name="text" id="outlined-basic" label="Comment" variant="outlined" />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default CommentsForm
