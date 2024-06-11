import { create } from "zustand";

interface NavbarStatusState {
  isOpen: boolean;
  changeStatus: (isOpen: boolean) => void;
}

export const useNavbarStatus = create<NavbarStatusState>((set) => ({
  isOpen: true,
  changeStatus: (isOpen) => set({ isOpen }),
}));
