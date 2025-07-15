import { Danger, TickSquare } from "iconsax-react"
import React from "react"
import type { Toast, ToastOptions, ToastType } from "react-hot-toast"

import { cn } from "~utils/lib"

import IconLoading from "../Icons/IconLoading"

export type CustomToastProps = {
  t: Toast
  title: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean
  onClose: () => void
}

// NOTE: add another style of it's type if needed
function CustomToast({
  title,
  description,
  t,
  showIcon = true,
  onClose
}: CustomToastProps) {
  const { type } = t

  const renderIcon = (type: ToastType) => {
    const icon = {
      success: <TickSquare size="22" color="#23F7DD" variant="Bold" />,
      error: <Danger size="22" color="#DE4313" variant="Bold" />,
      loading: (
        <div className="animate-pulse">
          <IconLoading />
        </div>
      )
    }

    return icon[type] ?? null
  }

  return (
    <div
      className={cn(
        "bg-[#272930] z-[9999999] p-3 pr-4 rounded-lg shadow-lg border border-[#050318]",
        "flex items-center justify-between",
        "w-[325px] max-w-[325px]",
        "pointer-events-auto",
        type === "error" && "border-red",
        type === "success" && "border-main"
      )}>
      <div className="flex items-center gap-3">
        {showIcon && renderIcon(type)}

        <div {...t.ariaProps}>
          <div
            className={cn(
              "text-white text-sm font-medium",
              type === "error" && "text-[#DE4313]",
              type === "success" && "text-[#23F7DD]"
            )}>
            {title || (type === "error" ? "Error" : "Success")}
          </div>

          {description && (
            <p className="text-white/60 text-xs font-normal max-w-[250px]">
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        onClick={onClose}
        className="cursor-pointer hover:text-[#ffcccc] hover:scale-110 transition-transform duration-200">
        <XIcon />
      </div>
    </div>
  )
}

const XIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 11L1 1"
        stroke="#828291"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M1 11L11 1"
        stroke="#828291"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default CustomToast
