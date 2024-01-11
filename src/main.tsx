import ReactDOM from "react-dom/client";
import "./index.less";

import {RouterProvider} from "react-router-dom";
import {Router} from "./routers";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={Router}/>
);
