import IconKey from "data-base64:~assets/icons/key.svg"
import React from "react"
import { useForm } from "react-hook-form"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import { FormInput } from "~content-components/components/Form/FormInput"
import HeaderCustom from "~content-components/components/Header/HeaderCustom"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import router from "~content-components/routes"
import { hashPassword } from "~utils/hash"

type FormValues = {
  oldPassword: string
  password: string
  confirmPassword: string
}

const ChangePasswordPage = () => {
  const { password: passwordStore, setPassword } = useCustomStorage()
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }
  })

  const password = watch("password")

  const onSubmit = (data: FormValues) => {
    setPassword(hashPassword(data.confirmPassword))
    router.navigate(-1)
  }

  return (
    <div className="flex flex-col px-4 gap-4 h-full">
      <HeaderCustom
        title="Change Password"
        isZoom={false}
        className="px-0 h-auto"
      />
      <div className="flex flex-col mt-6 gap-3">
        <img src={IconKey} alt="icon" className="size-[64px]" />
        <p className="text-[32px] font-bold text-white">Set new Password</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-6 h-full flex flex-col">
        <FormInput
          type="password"
          control={control as any}
          name="oldPassword"
          placeholder="Old Password"
          className="rounded-2xl"
          rules={{
            required: "Old Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
            validate: (value) =>
              hashPassword(value) === passwordStore ||
              "Old password do not match"
          }}
        />

        <FormInput
          type="password"
          control={control as any}
          name="password"
          placeholder="New Password"
          className="rounded-2xl"
          rules={{
            required: "New Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" }
          }}
        />
        <FormInput
          type="password"
          control={control as any}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="rounded-2xl"
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match"
          }}
        />
        <div className="justify-end items-end flex w-full h-full pb-[31px]">
          <ButtonLinear
            type="submit"
            className="w-full mt-6 text-center text-black-main">
            Confirm
          </ButtonLinear>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordPage
