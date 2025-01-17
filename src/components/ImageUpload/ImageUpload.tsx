"use client"

import React, { FC, useState } from "react"
import Image from "next/image"

import SuccessImage from "../../../public/images/success-check.png"
import CustomMUIButton from "../CustomMUIButton"

import s from "./ImageUpload.module.scss"

type FormikProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const ImageUpload: FC<FormikProps> = ({ setFieldValue }) => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploaded, setIsUploaded] = useState<boolean>(false)

  const uploadImage = async () => {
    if (!image) {
      return
    }
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "")
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "")
    data.append("folder", "Cloudinary-React")

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      )
      const res = await response.json()
      setFieldValue("photoURL", res.url)
      setIsUploaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.currentTarget
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return
    }
    const file = fileInput.files[0]
    setImage(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      setPreview(reader.result as string)
    }
  }

  const handleResetClick = () => {
    setPreview(null)
    setImage(null)
    setIsUploaded(false)
  }

  return (
    <div className={s.wrapper}>
      <input
        hidden
        id="hidden-input"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
      {!preview && (
        <label htmlFor="hidden-input" className={s.uploadFileLabel}>
          Upload Image
        </label>
      )}
      {preview && (
        <div>
          <div className={s.previewWrapper}>
            <Image src={preview} alt="preview" width={300} height={300} />
            {isUploaded && (
              <Image
                src={SuccessImage}
                alt="Success"
                width={20}
                height={20}
                className={s.successImage}
              />
            )}
          </div>
          <div className={s.buttonsWrapper}>
            <CustomMUIButton
              title="Upload"
              type="button"
              variant="contained"
              handleClick={uploadImage}
              disabled={isUploaded}
            />
            <CustomMUIButton
              title="Reset"
              type="button"
              variant="contained"
              handleClick={handleResetClick}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
