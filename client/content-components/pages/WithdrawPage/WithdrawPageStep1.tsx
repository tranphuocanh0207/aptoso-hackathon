import React from "react"
import { useForm } from "react-hook-form"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import { FormInput } from "~content-components/components/Form/FormInput"
import IconArrow from "~content-components/components/Icons/IconArrow"
import { cn } from "~utils/lib"

interface Props {
  onNextStep: () => void
}

type FormValues = {
  address: string
  amount: string
}

const percents = [5, 25, 50, 100]

const WithdrawPageStep1 = ({ onNextStep = () => {} }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      address: "",
      amount: ""
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full mt-9">
      <div className="h-full flex flex-col w-full">
        <div className="flex flex-col gap-3">
          <label className="text-xs text-ended">Receiver</label>
          <FormInput
            control={control as any}
            name="address"
            placeholder="Ex:0x12345...12345"
            rules={{
              required: "Address is required",
              minLength: { value: 40, message: "Minimum 40 characters" }
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <span className="text-xs text-ended">Amount</span>
            <p className="text-xs text-ended">
              Available: <span className="text-white">0 APT</span>
            </p>
          </div>
          <FormInput
            control={control as any}
            name="amount"
            placeholder="Amount"
            rules={{
              required: "Amount is required"
            }}
            suffix={
              <button className="px-3 py-2 flex items-center gap-2 absolute right-2 top-2">
                <span className="text-sm font-medium">APT</span>
                <IconArrow color="#8B98A5" className="rotate-180" />
              </button>
            }
          />
        </div>

        <div className="flex items-center justify-between w-full gap-2">
          {percents?.map((item) => (
            <button className="flex justify-center items-center h-10 w-full border-[1px] border-[#272930] rounded-2xl font-medium text-sm text-white">
              {item}%
            </button>
          ))}
        </div>
      </div>
      <ButtonLinear
        disabled
        onClick={onNextStep}
        // type="submit"
        className={cn("h-[50px] rounded-2xl w-full font-bold")}>
        NEXT
      </ButtonLinear>
    </form>
  )
}

export default WithdrawPageStep1
