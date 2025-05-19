import React, { useState } from "react";
import Button from "./Button";

export default function ROISimulator() {
  const [hashrate, setHashrate] = useState("");
  const [price, setPrice] = useState("");
  const [roi, setRoi] = useState(null);

  const simulate = () => {
    const result = ((parseFloat(hashrate) * parseFloat(price)) / 1000).toFixed(2);
    setRoi(result);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">ROI Simulator</h2>
      <input
        type="number"
        placeholder="Hashrate (TH/s)"
        className="p-2 rounded bg-gray-800 text-white mb-2 w-full"
        value={hashrate}
        onChange={(e) => setHashrate(e.target.value)}
      />
      <input
        type="number"
        placeholder="BTC Price (€)"
        className="p-2 rounded bg-gray-800 text-white mb-4 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button label="Simulate ROI" onClick={simulate} />
      {roi && (
        <div className="mt-4 text-lg text-pinkBrand">
          Estimated ROI: €{roi}
        </div>
      )}
    </div>
  );
}