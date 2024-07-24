import { create } from "zustand";

interface State {
  step: number;
  setStep: (nextStep: number) => void;
}

export const useCurrentPageStep = create<State>((set) => ({
  step: 1,
  setStep: (n) => set({ step: n }),
}));
