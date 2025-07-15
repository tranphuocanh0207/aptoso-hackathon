import React from "react"
import { useForm } from "react-hook-form"

import type { ModalWrapperProps } from "."
import ModalWrapper from "."
import ButtonLinear from "../Buttons/ButtonLinear"
import { FormInput } from "../Form/FormInput"

interface Props extends ModalWrapperProps {
  onConfirm?: () => void
}

type FormValues = {
  password: string
}

const ModalConfirmPassword = ({ show, onClose, onConfirm }: Props) => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data)
  }

  return (
    <ModalWrapper show={show} onClose={onClose} title={"Confirm your passcode"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-6 h-full flex flex-col">
        <FormInput
          type="password"
          control={control as any}
          name="password"
          placeholder="Your Password"
          className="rounded-2xl"
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" }
          }}
        />

        <ButtonLinear
          onClick={onConfirm}
          // type="submit"
          className="w-full mt-5 text-center text-black-main bg-white font-semibold">
          Confirm
        </ButtonLinear>
      </form>
    </ModalWrapper>
  )
}

export default ModalConfirmPassword
