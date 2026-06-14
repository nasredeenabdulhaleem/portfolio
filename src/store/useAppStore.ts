import { create } from 'zustand'

interface AppState {
  commandPaletteOpen: boolean
  activeSection: string
  stats: {
    years: number
    projects: number
    visitors: number
  }
  setCommandPaletteOpen: (open: boolean) => void
  setActiveSection: (section: string) => void
  updateStats: (stats: Partial<AppState['stats']>) => void
}

export const useAppStore = create<AppState>((set) => ({
  commandPaletteOpen: false,
  activeSection: 'hero',
  stats: {
    years: 5,
    projects: 30,
    visitors: 0,
  },
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  updateStats: (stats) => set((state) => ({ stats: { ...state.stats, ...stats } })),
}))
