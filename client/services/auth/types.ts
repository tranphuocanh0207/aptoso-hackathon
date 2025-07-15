export type LoginPayload = {
  username: string
  password: string
}

export type RegisterPayload = {
  username: string
  password: string
  email: string
  fullName?: string

  usdtAddress?: string
  telegramUsername?: string
  telegramUID?: string
}

export type TLoginResponse = {
  message: string
  token: string
  user: any
}
