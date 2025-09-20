import { LoggedInView } from "../components/home/view/LoggedInView";
import { LoggedOutView } from "../components/home/view/LoggedOutView";
import { useAuthStore } from "../store/authStore";

export const Home = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  console.log(isAuth);
  return isAuth ? <LoggedInView /> : <LoggedOutView />;
};
