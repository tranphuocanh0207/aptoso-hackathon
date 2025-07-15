import { useCustomStorage } from "~content-components/providers/CustomStorageProvider"

import SidebarContent from "./SidebarContent"
import SidebarIcon from "./SidebarIcon"

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { openSidebar } = useCustomStorage()

  return (
    <>
      {!openSidebar ? (
        <SidebarIcon />
      ) : (
        <SidebarContent>{children}</SidebarContent>
      )}
    </>
  )
}

export default SidebarLayout
