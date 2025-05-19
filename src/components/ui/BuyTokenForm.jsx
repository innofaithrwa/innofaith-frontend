import React, { useState } from "react";

export default function BuyTokenForm() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const api = "http://localhost:8000";

  const handleBuy = async () => {
    try {
      const res = await fetch(`${api}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      setMessage(data.message || "Buy request submitted.");
    } catch {
      setMessage("Error processing buy request.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-pinkBrand to-blueBrand text-black p-6 rounded-2xl shadow-glow animate-pulse-slow border-4 border-white/10">
      <h2 className="text-3xl font-extrabold text-center mb-4 tracking-tight drop-shadow">
        Buy INF Tokens
      </h2>
      <p className="text-center text-sm text-black/80 mb-6">
        Secure your INF now and be part of the mining revolution.
      </p>
      <input
        type="text"
        placeholder="Your Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full mb-3 p-3 rounded bg-white/80 text-black placeholder-black border border-white"
      />
      <input
        type="number"
        placeholder="Amount to Buy"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-white/80 text-black placeholder-black border border-white"
      />
      <button
        onClick={handleBuy}
        className="w-full py-3 bg-black text-white font-bold text-lg rounded hover:bg-pinkBrand transition-all shadow-lg shadow-pinkBrand/50"
      >
        BUY NOW 🔥
      </button>
      {message && (
        <p className="text-center text-sm mt-4 text-black/80">
          {message}
        </p>
      )}
    </div>
  );
}