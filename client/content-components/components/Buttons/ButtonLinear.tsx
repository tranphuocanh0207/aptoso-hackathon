import React from "react"

import { cn } from "~utils/lib"

import IconLoading from "../Icons/IconLoading"

type CustomButtonProps = {
  disabled?: boolean
  loading?: boolean
  classNameLoading?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const ButtonLinear = ({
  className,
  disabled,
  children,
  classNameLoading,
  loading = false,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-2xl w-full h-[50px] flex justify-center items-center p-4 gap-1 font-medium",
        {
          "!bg-[#272930] !text-[#3D3F46] pointer-events-none": disabled,
          "bg-linear-main": !disabled
        },
        className
      )}
      {...props}>
      {loading && <IconLoading className={classNameLoading} />}
      {children}
    </button>
  )
}

export default ButtonLinear
