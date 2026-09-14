export const WALLET_TOP_UPS = { 50: 5000, 100: 10000, 250: 25000, 500: 50000 } as const
export type WalletTopUp = keyof typeof WALLET_TOP_UPS
