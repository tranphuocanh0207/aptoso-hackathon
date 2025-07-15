import React from "react"
import { Toaster } from "react-hot-toast"

import { AuthProvider } from "./AuthProvider"
import { CustomStorageProvider } from "./CustomStorageProvider"
import DetectXProvider from "./DetectXProvider"
import ReactQueryProvider from "./ReactQueryProvider"

function ContentProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <CustomStorageProvider>
        <AuthProvider>
          <Toaster
            position="top-center"
            gutter={8}
            containerClassName="break-words"
          />
          <DetectXProvider>{children}</DetectXProvider>
        </AuthProvider>
      </CustomStorageProvider>
    </ReactQueryProvider>
  )
}

export default ContentProvider
