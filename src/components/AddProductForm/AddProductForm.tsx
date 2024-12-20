"use client"

import { Button } from "@mui/material"
import { Form, Formik, FormikHelpers } from "formik"

import { CustomTextField } from "../CustomTextField/CustomTextField"
import ImageUpload from "../ImageUpload/ImageUpload"

import s from "./AddProductForm.module.scss"

import { initialFormValues } from "@/helpers/initialFormValues"
import { useMutateAddProduct } from "@/hooks/useQueryProducts"
import { AddProductInitValues } from "@/types/initFormValuesTypes"
import { AddProductSchema } from "@/yupSchemas"

const AddProductForm = () => {
  const mutate = useMutateAddProduct()

  const handleSubmit = async (
    values: AddProductInitValues,
    { resetForm }: FormikHelpers<AddProductInitValues>
  ) => {
    await mutate.mutateAsync(values)
    resetForm()
  }

  return (
    <Formik
      initialValues={initialFormValues.addProduct}
      onSubmit={handleSubmit}
      validationSchema={AddProductSchema()}
    >
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <h2>Please Add a Product</h2>
          <ImageUpload setFieldValue={setFieldValue} />
          <CustomTextField name="title" id="outlined-basic" label="Title" variant="outlined" />
          <CustomTextField name="text" id="outlined-basic" label="Text" variant="outlined" />
          <CustomTextField
            name="description"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            maxRows={4}
          />
          <CustomTextField
            name="price"
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { style: { appearance: "none", MozAppearance: "textfield" } }
            }}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AddProductForm
