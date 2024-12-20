import { number, object, string } from "yup"

import { regexps } from "./regexps"

export const AddProductSchema = () => {
  return object({
    title: string()
      .required("Title is required")
      .matches(
        regexps.title,
        "Title must be between 2 and 50 characters and can include letters (Ukrainian and Latin), numbers, spaces, underscores, single quotes, double quotes, hyphens, and the symbols . , ( ) : ;"
      ),
    text: string()
      .required("Text is required")
      .matches(
        regexps.text,
        "Text must be between 2 and 200 characters and can include letters (Ukrainian and Latin), numbers, spaces, underscores, single quotes, double quotes, hyphens, and the symbols . , ( ) : ;"
      ),
    description: string()
      .required("Description is required")
      .matches(
        regexps.description,
        "Description must be between 2 and 500 characters and can include letters (Ukrainian and Latin), numbers, spaces, underscores, single quotes, double quotes, hyphens, and the symbols . , ( ) : ;"
      ),
    photoURL: string()
      .required("Photo url is required")
      .matches(
        regexps.photoURL,
        "Must be a valid image URL ending with .png, .jpg, .jpeg, .gif, or .webp"
      ),
    price: number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .integer("Price must be an integer")
      .required("Price is required")
  })
}
