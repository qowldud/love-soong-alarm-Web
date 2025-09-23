import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const isRegistered = searchParams.get("isRegistered");
    const accessToken = searchParams.get("access_token");

    if (!accessToken) {
      navigate("/");
      return;
    }

    if (isRegistered === "true") {
      login(accessToken);
      navigate("/splash");
    } else {
      localStorage.setItem("accessToken", accessToken);
      navigate("/onboarding/profile");
    }
  }, [searchParams, navigate, login]);
  return null;
};
