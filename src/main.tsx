import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Login } from "./pages/Login";
import { Root } from "./pages/Root";
import { Test } from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "app", element: <App /> },
      { path: "login", element: <Login /> },
      { path: "test", element: <Test /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
