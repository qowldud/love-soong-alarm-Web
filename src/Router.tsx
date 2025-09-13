import { createBrowserRouter } from "react-router-dom";

import { Redirect } from "./pages/Redirect";

import { PrivateLayout } from "./components/PrivateLayout";
import { Onboarding_Profile } from "./pages/onboarding/Onboarding_Profile";
import { Onboarding_Extra } from "./pages/onboarding/Onboarding_Extra";
import { Onboarding_Interests } from "./pages/onboarding/Onboarding_Interests";
import { Onboarding_Preference } from "./pages/onboarding/Onboarding_Preference";
import { EditPage } from "./pages/EditPage";
import { TermsPage } from "./pages/TermsPage";

import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Layout } from "./components/Layout";
import { ChatLayout } from "./components/chat/Layout";
import { Coin } from "./pages/Coin";
import { Setting } from "./pages/Setting";
import { Alarm } from "./pages/Alarm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
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
        path: "/term",
        element: <TermsPage />,
      },
      {
        path: "/edit",
        element: <EditPage />,
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/redirect",
            element: <Redirect />,
          },
          {
            path: "/coin",
            element: <Coin />,
          },
          {
            path: "/alarm",
            element: <Alarm />,
          },
          {
            path: "/setting",
            element: <Setting />,
          },
          {
            path: "/chat",
            element: <ChatLayout />,
            children: [
              {
                path: ":id",
                element: <Chat />,
              },
            ],
          },
          {
            path: "/edit",
          },
        ],
      },
    ],
  },
]);
