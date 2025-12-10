"use client";
import { PROJECT_STORAGE_KEY } from "@/app/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserInfo = create(
  persist(
    (set) => ({
      project: "dark",
    }),
    {
      name: PROJECT_STORAGE_KEY,
    }
  )
);
