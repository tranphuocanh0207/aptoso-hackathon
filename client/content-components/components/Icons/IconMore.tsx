import React from "react"

interface Props {
  color?: string
}

const IconMore = ({ color = "#23F7DD" }: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 7.5L4 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 12.5L4 12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 17.5L4 17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default IconMore
