import React from "react";

const comingSoon = "Coming Soon";

export default function FarmsPage() {
  return (
    <div className="bg-darkBg text-white font-sans min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-pinkBrand">Farms Overview</h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-glow mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blueBrand">Conakry, Guinea</h2>
        <p className="text-sm text-gray-400 mb-4">
          Solar-powered mining site with battery storage & airco cooling
        </p>

        {/* Solarpanels */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Solar Panels</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li>Panel Count: {comingSoon}</li>
            <li>Total Capacity (kW): {comingSoon}</li>
            <li>Live Output (kW): {comingSoon}</li>
          </ul>
        </div>

        {/* Battery */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Battery Storage</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li>Battery Capacity (kWh): {comingSoon}</li>
            <li>Current Charge Level: {comingSoon}</li>
            <li>Discharge Rate: {comingSoon}</li>
          </ul>
        </div>

        {/* Cooling */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Cooling System (Airco)</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li>Temperature In (°C): {comingSoon}</li>
            <li>Temperature Out (°C): {comingSoon}</li>
            <li>Power Usage (kW): {comingSoon}</li>
          </ul>
        </div>

        {/* Miners */}
        <div>
          <h3 className="text-lg font-bold mb-4">Miners (20× S21 Hydro)</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-700 text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Miner ID</th>
                  <th className="px-4 py-2">Hashrate</th>
                  <th className="px-4 py-2">Power Draw</th>
                  <th className="px-4 py-2">Temperature (°C)</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Uptime</th>
                  <th className="px-4 py-2">BTC Earned</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(20)].map((_, i) => (
                  <tr key={i} className="text-center border-t border-gray-700">
                    <td className="px-4 py-2">Miner #{i + 1}</td>
                    <td className="px-4 py-2">{comingSoon}</td>
                    <td className="px-4 py-2">{comingSoon}</td>
                    <td className="px-4 py-2">{comingSoon}</td>
                    <td className="px-4 py-2 text-yellow-400">Booting</td>
                    <td className="px-4 py-2">{comingSoon}</td>
                    <td className="px-4 py-2">{comingSoon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
