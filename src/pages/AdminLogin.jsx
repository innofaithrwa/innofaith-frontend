import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    const adminKey = prompt("Enter admin key"); // tijdelijke toegangscode
    if (adminKey === "infadmin2025") {
      localStorage.setItem("admin_token", "yes");
      navigate("/admin");
    } else {
      setError("Unauthorized");
    }
  };

  return (
    <div className="text-white text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">INF Admin Login</h1>
      <button
        onClick={handleAdminLogin}
        className="bg-pinkBrand hover:bg-blueBrand px-6 py-3 rounded shadow-glow"
        disabled={loading}
      >
        Login as Admin
      </button>
      {error && <p className="mt-4 text-red-400 font-semibold mt-4">{error}</p>}
    </div>
  );
}