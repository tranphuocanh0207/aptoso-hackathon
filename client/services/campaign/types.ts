export type TFilterParams = {
  page: number
  limit: number
  type?: string
  status?: string
}

export type IUserCampaignItem = {
  campaignId: string
  keywords: string
  status: string
  title: string
  description: string
  link: string
  userName: string | null
  type: "PostQuest" | string
  actions: ("Comment" | "Like" | "Follow" | string)[]
  userActions: string[]
  userClaimed: boolean
  rewardPerUser: number
  maxParticipants: number
  totalTokenReward: number
  userJoined: number
  rewardLeft: number
  isLike: boolean
  isComment: boolean
  isFollow: boolean
  completedAt: number
  startDate: number
  endDate: number
}

export type ICampaignDataUpdate = {
  campaignId: string
  completedAction: string[]
  completedAt: number
}

export type ICampaignOverview = {
  totalCampaign: number
  totalReward: number
  totalUserJoined: number
}
