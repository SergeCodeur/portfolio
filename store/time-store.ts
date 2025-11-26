import { create } from "zustand";

interface TimeStore {
  currentTime: string;
  updateTime: () => void;
  startInterval: () => void;
  stopInterval: () => void;
}

let intervalId: NodeJS.Timeout | null = null;

export const useTimeStore = create<TimeStore>((set) => ({
  currentTime: "",
  updateTime: () => {
    set({
      currentTime: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  },
  startInterval: () => {
    // Mise à jour immédiate
    set({
      currentTime: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    // Mise à jour toutes les secondes
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      set({
        currentTime: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }, 1000);
  },
  stopInterval: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
}));

