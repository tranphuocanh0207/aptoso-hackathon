import { memo, type FC } from "react"

import { Outlet } from "~node_modules/react-router-dom/dist"

import SidebarLayout from "../SidebarLayout"

export const Layout: FC = memo(() => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
})
