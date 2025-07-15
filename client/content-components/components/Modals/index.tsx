import { AnimatePresence, motion } from "framer-motion"
import React from "react"

import { cn } from "~utils/lib"

export interface ModalWrapperProps {
  show: boolean
  onClose: () => void
  children?: React.ReactNode
  hiddenCloseIcon?: boolean
  title?: string
}

const ModalWrapper = ({
  show,
  onClose,
  children,
  hiddenCloseIcon = false,
  title = "Title"
}: ModalWrapperProps) => {
  return (
    <div
      className={cn(
        `w-full h-full absolute top-0 right-0 z-50 flex items-center justify-center transition-colors duration-300 ${
          show ? "bg-black/50 visible" : "invisible"
        }`
      )}>
      <AnimatePresence>
        <div
          className={`w-full h-full z-[999] absolute top-0 flex items-center justify-center`}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "max-w-[335px] w-full rounded-[20px] p-5 shadow-custom bg-black-main"
            )}
            initial={{
              opacity: 0,
              scale: 0.75
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15
              }
            }}>
            <div className={cn("flex relative items-center justify-between")}>
              <span className="text-base font-medium text-white">{title}</span>
              {!hiddenCloseIcon && (
                <button
                  onClick={onClose}
                  className="hover:opacity-80 duration-200 cursor-pointer">
                  {IconClose}
                </button>
              )}
            </div>
            {children}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  )
}

export default ModalWrapper

const IconClose = (
  <svg
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      y="0.5"
      width="40"
      height="40"
      rx="20"
      fill="white"
      fillOpacity="0.1"
    />
    <path
      d="M15.7569 15.1962C15.464 14.9033 14.9891 14.9033 14.6962 15.1962C14.4033 15.4891 14.4033 15.964 14.6962 16.2569L18.9389 20.4996L14.6963 24.7422C14.4034 25.0351 14.4034 25.5099 14.6963 25.8028C14.9892 26.0957 15.4641 26.0957 15.7569 25.8028L19.9996 21.5602L24.2422 25.8028C24.5351 26.0957 25.0099 26.0957 25.3028 25.8028C25.5957 25.5099 25.5957 25.0351 25.3028 24.7422L21.0602 20.4996L25.3029 16.2569C25.5958 15.964 25.5958 15.4891 25.3029 15.1962C25.01 14.9033 24.5351 14.9033 24.2422 15.1962L19.9996 19.4389L15.7569 15.1962Z"
      fill="white"
    />
  </svg>
)
