import { Icon } from '@iconify/react'
import { Connection } from '@solana/web3.js'
import { Danger, TickSquare } from 'iconsax-react'
import { useSetAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import type { ToastType } from 'react-hot-toast'

import IconUp from '~assets/icons/IconUp'
import { buySellResultAtom, type IBuySellResultAtom } from '~atoms/buySellResultAtom'
import SwapInfoDisplay from '~components/SwapInfoDisplay'
import { bus, EVENT_BUS } from '~context/DetectTokenProvider/EventsBus'
import { useFetchPriceOnChain } from '~hooks/useFetchPriceOnChain'
import { useGetBalanceByChain } from '~hooks/useGetBalanceByChain'
import useGetExplorer from '~hooks/useGetExplorer'
import { useSwapSolana } from '~hooks/useSwapSolana'
import { useTimer } from '~hooks/useTimer'
import { ChainId, ChainName } from '~libs/constants'
import { balanceTracker, balanceTrackerVault } from '~resources/constants/configInfo'
import { getNextDay, removeTokenNewList, updateTokenNewList } from '~utils/common'
import { convertStringToNumber, formatAmountSol } from '~utils/formatter'
import { cn } from '~utils/lib'
import { getSolanaPrice } from '~utils/prices'

import usePortfolioData from '../SwapPage/components/TradingSection/BuySellTab/usePortfolioData'

type TypeAction = 'success' | 'error' | 'custom'

interface CustomToastProps {
  type: TypeAction
  title?: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean
  onClose?: () => void
  chainId?: number | ChainId
  transactionHash?: string
  actionType?: string
  viewInfo?: React.ReactNode
  responseTransaction?: any
  isVault?: boolean
  percent?: number
}

const message = 'Transaction failed, likely due to low priority fee or balance.'

// NOTE: add another style of it's type if needed
function CustomToastSuccessOrError({
  title,
  description,
  type,
  showIcon = true,
  chainId,
  transactionHash,
  actionType = 'Order',
  viewInfo,
  onClose = () => {},
  responseTransaction,
  isVault,
  percent
}: CustomToastProps) {
  const [typeS, setTypeS] = useState<TypeAction>(type)
  const { count } = useTimer(type === 'custom' ? 30 : 0)
  const [resAfterLoading, setResAfterLoading] = useState<any>()
  const { getAmountOut } = useSwapSolana()
  const { userBalance, userBalanceVault } = useGetBalanceByChain()
  const { _getPriceWithChainIdAndAddress } = useFetchPriceOnChain()
  const { fetchActivePosition } = usePortfolioData()
  const setBuySellResult = useSetAtom(buySellResultAtom)

  const { getExplorerString } = useGetExplorer()
  const divRef = useRef(null)

  const renderIcon = (type: ToastType) => {
    const icon = {
      success: <TickSquare size="22" color="#16C784" variant="Bold" />,
      error: <Danger size="22" color="#EA3943" variant="Bold" />,
      custom: (
        <Icon
          icon="bitcoin-icons:confirmations-4-filled"
          className="animate-spin"
          fontSize={20}
          color="#F7BD4C"
        />
      )
    }

    return icon[type] ?? null
  }

  const onUpdateBalanceAfterLoading = (data: any) => {
    const { tokenDetect, amountOut, gasFee, amountIn, solanaPrice, isBuy } = data
    const balanceNeedUpdate = isVault ? userBalanceVault : userBalance
    const tracker = isVault ? balanceTrackerVault : balanceTracker

    if (isBuy) {
      const isNew = updateTokenNewList(
        {
          address: tokenDetect?.baseToken?.address,
          chainId: Number(tokenDetect?.chainNumber),
          boughtAt: getNextDay()
        },
        isVault ? 'token_vault_new_list' : 'token_wallet_new_list'
      )

      tracker.updateBalance(
        'sol',
        ChainId.SOLANA,
        balanceNeedUpdate,
        tokenDetect.baseToken.address,
        '+',
        {
          ...tokenDetect,
          rawBalance: convertStringToNumber(amountOut),
          nativePrice: solanaPrice,
          isNew
        }
      )

      const balanceAfter = tracker.updateBalance(
        'sol',
        ChainId.SOLANA,
        balanceNeedUpdate,
        ChainName.SOLANA,
        '-',
        {
          ...tokenDetect,
          rawBalance: convertStringToNumber(gasFee) + convertStringToNumber(amountIn),
          nativePrice: solanaPrice
        },
        true
      )

      bus.emit(EVENT_BUS.UPDATE_BALANCE, {
        balanceAfter,
        isVault
      })
    } else {
      tracker.updateBalance(
        'sol',
        ChainId.SOLANA,
        balanceNeedUpdate,
        tokenDetect?.baseToken?.address,
        '-',
        {
          ...tokenDetect,
          rawBalance:
            Number(percent) === 100
              ? convertStringToNumber(amountIn) + 0.1
              : convertStringToNumber(amountIn),
          nativePrice: solanaPrice
        }
      )

      const balanceAfter = tracker.updateBalance(
        'sol',
        ChainId.SOLANA,
        balanceNeedUpdate,
        ChainName.SOLANA,
        '+',
        {
          ...tokenDetect,
          rawBalance: convertStringToNumber(amountOut) - convertStringToNumber(gasFee),
          nativePrice: solanaPrice
        },
        true
      )
      bus.emit(EVENT_BUS.UPDATE_BALANCE, {
        balanceAfter,
        isVault
      })

      removeTokenNewList(
        {
          address: tokenDetect?.baseToken?.address,
          chainId: Number(tokenDetect?.chainNumber),
          boughtAt: Date.now()
        },
        isVault ? 'token_vault_new_list' : 'token_wallet_new_list'
      )
    }
  }

  useEffect(() => {
    const tokenDetect = responseTransaction?.tokenDetect
    const isBuy = actionType?.toLowerCase() === 'buy'

    const buySellResultDefault: IBuySellResultAtom = {
      index: tokenDetect?.index,
      isShow: true,
      gasNativeFee: '',
      inputAmount: '',
      outputAmount: '',
      gasFee: '',
      transaction: responseTransaction?.txid || transactionHash,
      type: isBuy ? 'Buy' : 'Sell',
      error: null,
      altPriceUsd: responseTransaction?.altPriceUsd,
      nativePriceUsd: responseTransaction?.nativePriceUsd,
      isVault
    }

    const getTransactionReceipt = async () => {
      const connection = new Connection(process.env.PLASMO_PUBLIC_SOL_RPC, {
        commitment: 'processed'
      })
      const response = await connection.getTransaction(
        responseTransaction?.txid || transactionHash,
        {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0
        }
      )

      const recieptData = {
        ...response,
        txid: responseTransaction?.txid || transactionHash
      }

      if (response) {
        const resAmount = getAmountOut(
          recieptData,
          responseTransaction?.outputMint,
          responseTransaction?.userAddress,
          false
        )

        if (resAmount?.gasFee !== '0' && Number(resAmount?.gasFee) > 0) {
          setTypeS('success')
          const amountIn = formatAmountSol(
            responseTransaction?.inAmount,
            isBuy ? tokenDetect?.quoteToken?.decimals : tokenDetect?.baseToken?.decimals
          )
          const data = {
            ...responseTransaction,
            amountIn,
            ...resAmount
          }
          setResAfterLoading(data)

          const [solanaPrice, tokenPrice] = await Promise.all([
            getSolanaPrice(),
            _getPriceWithChainIdAndAddress(ChainId.SOLANA, tokenDetect?.baseToken?.address)
          ])

          const dataCreate: IBuySellResultAtom = {
            ...buySellResultDefault,
            index: tokenDetect?.index,
            isShow: true,
            gasNativeFee: String(resAmount?.gasFee || 0),
            solanaPrice,
            inputAmount: amountIn,
            outputAmount: String(resAmount?.amountOut),
            gasFee: String(resAmount?.gasFee || 0),
            transaction: responseTransaction?.txid || transactionHash,
            type: isBuy ? 'Buy' : 'Sell',
            error: {
              message: 'success'
            },
            altPriceUsd: Number(tokenPrice || tokenDetect?.priceUsd),
            nativePriceUsd: solanaPrice || responseTransaction?.nativePriceUsd,
            isVault
          }

          setBuySellResult(dataCreate)
          fetchActivePosition(dataCreate)
          onUpdateBalanceAfterLoading({ ...data, solanaPrice, tokenPrice, isBuy, isVault })
        } else {
          setTypeS('error')
          setBuySellResult({
            ...buySellResultDefault,
            error: {
              message
            }
          })
          setResAfterLoading({
            amountOut: 0,
            error: {
              message
            }
          })
          setTimeout(() => {
            divRef?.current?.remove()
          }, 8000)
        }
      } else {
        setTypeS('error')
        setBuySellResult({
          ...buySellResultDefault,
          error: {
            message
          }
        })
        setResAfterLoading({
          amountOut: 0,
          error: {
            message
          }
        })
        setTimeout(() => {
          divRef?.current?.remove()
        }, 8000)
      }
    }

    if (typeS === 'custom') {
      if (count === 2 && (transactionHash || responseTransaction?.txid)) {
        getTransactionReceipt()
      } else {
        setTypeS('error')
        setBuySellResult({
          ...buySellResultDefault,
          error: {
            message
          }
        })
        setResAfterLoading({
          amountOut: 0,
          error: {
            message
          }
        })
        setTimeout(() => {
          divRef?.current?.remove()
        }, 8000)
      }
    }
  }, [
    typeS,
    count,
    transactionHash,
    responseTransaction,
    actionType,
    userBalanceVault,
    balanceTracker,
    balanceTrackerVault,
    userBalance,
    percent
  ])

  useEffect(() => {
    let timer: any

    if (divRef?.current && type !== 'custom') {
      timer = setTimeout(() => {
        divRef?.current?.remove()
      }, 15000)
    }

    if (resAfterLoading && type === 'custom') {
      timer = setTimeout(() => {
        divRef?.current?.remove()
      }, 10000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [divRef?.current, type, resAfterLoading])

  return (
    <div
      ref={divRef}
      className={cn(
        'bg-[#050318] z-[9999999] p-[10px] rounded-lg shadow-lg border border-[#050318]',
        'flex items-center justify-between relative',
        'w-auto min-w-[338px]',
        'pointer-events-auto',
        typeS === 'error' && 'border-[#EA3943]',
        typeS === 'success' && 'border-[#16C784]',
        typeS === 'custom' && 'border-[#F7BD4C]'
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1 items-center">
            {showIcon && renderIcon(typeS)}
            <div
              className={cn(
                'text-white text-base font-medium',
                typeS === 'error' && 'text-[#EA3943]',
                typeS === 'success' && 'text-[#16C784]',
                typeS === 'custom' && 'text-yellow-pending text-sm'
              )}
            >
              {typeS === 'custom'
                ? `Sending transaction ${count}s`
                : title ||
                  (typeS === 'error' ? `${actionType} Error` : `${actionType} Successfully`)}
            </div>
          </div>

          {(viewInfo || description || resAfterLoading?.error?.message) &&
            count < 2 &&
            (Number(resAfterLoading?.amountOut) > 0 ? (
              <SwapInfoDisplay
                type={actionType?.toLowerCase() as any}
                amount={resAfterLoading?.amountIn}
                token={resAfterLoading?.tokenDetect}
                amountOut={resAfterLoading?.amountOut}
              />
            ) : (
              <div className={cn('flex flex-col gap-1')}>
                {(description || resAfterLoading?.error?.message) && (
                  <div className="text-white/60 text-xs font-normal max-w-60">
                    {description || resAfterLoading?.error?.message}
                  </div>
                )}
                {viewInfo}
              </div>
            ))}

          {count > 2 && responseTransaction?.meta?.err && (
            <div className="text-white/60 text-xs font-normal max-w-60">
              {responseTransaction?.meta?.err?.message ||
                responseTransaction?.meta?.err?.toString()}
            </div>
          )}

          {transactionHash && (
            <div className="flex flex-row items-center gap-1">
              <a
                target="_blank"
                href={getExplorerString(chainId, transactionHash)}
                className="text-[#2ECEF1] text-xs flex flex-row gap-1 items-center"
              >
                <span>View on block explorer</span>
                <IconUp />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center absolute top-[10px] right-[10px]">
        <div
          onClick={() => {
            onClose()
            divRef?.current?.remove()
          }}
          className="cursor-pointer hover:text-[#ffcccc] hover:scale-110 transition-transform duration-200"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 11L1 1" stroke="#828291" strokeWidth="1.25" strokeLinecap="round" />
            <path d="M1 11L11 1" stroke="#828291" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CustomToastSuccessOrError
