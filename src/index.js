import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <div className="d-flex w-100 vh-100">
        <Navbar />
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="d-flex w-100 vh-100">
        <Navbar />
        <Register />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
