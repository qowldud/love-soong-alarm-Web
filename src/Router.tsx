import { createBrowserRouter } from "react-router-dom";

import { Entry } from "./pages/Entry";
import { Auth } from "./pages/Auth";

import { PrivateLayout } from "./components/PrivateLayout";
import { AuthInput } from "./components/auth/Input";
import { AuthValid } from "./components/auth/Valid";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "/chat/:id",
      },
      {
        path: "/edit",
      },
    ],
  },
]);
