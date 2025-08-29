import { createBrowserRouter } from "react-router-dom";
import { Test } from "./pages/Test";
import { PrivateLayout } from "./components/PrivateLayout";

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
