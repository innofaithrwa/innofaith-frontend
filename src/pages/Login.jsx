import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("window.ethereum is:", window.ethereum);
  }, []);

  const handleBtcLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Simulatie: gebruiker voert BTC adres in (later: signature flow)
      const btcAddress = prompt("Enter your BTC wallet address");
      if (!btcAddress) throw new Error("No address provided");

      setAddress(btcAddress);
      localStorage.setItem("wallet", btcAddress);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to INF</h1>
      <button
        onClick={handleBtcLogin}
        className="bg-pinkBrand hover:bg-blueBrand px-6 py-3 rounded shadow-glow"
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect BTC Wallet"}
      </button>

      {address && (
        <p className="mt-4 text-green-400">Connected ✔ {address}</p>
      )}

      {error && <p className="mt-4 text-red-400 font-semibold">Error: {error}</p>}
    </div>
  );
}