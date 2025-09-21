import { create } from "zustand";
import type { User } from "../types/User";

interface SelectedUserState {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export const useSelectedUserStore = create<SelectedUserState>()((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
