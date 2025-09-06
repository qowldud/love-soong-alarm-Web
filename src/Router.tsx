import { createBrowserRouter } from "react-router-dom";

import { Entry } from "./pages/Entry";
import { Auth } from "./pages/Auth";

import { PrivateLayout } from "./components/PrivateLayout";
import { AuthInput } from "./components/auth/Input";
import { AuthValid } from "./components/auth/Valid";

import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Layout } from "./components/Layout";
import { ChatLayout } from "./components/chat/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Entry />,
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "input",
            element: <AuthInput />,
          },
          {
            path: "valid",
            element: <AuthValid />,
          },
        ],
      },
      {
        path: "/signup",
      },
      {
        path: "/help",
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
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
