import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import FaceExpression from "./features/expression/pages/expresion";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <FaceExpression />,
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
