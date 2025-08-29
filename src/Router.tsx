import { createBrowserRouter } from "react-router-dom";
import { Test } from "./pages/Test";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Test />,
      },
      {
        path: "/signup",
      },
      {
        path: "/help",
      },
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
