import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";

import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Router } from "./routers";
import { theme } from "./styles/config-antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={Router} />
    </ConfigProvider>
  </React.StrictMode>
);