import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-darkBg text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">INF Token</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-pinkBrand">Login</Link>
        <Link to="/dashboard" className="hover:text-pinkBrand">Dashboard</Link>
        <Link to="/admin" className="hover:text-pinkBrand">Admin</Link>
        <Link to="/farming" className="hover:text-pinkBrand">Farms</Link> {/* ← NIEUW */}
      </div>
    </nav>
  );
}
