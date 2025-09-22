import { createBrowserRouter } from "react-router-dom";

import { Redirect } from "./pages/Redirect";

import { PrivateLayout } from "./components/Layout/PrivateLayout";
import { Onboarding_Profile } from "./pages/onboarding/Onboarding_Profile";
import { Onboarding_Extra } from "./pages/onboarding/Onboarding_Extra";
import { Onboarding_Interests } from "./pages/onboarding/Onboarding_Interests";
import { Onboarding_Preference } from "./pages/onboarding/Onboarding_Preference";
import { EditPage } from "./pages/EditPage";
import { TermsPage } from "./pages/TermsPage";

import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Layout } from "./components/Layout/Layout";
import { ChatLayout } from "./components/chat/Layout";
import { Coin } from "./pages/Coin";
import { Setting } from "./pages/Setting";
import { Alarm } from "./pages/Alarm";
import {
  AlarmLoader,
  ChatLoader,
  CoinLoader,
  HomeLoader,
} from "./hooks/loader";
import { CoinCallback } from "./pages/CoinCallback";
import { Splash } from "./pages/Splash";
import { SocketLayout } from "./components/Layout/SocketLayout";
import { LocationGuide } from "./pages/LocationGuide";
import { CancelPayment } from "./pages/CancelPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        path: "/onboarding/preference/:step",
        element: <Onboarding_Preference />,
      },
      {
        path: "/guide",
        element: <LocationGuide />,
      },
      {
        path: "/splash",
        element: <Splash />,
      },
      {
        path: "/term",
        element: <TermsPage />,
      },
      {
        path: "/redirect",
        element: <Redirect />,
      },
      {
        path: "/preview",
      },
      {
        element: <SocketLayout />,
        children: [
          {
            path: "",
            element: <Home />,
            loader: HomeLoader,
          },

          {
            element: <PrivateLayout />,
            children: [
              {
                path: "/coin",
                element: <Coin />,
                loader: CoinLoader,
              },
              {
                path: "/coin/callback",
                element: <CoinCallback />,
              },
              {
                path: "/coin/cancel/callback",
                element: <CancelPayment />,
              },

              {
                path: "/alarm",
                element: <Alarm />,
                loader: AlarmLoader,
              },
              {
                path: "/setting",
                element: <Setting />,
              },
              {
                path: "/chat",
                element: <ChatLayout />,
                loader: ChatLoader,
                children: [
                  {
                    path: ":chatRoomId",
                    element: <Chat />,
                  },
                ],
              },
              {
                path: "/edit",
                element: <EditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
