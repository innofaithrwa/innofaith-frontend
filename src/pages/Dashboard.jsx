import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { useNavigate } from "react-router-dom";

import BuyTokenForm from "../components/ui/BuyTokenForm";
import {
  getBalance,
  getTreasury,
  getSystemCheck,
  buyTokens,
  sellTokens,
} from "../api/api";

export default function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(null);
  const [emission, setEmission] = useState({ multiplier: null, source: "" });
  const [tokenInfo, setTokenInfo] = useState(null);
  const [treasury, setTreasury] = useState(null);
  const [system, setSystem] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const api = "http://localhost:8000";

  useEffect(() => {
    const w = localStorage.getItem("wallet");
    if (!w) {
      navigate("/");
      return;
    }

    setWallet(w);

    fetch(`${api}/balance/${w}`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance));

    fetch(`${api}/emission/status`)
      .then((res) => res.json())
      .then((data) => setEmission(data));

    fetch(`${api}/stats`)
      .then((res) => res.json())
      .then((data) => setTokenInfo(data));

    getTreasury().then((data) => setTreasury(data.balance));
    getSystemCheck().then((data) => setSystem(data.status));

    setMessage("Live data loaded.");
  }, []);

  return (
    <div className="bg-darkBg min-h-screen text-white font-sans">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
        <BuyTokenForm />

        <div className="bg-[#1a1a1a] border border-pinkBrand/30 rounded-2xl p-6 shadow-glow space-y-6">
          <h2 className="text-2xl font-bold text-pinkBrand mb-2">Your INF Overview</h2>

          <div className="bg-black/30 p-4 rounded border border-pinkBrand/20 space-y-2">
            <h3 className="text-lg text-blueBrand font-semibold mb-1">Wallet Info</h3>
            <p>Wallet: <span className="text-white font-mono">{wallet}</span></p>
            {balance !== null && (
              <p>Balance: <strong className="text-pinkBrand">{balance} INF</strong></p>
            )}
          </div>

          {tokenInfo && (
            <div className="bg-gradient-to-br from-pinkBrand to-blueBrand text-black p-4 rounded-lg shadow-glow space-y-1">
              <h3 className="text-lg font-semibold">Token Statistics</h3>
              <p>Total Supply: <strong>{tokenInfo.total_supply}</strong></p>
              <p>Circulating: <strong>{tokenInfo.circulating_supply}</strong></p>
              <p>Treasury: <strong>{tokenInfo.treasury_balance}</strong></p>
              <p>Burned: <strong>{tokenInfo.burned}</strong></p>
            </div>
          )}

          {emission.multiplier && (
            <div className="bg-[#0f0f0f] p-4 rounded border border-blueBrand/20">
              <h3 className="text-lg text-blueBrand font-semibold mb-1">Emission</h3>
              <p>Multiplier: <strong>{emission.multiplier}</strong></p>
              <p className="text-sm text-gray-400">Source: {emission.source}</p>
            </div>
          )}

          {system && (
            <div className="bg-black/30 p-4 rounded border border-blueBrand/20 text-sm text-gray-300 space-y-1">
              <h3 className="text-blueBrand text-lg font-semibold mb-1">System Health</h3>
              <p>Health Score: {system.health_score}</p>
              <p>Sell Pressure: {system.sell_pressure}</p>
              <p>Loyalty Avg: {system.avg_loyalty}%</p>
              <p>ROI Avg: {system.avg_roi}%</p>
            </div>
          )}

          {message && (
            <p className="text-sm text-green-400 pt-2">{message}</p>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("wallet");
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow w-full"
          >
            Logout Wallet
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
