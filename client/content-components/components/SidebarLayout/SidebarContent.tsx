import type React from "react"
import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useBoolean } from "react-use"

import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"
import { ERoute } from "~content-components/routes/routes"
import { cn, getFullPathname } from "~utils/lib"

import HeaderCustom from "../Header/HeaderCustom"
import Navigator from "../Navigator"

const hiddenRoutes = [
  ERoute.SignIn,
  ERoute.SecurePassword,
  ERoute.Deposit,
  ERoute.Withdraw,
  ERoute.ChangePassword,
  ERoute.PrivateKey,
  ERoute.SecurityAndPrivacy
]

function SidebarContent({ children }: { children: React.ReactNode }) {
  const { openSidebar } = useCustomStorage()
  const location = useLocation()
  const [showNavigator, setShowNavigator] = useBoolean(false)

  const background = useMemo(() => {
    const isBackground17 =
      location.pathname !== getFullPathname(ERoute.SignIn) &&
      location.pathname !== getFullPathname(ERoute.SecurePassword)
    return isBackground17 ? "bg-[#171717]" : "bg-[#000000]"
  }, [location.pathname])

  useEffect(() => {
    if (
      location?.pathname.split("/")?.length > 0 &&
      hiddenRoutes.includes(location?.pathname.split("/")[1] as ERoute)
    ) {
      setShowNavigator(false)
    } else {
      setShowNavigator(true)
    }
  }, [location])

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 h-screen flex flex-col bg-[#000000] overflow-hidden",
        "w-[400px] transition-all duration-300 ease-in-out tran shadow-custom rounded-s-2xl border-1 border-[#FFFFFF1F] flex flex-col",
        background,
        {
          hidden: !openSidebar
        }
      )}>
      <HeaderCustom logo />
      {showNavigator && <Navigator />}
      {children}
    </div>
  )
}

export default SidebarContent
