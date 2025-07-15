export type TUser = {
  username: string
  avatar: string
  createdAt: number
  fullName: string
  isDeleted: boolean
  role: string
  updatedAt: number
  userId: string
  wallet: {
    address: string
  }
}

export type IUserBalance = {
  address: string
  name: string
  symbol: string
  decimals: number
  rawAmount: number
}
