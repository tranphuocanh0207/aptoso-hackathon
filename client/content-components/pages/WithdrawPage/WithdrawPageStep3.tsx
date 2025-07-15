import React from "react"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import IconAptos from "~content-components/components/Icons/IconAptos"
import router from "~content-components/routes"
import { cn } from "~utils/lib"

const WithdrawPageStep3 = () => {
  return (
    <div className="mt-9 flex flex-col h-full">
      <div className="flex flex-col justify-center items-center">
        {IconSuccess}
        <h1 className="text-xl font-medium text-main mt-6">
          Transaction submitted for
        </h1>
        <div className="flex items-center gap-1 mt-3">
          <IconAptos />
          <p className="text-xl font-medium text-white">124,0157 APT</p>
        </div>
        <p className="text-center text-sm text-ended max-w-[312px] mt-6">
          It may take a while for your transaction to execute. check your wallet
          fot the status of this transaction
        </p>
      </div>
      <div className="flex flex-col w-full h-full justify-end items-end">
        <ButtonLinear
          onClick={() => router.navigate(-1)}
          className={cn(
            "h-[50px] rounded-2xl text-black-main w-full font-bold"
          )}>
          SEND NOW
        </ButtonLinear>
        <ButtonLinear
          onClick={() => router.navigate(-1)}
          className={cn(
            "h-[50px] rounded-2xl text-[#EAEAEA] w-full font-bold bg-transparent"
          )}>
          DONE
        </ButtonLinear>
      </div>
    </div>
  )
}

export default WithdrawPageStep3

const IconSuccess = (
  <svg
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M65 17V9.93023C65 4.9982 61.0018 1 56.0698 1H49M65 49V56.0698C65 61.0018 61.0018 65 56.0698 65H49M17 65H9.93023C4.9982 65 1 61.0018 1 56.0698V49M1 17V9.93023C1 4.9982 4.9982 1 9.93023 1H17"
      stroke="#2C3634"
      stroke-width="2"
    />
    <g filter="url(#filter0_ii_165_3087)">
      <path
        d="M9.18652 15.8838C9.18652 10.9518 13.1847 6.95361 18.1168 6.95361H47.8842C52.8162 6.95361 56.8144 10.9518 56.8144 15.8838V43.0923C56.8144 46.5765 54.7881 49.7425 51.6242 51.2017L36.7405 58.066C34.3673 59.1605 31.6337 59.1605 29.2605 58.066L14.3768 51.2017C11.2129 49.7425 9.18652 46.5765 9.18652 43.0923V15.8838Z"
        fill="url(#paint0_linear_165_3087)"
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M33 40C28.286 40 25.9289 40 24.4645 38.5355C23 37.0711 23 34.714 23 30C23 25.286 23 22.9289 24.4645 21.4645C25.9289 20 28.286 20 33 20C37.714 20 40.0711 20 41.5355 21.4645C43 22.9289 43 25.286 43 30C43 34.714 43 37.0711 41.5355 38.5355C40.0711 40 37.714 40 33 40ZM37.0303 26.9697C37.3232 27.2626 37.3232 27.7374 37.0303 28.0303L32.0303 33.0303C31.7374 33.3232 31.2626 33.3232 30.9697 33.0303L28.9697 31.0303C28.6768 30.7374 28.6768 30.2626 28.9697 29.9697C29.2626 29.6768 29.7374 29.6768 30.0303 29.9697L31.5 31.4393L35.9697 26.9697C36.2626 26.6768 36.7374 26.6768 37.0303 26.9697Z"
      fill="black"
    />
    <defs>
      <filter
        id="filter0_ii_165_3087"
        x="9.18652"
        y="2.4885"
        width="47.6279"
        height="56.3982"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="4.46512" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_165_3087"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-4.46512" />
        <feGaussianBlur stdDeviation="2.97674" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.137255 0 0 0 0 0.968627 0 0 0 0 0.866667 0 0 0 0.48 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_165_3087"
          result="effect2_innerShadow_165_3087"
        />
      </filter>
      <linearGradient
        id="paint0_linear_165_3087"
        x1="17.0005"
        y1="16.2559"
        x2="43.4328"
        y2="28.2588"
        gradientUnits="userSpaceOnUse">
        <stop stop-color="#23F7DD" />
        <stop offset="1" stop-color="#23F773" />
      </linearGradient>
    </defs>
  </svg>
)
