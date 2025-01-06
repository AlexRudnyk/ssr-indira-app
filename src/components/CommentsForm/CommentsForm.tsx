"use client"

import { FC } from "react"
import { Form, Formik } from "formik"

import CustomMUIButton from "../CustomMUIButton"
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
          <CustomTextField
            name="text"
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            multiline
            maxRows={4}
          />
          <CustomMUIButton title="Comment" type="submit" variant="contained" />
        </Form>
      </Formik>
    </div>
  )
}

export default CommentsForm
