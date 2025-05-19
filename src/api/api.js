const API_BASE = "https://inf-token-backend.onrender.com";

export async function getBalance(wallet) {
  const res = await fetch(`${API_BASE}/balance/${wallet}`);
  return res.json();
}

export async function getTreasury() {
  const res = await fetch(`${API_BASE}/admin/treasury/balance`);
  return res.json();
}

export async function getSystemCheck() {
  const res = await fetch(`${API_BASE}/admin/system-check`);
  return res.json();
}

export async function getEmission() {
  const res = await fetch(`${API_BASE}/emission`);
  return res.json();
}

export async function getROI(farmId = "global") {
  const res = await fetch(`${API_BASE}/roi/${farmId}`);
  return res.json();
}

export async function getLiveFeed() {
  const res = await fetch(`${API_BASE}/data/live_feed.json`);
  return res.json();
}

export async function buyTokens(wallet, amount) {
  const res = await fetch(`${API_BASE}/buy-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ btc_address: wallet, amount }),
  });
  return res.json();
}

export async function sellTokens(wallet, amount) {
  const res = await fetch(`${API_BASE}/sell-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ btc_address: wallet, amount }),
  });
  return res.json();
}

export async function mintINF(wallet, amount) {
  const res = await fetch(`${API_BASE}/admin/mint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ btc_address: wallet, amount }),
  });
  return res.json();
}

export async function burnINF(wallet, amount) {
  const res = await fetch(`${API_BASE}/admin/burn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ btc_address: wallet, amount }),
  });
  return res.json();
}

export async function transferINF(from, to, amount) {
  const res = await fetch(`${API_BASE}/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from_address: from, to_address: to, amount }),
  });
  return res.json();
}
