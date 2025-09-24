import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { UserProfile } from "../types/User";
import { useApi } from "../api/api";
import mixpanel from "mixpanel-browser";
import { requestPermission } from "../firebase/FCM";

export const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { getData } = useApi();

  const getMy = async () => {
    try {
      const res = await getData<UserProfile>("/api/users/me");
      const userId = res.data.userId;

      mixpanel.track("SignUp");
      mixpanel.identify(String(userId));
    } catch (err) {
      console.error(err);
      navigate("/splash");
    }
  };

  useEffect(() => {
    const isRegistered = searchParams.get("isRegistered");
    const accessToken = searchParams.get("access_token");

    if (!accessToken) {
      navigate("/");
      return;
    }

    const handleLoginFlow = async () => {
      if (isRegistered === "true") {
        login(accessToken);

        await requestPermission();

        getMy().finally(() => {
          navigate("/splash");
        });
      } else {
        localStorage.setItem("accessToken", accessToken);
        navigate("/onboarding/profile");
      }
    };

    handleLoginFlow();
  }, [searchParams, navigate, login]);
  return null;
};
