import React from "react";
import CountUp from "react-countup";

export default function StatsBanner() {
  return (
    <div className="bg-darkBg py-8 text-center text-white grid grid-cols-2 md:grid-cols-4 gap-6">
      <div>
        <div className="text-2xl font-bold">
          <CountUp end={1200000} duration={3} separator="," /> INF
        </div>
        <div className="text-sm text-pinkBrand">Total Minted</div>
      </div>
      <div>
        <div className="text-2xl font-bold">
          <CountUp end={4} duration={3} /> Farms
        </div>
        <div className="text-sm text-pinkBrand">Active Locations</div>
      </div>
      <div>
        <div className="text-2xl font-bold">
          <CountUp end={12.45} duration={3} decimals={2} /> BTC
        </div>
        <div className="text-sm text-pinkBrand">Mined</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-400">Coming Soon</div>
        <div className="text-sm text-pinkBrand">Hashrate Live</div>
      </div>
    </div>
  );
}