import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Layout from "./Components/Layout";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "signup",
      element: (
        <Layout>
          <SignUp />
        </Layout>
      ),
    },
    {
      path: "login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },

    {
      path: "*",
      element: <Navigate to={user ? "/" : "/login"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
