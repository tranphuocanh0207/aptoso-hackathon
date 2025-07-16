import type { TFilterParams } from '~services/campaign/types';

export enum STORAGE_KEY {
  openSidebar = 'aptoso_openSidebar',
  signin_from_popup = 'aptoso_signin_from_popup',
  accessToken = 'aptoso_accessToken',
  refreshToken = 'aptoso_refreshToken',
  password = 'aptoso_password',
  oldPassword = 'aptoso_old_password',
  userInfo = 'aptoso_userInfo',
}

export const authKeys = {
  login: ['login'],
  login_callback: () => [...authKeys.login, 'callback'],
} as const;

export const userKeys = {
  user: ['user'],
  user_wallet_tokens: () => [...userKeys.user, 'tokens'],
} as const;

export const campaignKeys = {
  list: ['list'],
  get_campaign: (params: TFilterParams) => [
    ...campaignKeys.list,
    'campaign-list',
    params,
  ],
} as const;
