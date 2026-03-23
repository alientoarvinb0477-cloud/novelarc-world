import { create } from 'zustand';

interface GameState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  setMove: (direction: string, value: boolean) => void;
  // Add these to your Zustand store interface/state
nearDoor: null as string | null, // Stores the ID of the house you're near
setNearDoor: (id: string | null) => set({ nearDoor: id }),
interact: () => { /* We will handle the logic in the component */ },
}

export const useStore = create<GameState>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  setMove: (direction, value) => set((state) => ({ ...state, [direction]: value })),
}));
