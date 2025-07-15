import Get from "data-base64:~assets/icons/get.png"
import Sent from "data-base64:~assets/icons/sent.png"
import React from "react"

import { cn } from "~utils/lib"

interface Props {
  src: string
  className?: string
  isSent?: boolean
  isGet?: boolean
}

const TokenLogo = ({
  src,
  className,
  isSent = false,
  isGet = false
}: Props) => {
  return (
    <div className={cn("relative p-2 rounded-[27px] bg-black-main", className)}>
      <img
        src={src}
        className={cn("rounded-[27px] w-full h-full")}
        alt="token-logo"
      />
      {(isSent || isGet) && (
        <img
          alt="icon"
          src={isGet ? Get : Sent}
          className="-right-2 bottom-0 absolute size-6 flex items-center justify-center rounded-full bg-[#F6F6F81A] border-[1.5px] border-black-main"
        />
      )}
    </div>
  )
}

export default TokenLogo

const IconSent = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.03513 4.25458L4.75513 2.11458C1.88013 0.674579 0.700132 1.85458 2.14013 4.72958L2.57513 5.59958C2.70013 5.85458 2.70013 6.14958 2.57513 6.40458L2.14013 7.26958C0.700132 10.1446 1.87513 11.3246 4.75513 9.88458L9.03513 7.74458C10.9551 6.78458 10.9551 5.21458 9.03513 4.25458ZM7.42013 6.37458H4.72013C4.51513 6.37458 4.34513 6.20458 4.34513 5.99958C4.34513 5.79458 4.51513 5.62458 4.72013 5.62458H7.42013C7.62513 5.62458 7.79513 5.79458 7.79513 5.99958C7.79513 6.20458 7.62513 6.37458 7.42013 6.37458Z"
      fill="white"
    />
  </svg>
)

const IconGet = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.095 1H3.905C2.085 1 1 2.085 1 3.905V8.09C1 9.915 2.085 11 3.905 11H8.09C9.91 11 10.995 9.915 10.995 8.095V3.905C11 2.085 9.915 1 8.095 1ZM4.235 5.49C4.38 5.345 4.62 5.345 4.765 5.49L5.625 6.35V3.255C5.625 3.05 5.795 2.88 6 2.88C6.205 2.88 6.375 3.05 6.375 3.255V6.35L7.235 5.49C7.38 5.345 7.62 5.345 7.765 5.49C7.91 5.635 7.91 5.875 7.765 6.02L6.265 7.52C6.19397 7.58918 6.09914 7.62854 6 7.63C5.90061 7.62975 5.80535 7.59021 5.735 7.52L4.235 6.02C4.16526 5.94943 4.12615 5.85422 4.12615 5.755C4.12615 5.65579 4.16526 5.56057 4.235 5.49ZM9.12 8.61C8.115 8.945 7.06 9.115 6 9.115C4.94 9.115 3.885 8.945 2.88 8.61C2.78613 8.57778 2.70878 8.5098 2.66477 8.42085C2.62077 8.3319 2.61366 8.22917 2.645 8.135C2.71 7.94 2.92 7.83 3.12 7.9C4.98 8.52 7.025 8.52 8.885 7.9C9.08 7.835 9.295 7.94 9.36 8.135C9.42 8.335 9.315 8.545 9.12 8.61Z"
      fill="white"
    />
  </svg>
)
