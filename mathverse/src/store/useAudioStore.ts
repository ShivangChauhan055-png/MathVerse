import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AudioState {
  musicOn: boolean
  sfxOn: boolean
  volume: number
  setMusicOn: (on: boolean) => void
  setSfxOn: (on: boolean) => void
  setVolume: (vol: number) => void
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      musicOn: true,
      sfxOn: true,
      volume: 0.5,
      setMusicOn: (on) => set({ musicOn: on }),
      setSfxOn: (on) => set({ sfxOn: on }),
      setVolume: (vol) => set({ volume: vol }),
    }),
    {
      name: 'mathverse-audio',
    }
  )
)
