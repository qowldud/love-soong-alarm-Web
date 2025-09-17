import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isRegistered = searchParams.get("isRegistered");
    const accessToken = searchParams.get("access_token");

    if (!accessToken) {
      console.error("엑세스 토큰 없음");
      navigate("/");
      return;
    }

    localStorage.setItem("accessToken", accessToken);

    if (isRegistered === "true") {
      navigate("/splash");
    } else {
      navigate("/onboarding/profile");
    }
  }, [searchParams, navigate]);
  return <></>;
};
