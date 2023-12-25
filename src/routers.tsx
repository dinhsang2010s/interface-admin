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
        path: "categories",
        element: <Category />,
      },
      {
        path: "posts",
        element: <Post />,
      },
      {
        path: "users",
        element: <div>dsadas</div>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
