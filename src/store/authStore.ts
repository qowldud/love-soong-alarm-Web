import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  loginType: "chat" | "edit";
  isModalOpen: boolean;
  isMemberOutOpen: boolean;
  isLogoutOpen: boolean;
  isAuth: boolean;

  setIsModalOpen: (args: { flag: boolean; type?: "chat" | "edit" }) => void;
  setModalOpen: (flag: boolean) => void;
  setIsMemberOutOpen: (flag: boolean) => void;
  setIsLogoutOpen: (flag: boolean) => void;
  setReset: () => void;
  setAuth: (flag: boolean) => void;

  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginType: "edit",
      isModalOpen: false,
      isMemberOutOpen: false,
      isLogoutOpen: false,
      isAuth: false,

      setIsModalOpen: ({ flag, type }) =>
        set((s) => ({
          isModalOpen: flag,
          loginType: type ?? s.loginType,
        })),
      setModalOpen: (flag) => set({ isModalOpen: flag }),

      setIsMemberOutOpen: (flag) => set({ isMemberOutOpen: flag }),
      setIsLogoutOpen: (flag) => set({ isLogoutOpen: flag }),
      setReset: () =>
        set({
          isModalOpen: false,
          isMemberOutOpen: false,
          isLogoutOpen: false,
        }),

      setAuth: (flag) => set({ isAuth: flag }),

      login: (token) => {
        localStorage.setItem("accessToken", token);
        set({ isAuth: true });
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        set({ isAuth: false });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ isAuth: s.isAuth, loginType: s.loginType }),
    }
  )
);

/* 
  LEGACY: 휴대전화 메세지로 인증
*/

// interface AuthState {
//   telNumber: number | null;

//   validationNumber: (phoneNumber: number) => boolean;
//   sendMessage: () => Promise<void>;
//   validationAuth: (replyNumber: number) => Promise<boolean>;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       isWelcomeModalOpen: false,
//       telNumber: null,

//       validationNumber: (phoneNumber: number) => {
//         const phone = phoneNumber.toString();
//         const phoneRegex = /^010\d{8}$/;

//         if (phoneRegex.test(phone)) set({ telNumber: phoneNumber });

//         return phoneRegex.test(phone);
//       },

//       sendMessage: async () => {
//         // TODO : phoneNumber로 메세지 보내는 로직
//         // 재전송도 여기서
//       },

//       validationAuth: async () => {
//         // TODO : auth 인증하는 로직

//         return false;
//       },
//     }),

//     {
//       name: "auth-store",
//       partialize: (state) => ({
//         telNumber: state.telNumber,
//       }),
//     }
//   )
// );
