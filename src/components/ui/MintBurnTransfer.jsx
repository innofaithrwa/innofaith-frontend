import React, { useState } from "react";
import Button from "./Button";

export default function MintBurnTransfer() {
  const [amount, setAmount] = useState("");

  const handleMint = async () => {
    await fetch("http://localhost:8000/mint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });
  };

  const handleBurn = async () => {
    await fetch("http://localhost:8000/burn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });
  };

  const handleTransfer = async () => {
    await fetch("http://localhost:8000/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "admin",
        to: "user1",
        amount: parseFloat(amount),
      }),
    });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Token Controls</h2>
      <input
        type="number"
        className="p-2 rounded bg-gray-800 text-white mb-4 w-full"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex gap-4">
        <Button label="Mint" onClick={handleMint} />
        <Button label="Burn" onClick={handleBurn} />
        <Button label="Transfer" onClick={handleTransfer} />
      </div>
    </div>
  );
}