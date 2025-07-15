import IconKey from "data-base64:~assets/icons/key.svg"
import XIcon from "data-base64:~assets/icons/x_black.svg"
import LoginVideo from "data-base64:~assets/login.mp4"
import React from "react"
import { useForm } from "react-hook-form"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import { FormInput } from "~content-components/components/Form/FormInput"
import HeaderCustom from "~content-components/components/Header/HeaderCustom"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import { hashPassword } from "~utils/hash"
import { cn, getFullPathname } from "~utils/lib"

import { Logo } from "../SignInPage"

type FormValues = {
  password: string
  confirmPassword: string
}

const SecurePasswordPage = () => {
  const {
    oldPassword: passwordStore,
    setPassword,
    setOldPassword
  } = useCustomStorage()
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      password: passwordStore,
      confirmPassword: ""
    }
  })

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data)
    const hash = hashPassword(data.confirmPassword)

    setPassword(hash)
    setOldPassword(hash)
    router.navigate(getFullPathname(ERoute.Campaigns))
  }

  return (
    <>
      <HeaderCustom isZoom={false} titleBack="Back" />
      <div
        className={cn("flex flex-col items-center justify-center h-full px-5", {
          "justify-start": passwordStore
        })}>
        {passwordStore ? (
          <div className="flex flex-col items-center gap-6 pb-3">
            <video
              src={LoginVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-4">
              {Logo}
              <p className="text-[22px] text-[#23F7DD] ">
                Earn while you scroll
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <img src={IconKey} alt="icon" className="size-[64px]" />
            <p className="text-[32px] font-bold text-white">
              Set a Password for Your Wallet
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6">
          {!passwordStore && (
            <FormInput
              type="password"
              control={control as any}
              name="password"
              placeholder="Password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              }}
            />
          )}
          <FormInput
            type="password"
            control={control as any}
            name="confirmPassword"
            placeholder="Confirm Password"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                passwordStore
                  ? hashPassword(value) === passwordStore ||
                    "Confirm password do not match"
                  : value === password || "Password do not match"
            }}
          />
          <ButtonLinear
            disabled={
              passwordStore ? !confirmPassword : password !== confirmPassword
            }
            type="submit"
            className="w-full mt-6 text-center font-semibold text-black-main">
            Continue
          </ButtonLinear>
        </form>
      </div>
    </>
  )
}

export default SecurePasswordPage
