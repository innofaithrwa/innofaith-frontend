// 💠 NIEUW STIJLVOL DASHBOARD MET TAILWIND CSS
import React, { useState, useEffect } from "react";
import FarmOverview from "./components/FarmOverview";


export default function TokenDashboard() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emission, setEmission] = useState({ multiplier: null, source: "" });
  const [roiInput, setRoiInput] = useState({
    btc_price: "",
    electricity_cost: "",
    farm_hashrate: "",
    reward_per_th: ""
  });
  const [roiResult, setRoiResult] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  const api = "http://localhost:8000";

  useEffect(() => {
    const fetchEmission = async () => {
      try {
        const res = await fetch(`${api}/emission/status`);
        const data = await res.json();
        setEmission(data);
      } catch (err) {
        console.error("Emission status ophalen mislukt");
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(`${api}/stats`);
        const data = await res.json();
        setTokenInfo(data.token);
      } catch (err) {
        console.error("Token stats ophalen mislukt");
      }
    };

    fetchEmission();
    fetchStats();
  }, []);

  const getBalance = async () => {
    if (!wallet) {
      setError("Walletadres ontbreekt.");
      return;
    }

    try {
      const url = `${api}/balance/${wallet}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Netwerkfout");
      const data = await res.json();
      setBalance(data.balance);
      setError("");
    } catch (err) {
      setError("Fout bij ophalen van balans.");
    }
  };

  const mint = async () => {
    if (!wallet || !amount) return;
    try {
      const res = await fetch(`${api}/mint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, amount: parseInt(amount) }),
      });
      const data = await res.json();
      setMessage(data.message);
      setError("");
      getBalance();
    } catch (err) {
      setError("Fout bij minten.");
    }
  };

  const burn = async () => {
    if (!wallet || !amount) return;
    try {
      const res = await fetch(`${api}/burn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, amount: parseInt(amount) }),
      });
      const data = await res.json();
      setMessage(data.message);
      setError("");
      getBalance();
    } catch (err) {
      setError("Fout bij burnen.");
    }
  };

  const transfer = async () => {
    if (!wallet || !receiver || !amount) return;
    try {
      const res = await fetch(`${api}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: wallet, receiver, amount: parseInt(amount) }),
      });
      const data = await res.json();
      setMessage(data.message);
      setError("");
      getBalance();
    } catch (err) {
      setError("Fout bij transfer.");
    }
  };

  const simulateROI = async () => {
    try {
      const res = await fetch(`${api}/roi/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          btc_price: parseFloat(roiInput.btc_price),
          electricity_cost: parseFloat(roiInput.electricity_cost),
          farm_hashrate: parseFloat(roiInput.farm_hashrate),
          reward_per_th: parseFloat(roiInput.reward_per_th)
        })
      });
      const data = await res.json();
      setRoiResult(data);
      setEmission(data.new_emission_multiplier);
      setError("");
    } catch (err) {
      setError("Fout bij ROI simulatie.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans text-white bg-darkBg min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-pinkBrand drop-shadow-glow tracking-wide">Innofaith Token Dashboard</h1>

      {tokenInfo && (
        <div className="bg-gradient-to-r from-pinkBrand to-blueBrand p-6 rounded-3xl mb-8 shadow-glow text-black">
          <strong className="text-lg">{tokenInfo.name} ({tokenInfo.symbol})</strong><br />
          Max supply: {tokenInfo.max_supply.toLocaleString()}<br />
          Decimals: {tokenInfo.decimals}
        </div>
      )}

      {emission.multiplier && (
        <div className="bg-[#1e1e1e] p-5 rounded-2xl mb-6 border border-pinkBrand/30 shadow-md">
          <strong>Emission Multiplier:</strong> {emission.multiplier} <br />
          <em>Source:</em> {emission.source}
        </div>
      )}

      <div className="grid gap-4">
        <input className="p-2 rounded-lg bg-[#222] border border-pinkBrand/20 focus:outline-none focus:ring-2 focus:ring-pinkBrand transition" placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} />
        <button className="bg-pink-500 hover:bg-pink-600 rounded px-4 py-2" onClick={getBalance}>Check Balance</button>
        {balance !== null && <div><strong>Balance:</strong> {balance}</div>}

        <input className="p-2 rounded-lg bg-[#222] border border-pinkBrand/20 focus:outline-none focus:ring-2 focus:ring-pinkBrand transition" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2" onClick={mint}>Mint</button>
          <button className="bg-red-500 hover:bg-red-600 rounded px-4 py-2" onClick={burn}>Burn</button>
        </div>

        <input className="p-2 rounded-lg bg-[#222] border border-pinkBrand/20 focus:outline-none focus:ring-2 focus:ring-pinkBrand transition" placeholder="Receiver Address" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
        <button className="bg-purple-500 hover:bg-purple-600 rounded px-4 py-2" onClick={transfer}>Transfer</button>
      </div>

      {message && <div className="mt-4 p-2 bg-green-800 rounded-xl">{message}</div>}
      {error && <div className="mt-4 p-2 bg-red-800 rounded-xl">{error}</div>}

      <hr className="my-10 border-gray-700" />

      <h2 className="text-2xl font-bold mb-6 text-blueBrand">ROI Simulator</h2>
      <p className="mb-4">Vul mining parameters in om ROI te berekenen en automatisch de emission multiplier aan te passen.</p>

      {Object.keys(roiInput).map((field) => (
        <input
          key={field}
          type="number"
          placeholder={field.replace("_", " ")}
          value={roiInput[field]}
          onChange={(e) => setRoiInput({ ...roiInput, [field]: e.target.value })}
          className="p-2 rounded bg-gray-900 border border-gray-700 mb-2 w-full"
        />
      ))}
      <button className="bg-blueBrand hover:bg-pinkBrand text-black font-semibold px-4 py-2 rounded-lg shadow-glow transition" onClick={simulateROI}>Simuleer ROI</button>

      {roiResult && (
        <div className="mt-6 bg-gray-800 p-4 rounded-xl">
          <strong>ROI:</strong> {roiResult.roi}%<br />
          <strong>Inkomsten per dag:</strong> ${roiResult.daily_income_usd}<br />
          <strong>Kosten per dag:</strong> ${roiResult.daily_cost_usd}<br />
          <strong>Nieuwe multiplier:</strong> {roiResult.new_emission_multiplier.multiplier} <em>({roiResult.new_emission_multiplier.source})</em>
        </div>
      )}

      <hr className="my-10 border-gray-700" />

      <FarmOverview />
    </div>
  );
}
