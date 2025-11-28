import React, { useState } from 'react';
import { searchWorkers } from './services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './fixLeaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function App() {
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!service || !area) return;
    setLoading(true);
    try {
      const res = await searchWorkers(service.toLowerCase(), area.toLowerCase());
      setWorkers(res.data.data || []);
    } catch (err) {
      setWorkers([]);
    }
    setLoading(false);
  };

  // Real coordinates for Kampala areas
  const areaCoords = {
    ntinda: [0.352, 32.614],
    kisaasi: [0.378, 32.605],
    nakawa: [0.330, 32.610],
    "industrial area": [0.305, 32.602],
    makindye: [0.280, 32.585],
    katwe: [0.295, 32.575],
    kawempe: [0.380, 32.560],
    najjera: [0.400, 32.630],
    kololo: [0.325, 32.595],
    kalerwe: [0.370, 32.570],
    bukoto: [0.345, 32.600],
    kira: [0.400, 32.640],
    "entebbe road": [0.250, 32.570],
    munyonyo: [0.240, 32.610],
    bugolobi: [0.315, 32.620]
  };

  const getCoords = (areaName) => {
    const key = areaName.toLowerCase();
    return areaCoords[key] || [0.347, 32.582]; // fallback to Kampala center
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-yellow-400">
      <div className="container mx-auto px-4 pt-10 pb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-4 drop-shadow-2xl">
          FindMe.ug
        </h1>
        <p className="text-xl md:text-3xl text-white text-center font-bold mb-10">
          Your trusted fundi is just one click away
        </p>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-full shadow-2xl p-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g., plumber, salon, mechanic..."
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="flex-1 px-6 py-4 text-lg outline-none"
              required
            />
            <input
              type="text"
              placeholder="e.g., Ntinda, Nakawa, Kisaasi..."
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1 px-6 py-4 text-lg outline-none"
              required
            />
            <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 rounded-full">
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {workers.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Found {workers.length} Fundis in {area}
            </h2>

            {/* Map */}
            <div className="max-w-5xl mx-auto mb-12">
              <MapContainer center={getCoords(area)} zoom={13} style={{ height: '450px', borderRadius: '16px' }} className="shadow-2xl">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {workers.map(worker => {
                  const [lat, lng] = getCoords(worker.area);
                  return (
                    <Marker key={worker._id} position={[lat, lng]}>
                      <Popup>
                        <b>{worker.name}</b><br />
                        {worker.services.join(', ')}<br />
                        Rating: {worker.rating || 4.7} ★<br />
                        <a href={`https://wa.me/${worker.whatsapp}`} className="text-green-600 font-bold">WhatsApp →</a>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {workers.map(w => (
                <div key={w._id} className="bg-white rounded-2xl shadow-2xl p-6 hover:scale-105 transition">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{w.name}</h3>
                  <p className="text-gray-600 mb-2">{w.services.join(' • ')}</p>
                  <p className="text-lg font-semibold mb-3">Location: {w.location}</p>
                  <div className="flex gap-3">
                    <a href={`tel:${w.phone}`} className="bg-blue-600 text-white px-6 py-3 rounded-full">Call</a>
                    <a href={`https://wa.me/${w.whatsapp}`} className="bg-green-500 text-white px-6 py-3 rounded-full">WhatsApp</a>
                  </div>
                  {w.rating && <p className="mt-3 text-yellow-600 font-bold">Rating: {w.rating} ★</p>}
                </div>
              ))}
            </div>
          </>
        )}

        <p className="text-white text-center text-lg mt-20">
          Launching soon in Kampala • Made with ❤️ in Uganda
        </p>
      </div>
    </div>
  );
}

export default App;
