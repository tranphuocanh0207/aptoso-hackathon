import BN, { BigNumber } from "bignumber.js"
import numeral from "numeral"

export const NUMBER_MIN_SUBSCRIPT = 0.0001

export const unitsUpperCase = {
  thousand: "K",
  million: "M",
  billion: "B",
  trillion: "T"
}

export const isNumber = (value: BigNumber | string | number): boolean => {
  const reg = /^-?\d+\.?\d*$/
  const target = value?.toString()
  return (
    reg.test(target) &&
    !isNaN(parseFloat(target)) &&
    isFinite(parseFloat(target))
  )
}

export const shortenString = (
  value: string,
  prefixLength: number = 6,
  suffixLength: number = 4
) => {
  if (!value) {
    return "---"
  }
  const prefix = value.slice(0, prefixLength)
  const suffix = value.slice(value?.length - suffixLength, value?.length)

  return `${prefix}...${suffix}`
}

export const formatNumber = (
  value: string | number | BN,
  options: Partial<Intl.NumberFormatOptions> = {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  }
) => {
  const newValue = BN(value)

  const formatter = new Intl.NumberFormat("en-US", {
    // currency: 'USD',
    ...options
  })

  return formatter.format(newValue.toNumber())
  // return newValue.toNumber().toLocaleString('en', options)
}

export const convertEnum = <T>(enumObj: T): number[] => {
  return Object.values(enumObj)
    .filter((value) => typeof value === "number")
    .map((value) => value as number)
}

export const shortenNumber = (value: number | string) => {
  const number = !`${value}`.includes("e")
    ? `${value}`
        .split(",")
        .filter((i) => i !== ",")
        .join("")
    : new BN(value).toFixed(0)
  numeral.locale("en")
  if (Number(number) < 1000) {
    return formatNumber(Number(number))
  }

  return numeral(number).format("0,0[.]0a").toUpperCase()
}

export const removeDoubleQuotes = (str) => {
  return str?.replace(/"/g, "") || ""
}

export const formatFromWei = (
  value: string | number | bigint,
  options: Partial<{ decimals: number; isNumber: boolean }> = { decimals: 18 }
) => {
  if (!value) return
  const defaultOptions = { decimals: 18 }
  const _options = { ...defaultOptions, ...options }
  const parsedValue = new BN(Number(value))
  const result = parsedValue
    .div(new BN(10).pow(new BN(_options.decimals)))
    .toFixed(_options.decimals)

  if (_options.isNumber) {
    return Number(result)
  }
  return result
}

export function formatAmountSol(amount, decimals) {
  return (amount / Math.pow(10, decimals)).toFixed(decimals)
}

export const toUnitFormat = (
  value: BigNumber | string | number,
  options: Partial<Intl.NumberFormatOptions> = {
    maximumFractionDigits: 4,
    minimumFractionDigits: 2
  }
): string => {
  if (!isNumber(value)) {
    return "0"
  }
  const bigNumber = BigNumber(value)
  const wholeNumberLength = bigNumber.decimalPlaces(0)?.toString()?.length

  if (wholeNumberLength >= 13)
    return (
      bigNumber.dividedBy(Math.pow(10, 12)).decimalPlaces(2) +
      unitsUpperCase.trillion
    )
  if (wholeNumberLength >= 10)
    return (
      bigNumber.dividedBy(Math.pow(10, 9)).decimalPlaces(2) +
      unitsUpperCase.billion
    )
  if (wholeNumberLength >= 7)
    return (
      bigNumber.dividedBy(Math.pow(10, 6)).decimalPlaces(2) +
      unitsUpperCase.million
    )
  if (wholeNumberLength >= 4)
    return (
      bigNumber.dividedBy(Math.pow(10, 3)).decimalPlaces(2) +
      unitsUpperCase.thousand
    )

  return bigNumber
    .decimalPlaces(2)
    .toNumber()
    .toLocaleString("en", { ...options })
}

export function removeTrailingZeros(value: string) {
  const valueS = String(value)
  return valueS?.replace(/\.?0+$/, "") || ""
}

function countZeros(decimalFraction: string) {
  const scientificNotation = parseFloat(decimalFraction).toExponential()
  const exponent = parseFloat(scientificNotation.split("e")[1])
  return Math.abs(exponent)
}

export function isScientificNotation(str) {
  const regex = /^[+-]?\d+(\.\d+)?[eE][+-]?\d+$/
  return regex.test(str)
}

export function subscriptFormat(number: string | number, starsWith = "0.0000") {
  let numberStr = number?.toString()
  if (isScientificNotation(numberStr)) {
    numberStr = Number(numberStr).toFixed(10)
  }

  if (Number(numberStr) === 0) {
    return "0"
  }

  const numberOfZero = countZeros(numberStr)
  if (numberStr?.[0] !== "0" || !numberStr.startsWith(starsWith)) {
    if (Number(number) < 1) {
      return removeTrailingZeros(
        Number(numberStr).toFixed(Math.min(numberOfZero - 1 + 5, 5))
      )
    } else {
      return removeTrailingZeros(Number(numberStr).toFixed(5))
    }
  }
  if (Number(numberOfZero - 1) > 9) {
    const st = Number(numberOfZero - 1).toString()?.[0]
    const nd = Number(numberOfZero - 1).toString()?.[1]
    return `0.0${String.fromCharCode(8320 + Number(st))}${String.fromCharCode(8320 + Number(nd))}${removeTrailingZeros(numberStr.slice(numberOfZero + 1, numberOfZero + 6))}`
  }
  return `0.0${String.fromCharCode(8320 + Number(numberOfZero - 1))}${removeTrailingZeros(numberStr.slice(numberOfZero + 1, numberOfZero + 6))}`
}

export function compactNumber(number: number, fixed = 4) {
  const n = Number(number)
  if (n <= NUMBER_MIN_SUBSCRIPT) {
    return subscriptFormat(n)
  }

  if (n < 1000) {
    return n > 0 ? removeTrailingZeros(n?.toFixed(fixed)) : n
  } else if (n >= 1000 && n < 1_000_000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  } else if (n >= 1_000_000 && n < 1_000_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  } else if (n >= 1_000_000_000 && n < 1_000_000_000_000) {
    return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"
  } else if (n >= 1_000_000_000_000 && n < 1_000_000_000_000_000) {
    return (n / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "T"
  }
}

export const capitalizeFirstLetterAfterSpace = (str: string) => {
  return str?.replace(/(?:^|\s)\S/g, function (a) {
    return a?.toUpperCase()
  })
}

export function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1)
}

