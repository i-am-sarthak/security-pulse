import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
// import { Articles } from "./components/Articles";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPublicWrapper } from "./pages/DashboardPublicWrapper";
// import { Dashboard } from "./pages/Dashboard";
import { SavedArticles } from "./pages/SavedArticles";
import { ThreatCenter} from "./pages/ThreatCenter";
import { ThreatDetail} from "./pages/ThreatDetail";
import "./index.css"
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // { path: "/", element: <Articles /> },
      { path: "/", element: <DashboardPublicWrapper /> },
      { path: "/dashboard", element: <DashboardPublicWrapper />},
      {
        path: "/saved",
        element: (
          <ProtectedRoute>
            <SavedArticles />
          </ProtectedRoute>
        ),
      },
      { 
        path: "/threat-center",
        element: (
          <ProtectedRoute>
            <ThreatCenter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/threat-center/:slug",
        element: (
          <ProtectedRoute>
            <ThreatDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
