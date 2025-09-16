import { create } from "zustand";

type CategoryState = {
  activeId: number;
  setActiveId: (id: number) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  activeId: 1,
  setActiveId: (id) => set({ activeId: id }),
}));
