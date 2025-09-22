import { create } from "zustand";

interface SelectedUserState {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  resetSelected: () => void;
}

export const useSelectedUserStore = create<SelectedUserState>()((set) => ({
  selectedUserId: null,

  setSelectedUserId: (id) => set({ selectedUserId: id }),

  resetSelected: () => set({ selectedUserId: null }),
}));
