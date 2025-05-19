import React, { useState } from "react";

export default function SellTokenForm() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const api = "http://localhost:8000";

  const handleSell = async () => {
    try {
      const res = await fetch(`${api}/sell`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      setMessage(data.message || "Sell request submitted.");
    } catch {
      setMessage("Error processing sell request.");
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-blueBrand/20 rounded-xl p-6 shadow-glow">
      <h2 className="text-xl font-semibold text-blueBrand mb-4">Sell INF Tokens</h2>
      <input
        type="text"
        placeholder="Your Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-[#222] border border-blueBrand/20"
      />
      <input
        type="number"
        placeholder="Amount to Sell"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-[#222] border border-blueBrand/20"
      />
      <button
        onClick={handleSell}
        className="bg-blueBrand px-4 py-2 rounded shadow-glow hover:bg-pinkBrand transition"
      >
        Submit Sell Request
      </button>
      {message && <p className="text-sm mt-3 text-gray-300">{message}</p>}
    </div>
  );
}