export const numberForActitvity = (num: string | number) => {
  let format
  format = new BigNumber(num)?.toFixed()
  if (Number(format) < 1) {
    return subscriptFormat(format)
  }
  return Number(format).toLocaleString().toString()
}

export function removeComma(numberStr: string) {
  return numberStr?.replace(/,/g, "") || ""
}

export function addComma(numberStr: string) {
  if (Number(removeComma(numberStr)) <= 1) {
    return numberStr
  }
  let parts = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(".")
  if (parts?.length > 1) {
    parts[1] = parts[1].replace(/,/g, "")
  }

  return parts.join(".")
}

export function numberFormatInputForForm(form, type) {
  let capAmount = form
    .watch(type)
    .replaceAll(/[^0-9\.]/g, "")
    .replace(/(.*?\..*?)\./g, "$1")
  form.setValue(type, addComma(capAmount))
}

export const subtractLastDigitOnce = (num) => {
  let decimalString = num.toString().split(".")[1]
  if (decimalString) {
    let lastDigit = parseInt(decimalString[decimalString.length - 1]) - 1
    if (lastDigit < 0) lastDigit = 0
    decimalString = decimalString.slice(0, -1) + lastDigit
    num = parseFloat(num.toString().split(".")[0] + "." + decimalString)
  }
  return String(num)
}

export const flashFormatNumber = (value: number) => {
  if (!value) return "0"

  if (value < 1) {
    const formatted = subscriptFormat(value.toString())
    const parts = formatted.split("₍")

    if (parts.length > 1) {
      // Handle cases like 0.0₄59537
      const mainPart = parts[0]
      const subscriptPart = parts[1].slice(0, -1) // Remove the closing parenthesis
      return `${mainPart}₍${subscriptPart.slice(0, 2)}₎` // Take only first 3 digits of subscript
    } else {
      // Handle cases like 0.00059
      const decimalParts = formatted.split(".")
      if (decimalParts.length > 1) {
        const integerPart = decimalParts[0]
        const decimalPart = decimalParts[1]
        const significantDigits = decimalPart.replace(/^0+/, "").slice(0, 4)
        return `${integerPart}.${decimalPart.slice(0, decimalPart.indexOf(significantDigits) + significantDigits.length)}`
      }
    }
    return formatted
  } else {
    const valueCompact = compactNumber(value)
    const parts = valueCompact.toString().split(".")
    if (parts.length > 1) {
      const decimalPart = parts[1]
      if (decimalPart.length > 4) {
        return `${parts[0]}.${decimalPart.slice(0, 4)}`
      }
    }
    return valueCompact
  }
}

export function formatNumberUsd(num, min = 1, max = 3) {
  const n = Number(num)

  if (isNaN(n) || !isFinite(n)) {
    return "--"
  }

  if (n === NUMBER_MIN_SUBSCRIPT) {
    return `+$${subscriptFormat(n)}`
  }

  if (n === -NUMBER_MIN_SUBSCRIPT) {
    return `$${subscriptFormat(n)}`
  }

  // Sử dụng Intl.NumberFormat để định dạng USD
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: min,
    maximumFractionDigits: max
  })

  if (n < 0) {
    return `-${formatter.format(Math.abs(n))}`
  }

  // Trả về định dạng số USD
  return `+${formatter.format(n)}`
}

export function formatPnL(value, fixed = 2, symbol = "$") {
  const n = Number(value)

  if (n === 0) {
    return `${symbol}0.00`
  } else if (n > 1000000000) {
    return `${symbol}${(n / 1000000000).toFixed(fixed)}B`
  } else if (n > 1000000) {
    return `${symbol}${(n / 1000000).toFixed(fixed)}M`
  } else if (n > 1000) {
    return `${symbol}${(n / 1000).toFixed(fixed)}K`
  } else {
    if (n >= NUMBER_MIN_SUBSCRIPT) {
      return `${symbol}${n.toFixed(fixed)}`
    } else {
      return n < 0
        ? `-${symbol}${subscriptFormat(Math.abs(n))}`
        : `${symbol}${subscriptFormat(n)}`
    }
  }
}

export const convertStringToNumber = (str: string) => {
  if (str === undefined) return 0
  return parseFloat(str ? String(str)?.replace(/,/g, "") : "0")
}
