import { createMemoryRouter } from "react-router-dom"

import { Layout } from "~content-components/components/Layout"
import ActivityPage from "~content-components/pages/ActivityPage"
import CampaignsPage from "~content-components/pages/CampaignsPage"
import ChangePasswordPage from "~content-components/pages/ChangePasswordPage"
import DepositPage from "~content-components/pages/DepositPage"
import MorePage from "~content-components/pages/MorePage"
import PrivateKeyPage from "~content-components/pages/PrivateKeyPage"
import SecurePassword from "~content-components/pages/SecurePasswordPage"
import SecurityAndPrivacyPage from "~content-components/pages/SecurityAndPrivacyPage"
import SignInPage from "~content-components/pages/SignInPage"
import WalletPage from "~content-components/pages/WalletPage"
import WithdrawPage from "~content-components/pages/WithdrawPage"

import { ERoute } from "./routes"

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: ERoute.SignIn, element: <SignInPage /> },
        { path: ERoute.SecurePassword, element: <SecurePassword /> },
        { path: ERoute.Campaigns, element: <CampaignsPage /> },
        { path: ERoute.Wallet, element: <WalletPage /> },
        { path: ERoute.Withdraw, element: <WithdrawPage /> },
        { path: ERoute.Deposit, element: <DepositPage /> },
        { path: ERoute.Activity, element: <ActivityPage /> },
        { path: ERoute.More, element: <MorePage /> },
        {
          path: ERoute.SecurityAndPrivacy,
          element: <SecurityAndPrivacyPage />
        },
        { path: ERoute.ChangePassword, element: <ChangePasswordPage /> },
        { path: ERoute.PrivateKey, element: <PrivateKeyPage /> }
      ]
    }
  ],
  { initialIndex: 0, initialEntries: [`/${ERoute.SignIn}`] }
)

export default router
