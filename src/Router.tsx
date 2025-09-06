import { createBrowserRouter } from "react-router-dom";
import { Test } from "./pages/Test";
import { PrivateLayout } from "./components/PrivateLayout";
import { Onboarding_Profile } from "./pages/onboarding/Onboarding_Profile";
import { Onboarding_Extra } from "./pages/onboarding/Onboarding_Extra";
import { Onboarding_Interests } from "./pages/onboarding/Onboarding_Interests";
import { Onboarding_Preference } from "./pages/onboarding/Onboarding_Preference";
import { EditPage } from "./pages/EditPage";

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
    path: "/onboarding/preference",
    element: <Onboarding_Preference />,
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
        element: <EditPage />,
      },
    ],
  },
]);
