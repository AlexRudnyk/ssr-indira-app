import { object, string } from "yup"

import { regexps } from "./regexps"

export const AddCommentSchema = () => {
  return object({
    text: string()
      .required("Comment is required")
      .matches(
        regexps.comment,
        "Comment must be between 2 and 5000 characters and can include letters (Ukrainian and Latin), numbers, spaces, underscores, single quotes, double quotes, hyphens, and the symbols . , ( ) : ; ? !"
      )
  })
}
