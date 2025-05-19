import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FarmsPage from "./pages/FarmsPage";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farming" element={<FarmsPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;