import clsx, { type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  classGroups: {
    "font-size": ["text-xxs"]
  }
} as any)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFullPathname = (pathname: string) => {
  return `/${pathname}`
}

export const getColorStatus = (status: string) => {
  switch (status) {
    case "Completed":
      return "text-ended"
    case "Live":
      return "text-live"
    case "Pending":
      return "text-pending"
    default:
      return "text-ended"
  }
}

export const compareStrings = (stringA: string, stringB: string) => {
  const wordsA = stringA.split(" ")
  const wordsB = stringB.split(" ")

  const setA = new Set(wordsA)
  const setB = new Set(wordsB)

  const commonWords = [...setA].filter((word) => setB.has(word))

  const totalWords = Math.max(wordsA.length, wordsB.length)
  const similarityPercentage = (commonWords.length / totalWords) * 100

  return similarityPercentage >= 50
}
