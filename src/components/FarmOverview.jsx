import React, { useEffect, useState } from "react";

export default function FarmOverview() {
  const [farms, setFarms] = useState({});
  const [roiData, setRoiData] = useState({});
  const [error, setError] = useState("");

  const api = "http://localhost:8000";

  useEffect(() => {
    const fetchFarmsAndRoi = async () => {
      try {
        const res = await fetch(`${api}/farms`);
        const data = await res.json();
        setFarms(data);

        // Voor elke farm ROI ophalen
        Object.keys(data).forEach(async (id) => {
          try {
            const roiRes = await fetch(`${api}/farms/roi/${id}`);
            const roi = await roiRes.json();
            setRoiData((prev) => ({ ...prev, [id]: roi }));
          } catch {
            setRoiData((prev) => ({ ...prev, [id]: { error: true } }));
          }
        });
      } catch (err) {
        setError("Kan farms niet ophalen.");
      }
    };

    fetchFarmsAndRoi();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Mining Farms</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {Object.keys(farms).length === 0 && <p>Geen farms geregistreerd.</p>}

      {Object.entries(farms).map(([id, farm]) => {
        const roi = roiData[id];

        return (
          <div key={id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <strong>{farm.name}</strong> ({farm.status})<br />
            📍 <em>{farm.location}</em><br />
            ⚡ Hashrate: {farm.hashrate_th} TH/s<br />
            💰 Tokens: {farm.tokens_owned}<br />
            🧾 Wallet: {farm.wallet}<br />

            {roi ? (
              roi.error ? (
                <div style={{ color: "red" }}>ROI data niet beschikbaar</div>
              ) : (
                <div style={{ marginTop: "10px", background: "#f8f8f8", padding: "8px", borderRadius: "6px" }}>
                  📊 <strong>Live ROI:</strong> {roi.roi}% <br />
                  💵 Income: ${roi.income_usd}/dag <br />
                  🔌 Costs: ${roi.cost_usd}/dag <br />
                  🚀 Emission Multiplier: {roi.multiplier} ({roi.status})
                </div>
              )
            ) : (
              <p>Bezig met laden ROI...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
