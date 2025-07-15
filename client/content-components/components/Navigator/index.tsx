import React from "react"
import { Link, useLocation } from "react-router-dom"

import { ERoute } from "~content-components/routes/routes"

import IconActivity from "../Icons/IconActivity"
import IconCampaign from "../Icons/IconCampaign"
import IconMore from "../Icons/IconMore"
import IconWallet from "../Icons/IconWallet"

const menu = [
  {
    icon: IconCampaign,
    title: "Campaigns",
    href: ERoute.Campaigns
  },
  {
    icon: IconWallet,
    title: "Wallet",
    href: ERoute.Wallet
  },
  {
    icon: IconActivity,
    title: "Activity",
    href: ERoute.Activity
  },
  {
    icon: IconMore,
    title: "More",
    href: ERoute.More
  }
]

const Navigator = () => {
  const location = useLocation()

  return (
    <div className="px-[22px] pb-4 fixed bottom-0 z-10 max-w-[400px] w-full duration-200">
      <div className="p-[1.5px] bg-border-navigator rounded-[20px] overflow-hidden w-full">
        <div className="bg-[#191919] flex items-center px-3 py-2 justify-between w-full">
          {menu.map((item) => {
            const Icon = item.icon
            const activeColor =
              location.pathname === `/${item.href}` ? "#23F7DD" : "#6A6C73"

            return (
              <Link
                key={item.title}
                to={item.href}
                className="flex items-center flex-col gap-0.5 duration-200 cursor-pointer">
                <Icon color={activeColor} />
                <span
                  style={{
                    color: activeColor
                  }}
                  className="">
                  {item.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navigator
