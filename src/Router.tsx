import { createBrowserRouter } from "react-router-dom";

import { PrivateLayout } from "./components/PrivateLayout";
import { Entry } from "./pages/Entry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
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
