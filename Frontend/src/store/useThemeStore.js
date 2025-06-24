import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("baat-chit theme")||"forest",
  setTheme: (newTheme) =>{
    localStorage.setItem("baat-chit theme", newTheme);
    set({ theme: newTheme })
  },
}));


