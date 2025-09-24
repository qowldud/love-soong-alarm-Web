// import { messaging } from "./firebase-config";
// import { getToken, onMessage } from "firebase/messaging";

// export const requestPermission = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//     });
//     if (token) {
//       console.log("✅ FCM Token:", token);
//       localStorage.setItem("fcmToken", token);
//       return token;
//     } else {
//       console.warn("🛑 FCM Token not received");
//     }
//   } catch (err) {
//     console.error("🔥 Error getting FCM token", err);
//   }
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

import { getToken } from "firebase/messaging";
import { axiosInstance } from "../api/api";
import { messaging } from "./firebase-config";

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log("📌 FCM Token:", token);
      localStorage.setItem("fcmToken", token);
      await sendTokenToServer(token); // ✅ 서버 전송 추가
      return token;
    } else {
      console.warn("🛑 FCM Token not received");
    }
  } catch (err) {
    console.error("🔥 Error getting FCM token", err);
  }
};

const sendTokenToServer = async (token: string) => {
  try {
    await axiosInstance.post("/api/fcm/token", {
      fcmToken: token,
      deviceType: "WEB",
    });
    console.log("✅ FCM 토큰 서버 전송 완료");
  } catch (err) {
    console.error("❌ FCM 토큰 서버 전송 실패", err);
  }
};
