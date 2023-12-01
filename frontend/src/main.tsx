import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import { Root } from "./pages/Root";
import { Login } from "./pages/login/Login";
import { Marketplace } from "./pages/marketplace/Marketplace";
import { Test } from "./pages/test-pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "login", element: <Login /> },
      { path: "test", element: <Test /> },
      { path: "marketplace", element: <Marketplace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "AIzaSyBsQUBHpzIJaP_LkFJ3zbK1noaXm6AW-V4",
  authDomain: "snug-slug.firebaseapp.com",
  projectId: "snug-slug",
  storageBucket: "snug-slug.appspot.com",
  messagingSenderId: "163151861781",
  appId: "1:163151861781:web:e4178a60ced44bc514d61c",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
initializeApp(firebaseConfig);
