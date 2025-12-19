import { PROJECT_STORAGE_KEY } from "@/app/constants";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type UsePosts = {
  activeMenu: string;
  setActiveMenu: (activeMenu: string) => void;
};

export const usePosts = create<UsePosts>()(
  persist(
    (set) => ({
      activeMenu: "",
      setActiveMenu: (activeMenu) => set({ activeMenu }),
    }),
    {
      name: PROJECT_STORAGE_KEY, // 本地存储的 key
      partialize: (state) => ({ activeMenu: state.activeMenu }), // 只持久化 activeMenu
    } as PersistOptions<UsePosts>
  )
);
