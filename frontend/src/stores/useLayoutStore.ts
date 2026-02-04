import { create } from "zustand"
export const siderberStore = create<{ isOpen: boolean; toggle: () => void }>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
export const userLayoutStore = create<{ collapsed: boolean; toggleCollapse: () => void; isLoading: boolean; setLoading: (isLoading: boolean) => void }>((set) => ({
    isLoading: false,
    collapsed: false,
    toggleCollapse: () => set((state) => ({ collapsed: !state.collapsed })),
    setLoading: (isLoading: boolean) => set({ isLoading }),
}))