import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "~content-components/providers/AuthProvider"
import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import { ERoute } from "~content-components/routes/routes"
import { cn, getFullPathname } from "~utils/lib"

interface Props {
  onBack?: () => void
  className?: string
  viewRight?: React.ReactNode
  title?: string
  logo?: boolean
  isZoom?: boolean
  titleBack?: string
}

const HeaderCustom = ({
  viewRight,
  className,
  onBack = () => {},
  title,
  logo,
  isZoom = true,
  titleBack
}: Props) => {
  const { logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { setOpenSidebar } = useCustomStorage()

  return (
    <div
      className={cn(
        "h-[72px] flex justify-between items-center px-5",
        className
      )}>
      {logo ? (
        Logo
      ) : (
        <button
          className=" flex items-center gap-3"
          onClick={() => {
            if (location.pathname === getFullPathname(ERoute.SecurePassword)) {
              logout()
              navigate(getFullPathname(ERoute.SignIn))
            } else {
              navigate(-1)
            }
            onBack()
          }}>
          {IconBack}{" "}
          {titleBack && (
            <span className="text-white text-base font-medium">
              {titleBack}
            </span>
          )}
        </button>
      )}
      {title && <span className="text-xl font-medium">{title}</span>}
      {title && !viewRight ? <div className="size-10"></div> : viewRight}
      {isZoom && !viewRight && (
        <button
          onClick={() => setOpenSidebar(false)}
          className="cursor-pointer duration-200">
          {IconZoom}
        </button>
      )}
    </div>
  )
}

export default HeaderCustom

const IconBack = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.1" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.6392 13.9534C18.9104 14.2246 18.9104 14.6643 18.6392 14.9355L14.2692 19.3056H27.4075C27.791 19.3056 28.1019 19.6165 28.1019 20C28.1019 20.3835 27.791 20.6944 27.4075 20.6944H14.2692L18.6392 25.0645C18.9104 25.3357 18.9104 25.7754 18.6392 26.0466C18.368 26.3178 17.9283 26.3178 17.6571 26.0466L12.1016 20.491C11.8304 20.2198 11.8304 19.7802 12.1016 19.509L17.6571 13.9534C17.9283 13.6822 18.368 13.6822 18.6392 13.9534Z"
      fill="white"
    />
  </svg>
)

const Logo = (
  <svg
    width="154"
    height="18"
    viewBox="0 0 154 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.3456 17L19.4323 13.92H7.67227L5.7356 17H0.0422656L10.4256 1.08667H16.7256L27.0856 17H21.3456ZM9.7256 10.63H17.3556L13.5523 4.51667L9.7256 10.63ZM28.0829 17V1.08667H44.0896C48.0096 1.08667 50.7396 2.48667 50.7396 6.75667C50.7396 11.26 48.0096 12.9167 44.0896 12.9167H32.8196V17H28.0829ZM43.5529 5.14667H32.8196V8.88H43.5529C45.0696 8.88 45.8396 8.36667 45.8396 7.01333C45.8396 5.56667 45.0696 5.14667 43.5529 5.14667ZM61.2128 5.14667H51.7628V1.08667H75.3761V5.14667H65.9495V17H61.2128V5.14667ZM89.4687 17.3267C80.3454 17.3267 76.4021 14.7367 76.4021 9.04333C76.4021 3.35 80.3454 0.76 89.4687 0.76C98.5921 0.76 102.535 3.35 102.535 9.04333C102.535 14.7367 98.5921 17.3267 89.4687 17.3267ZM89.4687 13.2667C95.8387 13.2667 97.7054 12.1233 97.7054 9.04333C97.7054 5.96333 95.8387 4.82 89.4687 4.82C83.0754 4.82 81.1387 5.96333 81.1387 9.04333C81.1387 12.1233 83.0754 13.2667 89.4687 13.2667ZM126.067 12.4733C126.067 15.8333 123.78 17.3033 115.917 17.3033C111.95 17.3033 107.353 16.7433 104.483 16.0433L105.16 12.24C108.427 12.9633 112.393 13.5933 117.177 13.5933C120.91 13.5933 121.587 13.29 121.587 12.3333C121.587 11.3533 121.003 11.2367 119.767 11.12L110.97 10.6067C106.023 10.3733 104.227 8.78667 104.227 5.82333C104.227 2.25333 107.353 0.806667 114.727 0.806667C117.55 0.806667 122.147 1.25 125.297 1.92667L124.527 5.49667C121.82 4.96 117.62 4.51667 113.63 4.51667C109.337 4.51667 108.707 4.75 108.707 5.70667C108.707 6.59333 109.313 6.73333 110.76 6.82667L119.44 7.34C124.013 7.59667 126.067 9.18333 126.067 12.4733ZM140.807 17.3267C131.683 17.3267 127.74 14.7367 127.74 9.04333C127.74 3.35 131.683 0.76 140.807 0.76C149.93 0.76 153.873 3.35 153.873 9.04333C153.873 14.7367 149.93 17.3267 140.807 17.3267ZM140.807 13.2667C147.177 13.2667 149.043 12.1233 149.043 9.04333C149.043 5.96333 147.177 4.82 140.807 4.82C134.413 4.82 132.477 5.96333 132.477 9.04333C132.477 12.1233 134.413 13.2667 140.807 13.2667Z"
      fill="white"
    />
  </svg>
)

const IconZoom = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.1" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2398 13.6489C11.5518 13.2849 12.0998 13.2427 12.4638 13.5547L20.0007 20.0149L27.5376 13.5547C27.9016 13.2427 28.4496 13.2849 28.7616 13.6489C29.0736 14.0128 29.0315 14.5609 28.6675 14.8729L20.5656 21.8173C20.2405 22.0959 19.7608 22.0959 19.4358 21.8173L11.3339 14.8729C10.9699 14.5609 10.9278 14.0128 11.2398 13.6489ZM11.2398 18.2785C11.5518 17.9145 12.0998 17.8723 12.4638 18.1843L20.0007 24.6446L27.5376 18.1843C27.9016 17.8723 28.4496 17.9145 28.7616 18.2785C29.0736 18.6425 29.0315 19.1905 28.6675 19.5025L20.5656 26.4469C20.2405 26.7256 19.7608 26.7256 19.4358 26.4469L11.3339 19.5025C10.9699 19.1905 10.9278 18.6425 11.2398 18.2785Z"
      fill="white"
    />
  </svg>
)
