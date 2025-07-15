import React from "react"

import HeaderCustom from "~content-components/components/Header/HeaderCustom"
import IconSlider from "~content-components/components/Icons/IconSlider"
import router from "~content-components/routes"
import { ERoute } from "~content-components/routes/routes"
import { getFullPathname } from "~utils/lib"

const menu1 = [
  {
    key: "auto-lock",
    title: "Auto-Lock",
    href: ""
  },
  {
    key: "change-password",
    title: "Change Password",
    href: ERoute.ChangePassword
  }
]

const SecurityAndPrivacyPage = () => {
  const renderItemMenu = (item: any) => (
    <div
      key={item.key}
      onClick={() => {
        if (item.href) router.navigate(getFullPathname(item.href))
      }}
      className=" rounded-xl py-2 px-3 min-h-[42px] flex flex-row justify-between w-full items-center cursor-pointer duration-200 hover:scale-[1.02] bg-[#FFFFFF0D]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{item.title}</span>
      </div>

      <div className="flex items-center gap-1">
        {item.key === "auto-lock" && (
          <p className="text-ended text-sm font-medium">30 minutes</p>
        )}
        <IconSlider />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col px-4 gap-4 h-full">
      <HeaderCustom
        title="Security & Privacy"
        isZoom={false}
        className="px-0 h-auto"
      />
      <div className="rounded-2xl flex flex-col gap-3">
        {menu1.map((item) => renderItemMenu(item))}
      </div>
      <p className="text-sm font-medium text-[#8B98A5]">
        Note: The wallet will automatically lock itself once the browser session
        expires (i.e.,when you close the browser).
      </p>
    </div>
  )
}

export default SecurityAndPrivacyPage
