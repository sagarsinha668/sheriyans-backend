import { createBrowserRouter } from "react-router";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Dashboard from "./feature/chat/page/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
