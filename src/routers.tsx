import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {Category, Dashboard, Article} from "./pages";
import Login from "./pages/Login";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "Dashboard",
                element: <Dashboard/>,
            },
            {
                path: "categories",
                element: <Category/>,
            },
            {
                path: "articles",
                element: <Article/>,
            },
            {
                path: "users",
                element: <div>
                </div>,
            },
        ],
    },
    {
        path: "login",
        element: <Login/>,
    },
]);
