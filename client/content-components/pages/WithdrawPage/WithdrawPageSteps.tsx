import React from "react"

import { cn } from "~utils/lib"

interface Props {
  step: number
}

const steps = [
  {
    step: 1,
    title: "Transacion Details"
  },
  {
    step: 2,
    title: "Transaction Summary"
  },
  {
    step: 3,
    title: "Confirm Transacion"
  }
]

const WithdrawPageSteps = ({ step = 1 }: Props) => {
  return (
    <div className="flex items-center w-full gap-2">
      {steps.map((item, index) => {
        const isActive = step === item.step
        return (
          <div key={index} className="w-full flex flex-col">
            <span
              className={cn(
                "size-5 rounded-full font-medium text-center text-xs text-black-main bg-white/30",
                {
                  "bg-white": isActive
                }
              )}>
              {item.step}
            </span>
            <span
              className={cn("text-[#A6A6A9] mt-2.5", {
                "text-white": isActive
              })}>
              {item.title}
            </span>
            <div
              className={cn("h-[1.5px] bg-[#A6A6A933] w-full mt-2", {
                "bg-linear-main": isActive
              })}
            />
          </div>
        )
      })}
    </div>
  )
}

export default WithdrawPageSteps
