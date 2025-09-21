import { create } from "zustand";
import type { User, UserProfile } from "../types/User";

interface SelectedUserState {
  selectedUser: User | null;
  selectedMy: UserProfile | null;
  setSelectedUser: (user: User | null) => void;
  setSelectedMy: (my: UserProfile | null) => void;
  resetSelected: () => void;
}

export const useSelectedUserStore = create<SelectedUserState>()((set) => ({
  selectedUser: null,
  selectedMy: null,
  setSelectedUser: (user) =>
    set({
      selectedUser: user,
      selectedMy: null,
    }),

  setSelectedMy: (my) =>
    set({
      selectedUser: null,
      selectedMy: my,
    }),

  resetSelected: () =>
    set({
      selectedUser: null,
      selectedMy: null,
    }),
}));
