import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Category, Dashboard, Post } from "./pages";
import Login from "./pages/Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "user",
        element: <div>dsadas</div>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
