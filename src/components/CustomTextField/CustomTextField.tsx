import TextField from "@mui/material/TextField"
import { useField } from "formik"

import { CustomTextFieldProps } from "@/types/customMUIInput"

export const CustomTextField = ({ label, variant, ...props }: CustomTextFieldProps) => {
  const [field, meta] = useField(props)

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      variant={variant}
      error={!!meta.error && meta.touched}
      helperText={meta.touched && meta.error ? meta.error : ""}
    />
  )
}
