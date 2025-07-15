import { create } from "zustand"

interface TokenResolved {
  symbol: string
  value: number
}

interface TokenStore {
  resolvedTokens: TokenResolved[]
  targetCount: number
  setTargetCount: (count: number) => void
  addResolvedToken: (token: TokenResolved) => void
  reset: () => void
  total: number
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  resolvedTokens: [],
  total: 0,
  targetCount: 0,

  setTargetCount: (count) => set({ targetCount: count }),

  addResolvedToken: (token) => {
    const { resolvedTokens, targetCount } = get()

    // Nếu token đã có thì bỏ qua
    if (resolvedTokens.find((t) => t.symbol === token.symbol)) return

    const updated = [...resolvedTokens, token]

    // Nếu đủ số lượng rồi thì tính tổng
    if (updated.length === targetCount) {
      const total = updated.reduce((sum, t) => sum + t.value, 0)
      set({ total, resolvedTokens: updated })
    } else {
      set({ resolvedTokens: updated })
    }
  },

  reset: () => set({ resolvedTokens: [], total: 0, targetCount: 0 })
}))
