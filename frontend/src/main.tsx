import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./components/UserContext";
import { Root } from "./pages/Root";
import { FAQPage } from "./pages/faq/FAQPage";
import { Inbox } from "./pages/inbox/Inbox";
import { ListingPage } from "./pages/listing/ListingPage";
import { Login } from "./pages/login/Login";
import { Marketplace } from "./pages/marketplace/Marketplace";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { SavedPlaces } from "./pages/saved-places/SavedPlaces";
import { InboxTest } from "./pages/test-pages/InboxTest";
import { Test } from "./pages/test-pages/Test";
import "./styles/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "login", element: <Login /> },
      { path: "test", element: <Test /> },
      { path: "inbox-test", element: <InboxTest /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "saved-places", element: <SavedPlaces /> },
      { path: "inbox", element: <Inbox /> },
      { path: "faq", element: <FAQPage /> },
      { path: "listing", element: <ListingPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
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
