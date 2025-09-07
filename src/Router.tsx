import { createBrowserRouter } from "react-router-dom";

import { Redirect } from "./pages/Redirect";

import { PrivateLayout } from "./components/PrivateLayout";

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
        element: <Home />,
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
            path: "/redirect",
            element: <Redirect />,
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
