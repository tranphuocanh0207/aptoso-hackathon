import React from "react"

import { userWalletQuery } from "~query/user"

import WalletPageAddressInfo from "./WalletPageAddressInfo"
import WalletPageTokens from "./WalletPageTokens"

const WalletPage = () => {
  const { tokens, query, loading } = userWalletQuery()

  return (
    <div className="flex flex-col h-full px-4">
      <WalletPageAddressInfo refetch={query.refetch} loading={loading} />
      <WalletPageTokens tokens={tokens} />
    </div>
  )
}

export default WalletPage
