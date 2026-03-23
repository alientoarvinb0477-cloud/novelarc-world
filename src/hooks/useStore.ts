import { create } from 'zustand';

interface StoreState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  // This part just describes the types
  nearDoor: string | null; 
  setMove: (direction: string, value: boolean) => void;
  setNearDoor: (id: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  // 1. Initial Values
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  nearDoor: null,

  // 2. Actions
  setMove: (direction, value) => 
    set((state) => ({ ...state, [direction]: value })),

  setNearDoor: (id) => 
    set({ nearDoor: id }),
}));
