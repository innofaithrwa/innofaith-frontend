import React, { useEffect, useState } from "react";

export default function FarmsList() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/farms")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFarms(data);
        } else {
          setError("Fout: Verwacht een lijst van farms.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Fout bij ophalen van farms.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Mining Farms</h2>

      {loading && <p className="text-gray-400">Loading farms...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && farms.length === 0 && (
        <p className="text-gray-400">Er zijn nog geen farms geregistreerd.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(farms) &&
          farms.map((farm) => (
            <div key={farm.id} className="bg-darkBg p-4 rounded-xl shadow-glow">
              <h3 className="text-lg font-semibold">{farm.name}</h3>
              <p className="text-sm text-gray-400">Location: {farm.location}</p>
              <div className="h-2 bg-gray-800 mt-2 rounded-full">
                <div
                  className="h-2 bg-pinkBrand rounded-full"
                  style={{ width: `${farm.status}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{farm.status}% Setup Complete</p>
            </div>
          ))}
      </div>
    </div>
  );
}
