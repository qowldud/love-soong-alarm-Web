import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  telNumber: number | null;

  validationNumber: (phoneNumber: number) => boolean;
  sendMessage: () => Promise<void>;
  validationAuth: (replyNumber: number) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isWelcomeModalOpen: false,
      telNumber: null,

      validationNumber: (phoneNumber: number) => {
        const phone = phoneNumber.toString();
        const phoneRegex = /^010\d{8}$/;

        if (phoneRegex.test(phone)) set({ telNumber: phoneNumber });

        return phoneRegex.test(phone);
      },

      sendMessage: async () => {
        // TODO : phoneNumber로 메세지 보내는 로직
        // 재전송도 여기서
      },

      validationAuth: async () => {
        // TODO : auth 인증하는 로직

        return false;
      },
    }),

    {
      name: "auth-store",
      partialize: (state) => ({
        telNumber: state.telNumber,
      }),
    }
  )
);
