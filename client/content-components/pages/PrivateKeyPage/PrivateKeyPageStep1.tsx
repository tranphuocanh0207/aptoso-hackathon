import React from "react"
import { useBoolean } from "react-use"

import ButtonLinear from "~content-components/components/Buttons/ButtonLinear"
import IconAttention from "~content-components/components/Icons/IconAttention"
import ModalConfirmPassword from "~content-components/components/Modals/ModalConfirmPassword"
import { cn } from "~utils/lib"

const IconKeyA = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C4.13525 10.1379 3.40931 10.348 2.87868 10.8787C2 11.7574 2 13.1716 2 16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16C22 13.1716 22 11.7574 21.1213 10.8787C20.2426 10 18.8284 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16Z"
      fill="#FEC163"
    />
  </svg>
)

const IconPersonA = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
      fill="#FEC163"
    />
  </svg>
)

const IconSecurityKeyA = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.5 10.25C7.5335 10.25 6.75 11.0335 6.75 12C6.75 12.9665 7.5335 13.75 8.5 13.75C9.4665 13.75 10.25 12.9665 10.25 12C10.25 11.0335 9.4665 10.25 8.5 10.25Z"
      fill="#FEC163"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM11.663 11.25C11.3245 9.81665 10.0368 8.75 8.5 8.75C6.70507 8.75 5.25 10.2051 5.25 12C5.25 13.7949 6.70507 15.25 8.5 15.25C10.0368 15.25 11.3245 14.1834 11.663 12.75H14.75V13.5C14.75 13.9142 15.0858 14.25 15.5 14.25C15.9142 14.25 16.25 13.9142 16.25 13.5V12.75H17C17.1381 12.75 17.25 12.8619 17.25 13V14C17.25 14.4142 17.5858 14.75 18 14.75C18.4142 14.75 18.75 14.4142 18.75 14V13C18.75 12.0335 17.9665 11.25 17 11.25H11.663Z"
      fill="#FEC163"
    />
  </svg>
)

interface Props {
  step: number
  onNextSTep?: () => void
}

const data = [
  {
    icon: IconKeyA,
    description:
      "Your private key acts as a master password, giving you full control over your blockchain assets."
  },
  {
    icon: IconPersonA,
    description:
      "It is crucial that you are the sole keeper of your private key."
  },
  {
    icon: IconSecurityKeyA,
    description:
      "To ensure the safety and security of your assets, it is important that you keep your private key confidential and never disclose it to anyone, including SkyMavis."
  }
]

const PrivateKeyPageStep1 = ({ step, onNextSTep = () => {} }: Props) => {
  const [showModalConfirm, setShowModalConfirm] = useBoolean(false)
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 h-full">
        <IconAttention />
        <h1 className="text-xl font-semibold text-pending">Attention</h1>
        <p className="text-sm text-center text-pending max-w-[300px]">
          Please read the following carefully before viewing your privakey
        </p>

        <div className="flex flex-col rounded-2xl bg-[#FFFFFF0D]">
          {data.map((item, index) => (
            <div
              key={index}
              className={cn("flex items-start w-full p-4 justify-start gap-4", {
                "border-b border-b-white/10": index <= 1
              })}>
              <div className="size-6 mt-1">{item.icon}</div>
              <p className="text-sm text-white">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="justify-end items-end flex w-full h-full pb-[31px]">
          <ButtonLinear
            onClick={setShowModalConfirm}
            className="w-full mt-6 text-center text-black-main">
            Proceed
          </ButtonLinear>
        </div>
      </div>

      {showModalConfirm && (
        <ModalConfirmPassword
          show={showModalConfirm}
          onClose={setShowModalConfirm}
          onConfirm={onNextSTep}
        />
      )}
    </>
  )
}

export default PrivateKeyPageStep1
