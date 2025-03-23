import { create } from 'zustand'

const useWalletStore = create((set) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
  client: null,
  setClient: (client) => set({ client }),
}))

export default useWalletStore;