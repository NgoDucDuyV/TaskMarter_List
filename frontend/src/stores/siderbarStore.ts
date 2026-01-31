import { create } from "zustand"
export const siderberStore = create<{ isOpen: boolean; toggle: () => void }>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))