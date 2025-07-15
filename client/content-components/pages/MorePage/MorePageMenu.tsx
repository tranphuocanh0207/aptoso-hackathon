import IconHelp from "data-base64:~assets/icons/help.svg"
import IconInfo from "data-base64:~assets/icons/info.svg"
import IconLanguage from "data-base64:~assets/icons/language.svg"
import IconManage from "data-base64:~assets/icons/manage.svg"
import IconSecurity from "data-base64:~assets/icons/security.svg"
import IconSquareArrow from "data-base64:~assets/icons/square-arrow.svg"
import React from "react"

import IconSlider from "~content-components/components/Icons/IconSlider"
import { useAuth } from "~content-components/providers/AuthProvider"
import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import { getFullPathname } from "~utils/lib"

const menu1 = [
  {
    key: "account",
    logo: IconManage,
    title: "Reveal Private  Key",
    href: ERoute.PrivateKey
  },
  {
    key: "language",
    logo: IconLanguage,
    title: "Languages",
    href: ""
  },
  {
    key: "sec",
    logo: IconSecurity,
    title: "Security & privacy",
    href: ERoute.SecurityAndPrivacy
  }
]

const menu2 = [
  {
    key: "help",
    logo: IconHelp,
    title: "Help & support",
    href: ""
  },
  {
    key: "about",
    logo: IconInfo,
    title: "About",
    href: ""
  }
]

const MorePageMenu = () => {
  const { logout } = useAuth()
  const renderItemMenu = (item: any) => (
    <div
      key={item.key}
      onClick={() => {
        if (item.href) router.navigate(getFullPathname(item.href))
      }}
      className="flex flex-row justify-between w-full items-center cursor-pointer duration-200 hover:scale-[1.02]">
      <div className="flex items-center gap-2">
        <img src={item.logo} alt="logo" className="size-5" />
        <span className="text-sm font-medium">{item.title}</span>
      </div>

      <div className="flex items-center gap-1">
        {item.key === "language" && (
          <p className="text-ended text-sm font-medium">English</p>
        )}

        {item.key === "help" ? (
          <img src={IconSquareArrow} alt="logo" className="size-5" />
        ) : (
          <IconSlider />
        )}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="bg-[#FFFFFF0D] p-4 rounded-2xl flex flex-col gap-2.5">
        {menu1.map((item) => renderItemMenu(item))}
      </div>

      <div className="bg-[#FFFFFF0D] p-4 rounded-2xl flex flex-col gap-2.5">
        {menu2.map((item) => renderItemMenu(item))}
      </div>
      <div className="w-auto">
        <button
          onClick={logout}
          className="px-4 py-2 flex w-auto items-center gap-2 cursor-pointer duration-200 hover:scale-[1.02]">
          {IconLogout}
          <span className="text-sm font-medium text-red ">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default MorePageMenu

const IconLogout = (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.00146 5.16659C6.00954 3.71657 6.07384 2.93129 6.58609 2.41904C7.17188 1.83325 8.11469 1.83325 10.0003 1.83325L10.667 1.83325C12.5526 1.83325 13.4954 1.83325 14.0812 2.41904C14.667 3.00482 14.667 3.94763 14.667 5.83325L14.667 11.1666C14.667 13.0522 14.667 13.995 14.0812 14.5808C13.4954 15.1666 12.5526 15.1666 10.667 15.1666L10.0003 15.1666C8.11469 15.1666 7.17188 15.1666 6.58609 14.5808C6.07384 14.0685 6.00954 13.2833 6.00146 11.8333"
      stroke="#FF4D4F"
      strokeLinecap="round"
    />
    <path
      d="M10 8.5L1.33333 8.5M1.33333 8.5L3.66667 6.5M1.33333 8.5L3.66667 10.5"
      stroke="#FF4D4F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
