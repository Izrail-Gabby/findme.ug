import React, { useState } from 'react';
import { searchWorkers } from './services/api';

function App() {
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!service || !area) return alert("Please fill both fields");
    
    setLoading(true);
    try {
      const res = await searchWorkers(service, area);
      setWorkers(res.data.data || []);
    } catch (err) {
      alert("No fundis found yet – we’re adding more every day!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-yellow-400">
      <div className="container mx-auto px-4 pt-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
          FindMe.ug
        </h1>
        <p className="text-xl md:text-3xl text-white font-bold mb-10">
          Your trusted fundi is just one click away
        </p>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-full shadow-2xl p-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g., plumber, carpenter, salon, mechanic..."
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="flex-1 px-6 py-4 text-lg outline-none rounded-full md:rounded-none"
            />
            <input
              type="text"
              placeholder="e.g., Ntinda, Nakawa, Kisaasi..."
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1 px-6 py-4 text-lg outline-none border-l md:border-l"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 rounded-full transition">
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {workers.map(w => (
            <div key={w._id} className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition">
              <h3 className="text-2xl font-bold text-green-700">{w.name}</h3>
              <p className="text-gray-600">{w.services.join(', ')}</p>
              <p className="text-lg font-semibold mt-2">📍 {w.location}</p>
              <div className="mt-4 flex gap-3">
                <a href={`tel:${w.phone}`} className="bg-blue-600 text-white px-6 py-3 rounded-full">Call</a>
                <a href={`https://wa.me/${w.whatsapp}`} className="bg-green-500 text-white px-6 py-3 rounded-full">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white text-lg mt-20">
          Launching soon in Kampala • Made with ❤️ in Uganda
        </p>
      </div>
    </div>
  );
}

export default App;
