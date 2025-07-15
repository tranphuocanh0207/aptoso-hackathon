import React from "react"

import ActivityPageList from "./ActivityPageList"

const ActivityPage = () => {
  return (
    <div className="flex flex-col h-full px-4">
      <h1 className="text-xl font-medium text-center">Activity</h1>
      <ActivityPageList />
    </div>
  )
}

export default ActivityPage
