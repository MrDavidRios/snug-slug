import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Login } from "./pages/Login";
import { Test } from "./pages/Test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={App} /> {/* 👈 Renders at /app/ */}
        <Route path="/login" Component={Login} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
