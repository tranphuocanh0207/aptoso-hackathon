import React from "react"

interface Props {
  color?: string
  className?: string
}

const IconArrow = ({ color = "#23F7DD", className }: Props) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.24678 5.44332L12.5332 9.86363C12.8007 10.1395 12.6386 10.6667 12.2863 10.6667L3.71337 10.6667C3.3611 10.6667 3.19897 10.1395 3.46644 9.86364L7.7529 5.44332C7.895 5.29678 8.10468 5.29678 8.24678 5.44332Z"
        fill={color}
      />
    </svg>
  )
}

export default IconArrow
