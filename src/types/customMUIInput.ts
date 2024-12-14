export type CustomTextFieldProps = {
  name: string
  label?: string
  variant?: "filled" | "outlined" | "standard"
  type?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}
