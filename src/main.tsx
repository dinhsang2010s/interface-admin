import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";

import {RouterProvider} from "react-router-dom";
import {Router} from "./routers";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={Router}/>
    </React.StrictMode>
);
