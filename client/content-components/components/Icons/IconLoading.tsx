import React from "react"

import { cn } from "~utils/lib"

interface Props {
  className?: string
}

const IconLoading = ({ className }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "size-6 border-4 border-blue-500 border-dashed rounded-full animate-spin",
          className
        )}></div>
    </div>
  )
}

export default IconLoading
