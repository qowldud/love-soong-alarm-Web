import { createBrowserRouter } from "react-router-dom";
import { Test } from "./pages/Test";
import { PrivateLayout } from "./components/PrivateLayout";
import { Onboarding_Profile } from "./pages/Onboarding_Profile";
import { Onboarding_Extra } from "./pages/Onboarding_Extra";
import { Onboarding_Interests } from "./pages/Onboarding_Interests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/signup",
  },
  {
    path: "/help",
  },
  {
    path: "/onboarding/profile",
    element: <Onboarding_Profile />,
  },
  {
    path: "/onboarding/extra",
    element: <Onboarding_Extra />,
  },
  {
    path: "/onboarding/interests",
    element: <Onboarding_Interests />,
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/home",
      },
      {
        path: "/chat/:id",
      },
      {
        path: "/edit",
      },
    ],
  },
]);
