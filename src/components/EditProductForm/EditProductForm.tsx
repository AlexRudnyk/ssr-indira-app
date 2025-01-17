import { FC } from "react"
import { Form, Formik } from "formik"

import CustomMUIButton from "../CustomMUIButton"
import { CustomTextField } from "../CustomTextField/CustomTextField"

import s from "./EditProductForm.module.scss"

import { useMutateEditProduct } from "@/hooks/useQueryProducts"
import { AddProductInitValues } from "@/types/initFormValuesTypes"
import { Product } from "@/types/products"
import { EditProductSchema } from "@/yupSchemas"

type Props = {
  onClose: () => void
  product: Product
}

const EditProductForm: FC<Props> = ({ onClose, product }) => {
  const { _id, title, text, description, price } = product

  const editProductInitialValues: Omit<AddProductInitValues, "photoURL"> = {
    title,
    text,
    description,
    price
  }

  const mutation = useMutateEditProduct()

  const handleSubmit = async (values: Omit<AddProductInitValues, "photoURL">) => {
    await mutation.mutateAsync({ id: _id, values })
    onClose()
  }

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={editProductInitialValues}
        onSubmit={handleSubmit}
        validationSchema={EditProductSchema()}
      >
        <Form className={s.form}>
          <h2>Please Edit a Product</h2>
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

          <CustomMUIButton title="Submit" type="submit" variant="contained" />
        </Form>
      </Formik>
    </div>
  )
}

export default EditProductForm
