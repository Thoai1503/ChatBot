import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import BeginLayout from "./pages/BeginLayout";
import Register from "./pages/Register";
import Service from "./pages/Service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/chat",
        element: <Navigate to="/" />,
      },
      { path: "/", element: <Chat /> },
      {
        path: "chat/service",
        element: <Service />,
      },
    ],
  },
  {
    path: "/",
    element: <BeginLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
