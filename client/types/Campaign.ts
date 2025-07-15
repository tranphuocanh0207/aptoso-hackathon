export enum CampaignAction {
  LIKE = "Like",
  RETWEET = "Retweet",
  COMMENT = "Comment",
  FOLLOW = "Follow"
}

export type CampaignItem = {
  startDate: string
  endDate: string
  status: string
  description: string
  users: number
  token: number
  tokenSymbol: string
  missions: any[]
  statusNumber: number
}
