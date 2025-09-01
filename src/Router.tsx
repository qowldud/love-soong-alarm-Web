import { createBrowserRouter } from "react-router-dom";
import { Test } from "./pages/Test";
import { PrivateLayout } from "./components/PrivateLayout";
import { Onboarding_Profile } from "./pages/Onboarding_Profile";

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
