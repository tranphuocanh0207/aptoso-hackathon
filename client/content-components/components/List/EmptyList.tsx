import React from "react"

import { cn } from "~utils/lib"

interface Props {
  title?: string
  description?: string
  className?: string
  icon?: React.ReactNode
}

const EmptyList = ({
  className,
  title = "Empty",
  description = "No data",
  icon
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-[284px] gap-3",
        className
      )}>
      {icon}
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-ended">{description}</p>
    </div>
  )
}

export default EmptyList
