import { useEffect, useState } from "react";

export default function Admin() {
  const [wallet, setWallet] = useState("");
  const [stats, setStats] = useState(null);
  const [mintAmount, setMintAmount] = useState(1000);
  const [burnAmount, setBurnAmount] = useState(500);
  const [transferData, setTransferData] = useState({ to: "", amount: 100 });
  const [farmData, setFarmData] = useState({ name: "", location: "", roi: 0, status: "setup" });
  const [emission, setEmission] = useState(0);
  const [feedback, setFeedback] = useState("");


  const api = "http://localhost:8000";
useEffect(() => {
  const w = localStorage.getItem("wallet");
  setWallet(w);

  fetch(`${api}/stats`)
    .then((res) => res.json())
    .then(setStats)
    .catch((err) => console.error("Stats fetch error:", err));
}, []);


 const handleMint = () => {
  fetch(`${api}/admin/mint`, {
    method: "POST",
    body: JSON.stringify({ btc_address: wallet, amount: mintAmount }),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(data => {
      setFeedback(`✅ Minted ${data.new_balance} INF to ${wallet}`);
    })
    .catch(() => setFeedback("❌ Mint failed"));
};

const handleBurn = () => {
  fetch(`${api}/admin/burn`, {
    method: "POST",
    body: JSON.stringify({ btc_address: wallet, amount: burnAmount }),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(data => {
      setFeedback(`🔥 Burned ${burnAmount} INF from ${wallet}`);
    })
    .catch(() => setFeedback("❌ Burn failed"));
};
;

 const handleTransfer = () => {
  fetch(`${api}/transfer`, {
    method: "POST",
    body: JSON.stringify({
      from_address: wallet,
      to_address: transferData.to,
      amount: transferData.amount,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(data => {
      setFeedback(`🔁 Transferred ${transferData.amount} INF to ${transferData.to}`);
    })
    .catch(() => setFeedback("❌ Transfer failed"));
};

  const handleAddFarm = () => {
    fetch(`${api}/farms`, {
      method: "POST",
      body: JSON.stringify(farmData),
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleSetEmission = () => {
    fetch(`${api}/emission`, {
      method: "POST",
      body: JSON.stringify({ emission }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="p-4 text-white bg-darkBg min-h-screen">
      <h1 className="text-2xl mb-4">Admin Panel – {wallet}</h1>

      <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl">Admin Panel – {wallet}</h1>
  <button
    onClick={() => {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin-login";
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>


      {stats && (
        <div className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl mb-2">Full Token Overview</h2>
          <p><strong>Total Supply:</strong> {stats.total_supply}</p>
          <p><strong>Treasury:</strong> {stats.treasury}</p>
          <p><strong>Reinvestment Pool:</strong> {stats.reinvestment}</p>
          <p><strong>Insurance Reserve:</strong> {stats.insurance}</p>
          <p><strong>User Balances:</strong> {stats.user_balances}</p>
          <p><strong>Farming Rewards:</strong> {stats.farming_rewards}</p>
          <p><strong>Team Allocation:</strong> {stats.team}</p>
          <p><strong>Developer Reserve:</strong> {stats.dev_reserve}</p>
          <p><strong>Liquidity Locked:</strong> {stats.liquidity_locked}</p>
          <p><strong>Vesting Schedule:</strong> {stats.vesting_schedule}</p>
        </div>
      )}

      {stats?.investor_rounds?.length > 0 && (
        <div className="bg-gray-900 p-4 rounded mb-6">
          <h2 className="text-xl mb-2">Investor Rounds</h2>
          {stats.investor_rounds.map((round) => (
            <p key={round.round}>
              Round {round.round}: {round.tokens} INF @ €{round.price.toFixed(2)} → €
              {(round.tokens * round.price).toLocaleString()}
            </p>
          ))}
          <p className="mt-2 font-bold">
            Total Raised: €
            {stats.investor_rounds.reduce((sum, r) => sum + r.tokens * r.price, 0).toLocaleString()}
          </p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg">Mint INF</h2>
        <input type="number" className="p-2 rounded bg-gray-700 mr-2" value={mintAmount} onChange={(e) => setMintAmount(Number(e.target.value))} />
        <button onClick={handleMint} className="bg-blueBrand px-4 py-2 rounded shadow-glow">Mint</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg">Burn INF</h2>
        <input type="number" className="p-2 rounded bg-gray-700 mr-2" value={burnAmount} onChange={(e) => setBurnAmount(Number(e.target.value))} />
        <button onClick={handleBurn} className="bg-pinkBrand px-4 py-2 rounded shadow-glow">Burn</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg">Transfer INF</h2>
        <input placeholder="To Address" className="p-2 rounded bg-gray-700 mr-2" value={transferData.to} onChange={(e) => setTransferData({ ...transferData, to: e.target.value })} />
        <input type="number" placeholder="Amount" className="p-2 rounded bg-gray-700 mr-2" value={transferData.amount} onChange={(e) => setTransferData({ ...transferData, amount: Number(e.target.value) })} />
        <button onClick={handleTransfer} className="bg-yellow-500 px-4 py-2 rounded shadow-glow">Transfer</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg">Add Farm</h2>
        <input placeholder="Name" className="p-2 rounded bg-gray-700 mr-2" onChange={(e) => setFarmData({ ...farmData, name: e.target.value })} />
        <input placeholder="Location" className="p-2 rounded bg-gray-700 mr-2" onChange={(e) => setFarmData({ ...farmData, location: e.target.value })} />
        <input type="number" placeholder="ROI" className="p-2 rounded bg-gray-700 mr-2" onChange={(e) => setFarmData({ ...farmData, roi: Number(e.target.value) })} />
        <button onClick={handleAddFarm} className="bg-green-600 px-4 py-2 rounded shadow-glow">Add Farm</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg">Set Emission</h2>
        <input type="number" className="p-2 rounded bg-gray-700 mr-2" value={emission} onChange={(e) => setEmission(Number(e.target.value))} />
        <button onClick={handleSetEmission} className="bg-indigo-600 px-4 py-2 rounded shadow-glow">Set</button>
      </div>

{feedback && (
  <div className="mt-4 px-4 py-2 bg-black border-l-4 border-green-500 text-green-300 rounded">
    {feedback}
  </div>
)}

    </div>
  );
}



