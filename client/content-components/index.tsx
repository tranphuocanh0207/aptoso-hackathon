import { Suspense, useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"

import ContentProvider from "./providers"
import router from "./routes"

const ContentRouter = () => {
  return (
    <Suspense fallback={<div>Loading route....</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

function ContentComponent() {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return loaded ? (
    <ContentProvider>
      {/* <Toaster position="top-center" gutter={8} containerClassName="break-words" /> */}
      <ContentRouter />
    </ContentProvider>
  ) : null
}

export default ContentComponent
