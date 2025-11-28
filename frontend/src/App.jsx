import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-yellow-400">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 text-center">
       <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl animate-pulse">
  FindMe.ug 🇺🇬
</h1>
        <p className="text-xl md:text-3xl text-white font-bold mb-8 drop-shadow">
          Your trusted fundi is just one click away
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-full shadow-2xl p-3 flex items-center">
            <input
              type="text"
              placeholder="What do you need? e.g., plumber, carpenter, salon..."
              className="flex-1 px-6 py-4 text-lg outline-none"
            />
            <input
              type="text"
              placeholder="Area e.g., Ntinda, Nakawa..."
              className="flex-1 px-6 py-4 text-lg outline-none border-l"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full transition">
              Search
            </button>
          </div>
        </div>

        <p className="text-white text-lg mt-10">
          Launching soon in Kampala • Made with ❤️ in Uganda
        </p>
      </div>
    </div>
  );
}

export default App;
