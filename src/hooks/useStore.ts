import { create } from 'zustand';

interface GameState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  setMove: (direction: string, value: boolean) => void;
}

export const useStore = create<GameState>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  setMove: (direction, value) => set((state) => ({ [direction]: value })),
}));
