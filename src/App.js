import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import VehicleDetails from './components/VehicleDetails';
import BlockDetails from './components/BlockDetails';
import TransactionDetails from './components/TransactionDetails';

// Created a separate component for the home page content
function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/landing');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('API Response:', jsonData);
        
        setData({
          statistics: {
            totalObjects: jsonData.statistics.totalObjects || 0,
            totalVolume: jsonData.statistics.totalVolume || 0,
            totalDistance: jsonData.statistics.totalDistance || 0
          },
          recentTransactions: jsonData.recentTransactions || [],
          recentBlocks: jsonData.recentBlocks || []
        });
      } catch (error) {
        console.error('Error details:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');

    // Remove any whitespace and convert to lowercase
    const cleanedInput = searchInput.trim().toLowerCase();

    // Check if input is empty
    if (!cleanedInput) {
      setSearchError('Please enter a search term');
      return;
    }

    // Check for block number (numbers only)
    if (/^\d+$/.test(cleanedInput)) {
      navigate(`/block/${cleanedInput}`);
      return;
    }

    // Check for vehicle/wallet address (42-45 alphanumeric characters starting with 0x)
    if (/^0x[a-f0-9]{40,43}$/i.test(cleanedInput)) {
      navigate(`/vehicle/${cleanedInput}`);
      return;
    }

    // Check for transaction hash (66 characters starting with 0x)
    if (/^0x[a-f0-9]{64}$/i.test(cleanedInput)) {
      navigate(`/transaction/${cleanedInput}`);
      return;
    }

    // If none of the above patterns match
    setSearchError('Invalid search input. Please enter a valid block number, vehicle address, or transaction hash.');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Loading...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleMenuItemClick = (path) => {
    setMenuOpen(false); // Close menu after clicking
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Navy blue header section */}
      <div className="bg-[#000033] text-white px-4 py-6 pb-32">
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <span className="text-[22px] font-medium">LW3 explorer</span>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-2xl text-white/80 hover:text-white transition-colors duration-200"
          >
            <FaBars className={`transform transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`} />
          </button>
        </header>

        {/* Hamburger Menu */}
        {menuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 bg-[#000033] shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <div className="flex justify-end">
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <nav className="mt-8">
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => handleMenuItemClick('/vehicle/organizations')}
                      className="text-white/80 hover:text-white w-full text-left py-2"
                    >
                      Organizations
                    </button>
                  </li>
                  {/* Add more menu items as needed */}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Title section */}
          <div className="text-[32px] sm:text-[42px] font-bold leading-tight mb-2 animate-slide-up whitespace-nowrap">
            Global Supply Chain
          </div>
          <div className="text-[16px] sm:text-[18px] text-white/70 mb-6 sm:mb-8 animate-slide-up delay-100">
            One platform, unlimited possibilities
          </div>

          {/* Search section */}
          <div className="relative mb-6 animate-fade-in delay-200">
            <form 
              onSubmit={handleSearch}
              className={`flex-1 max-w-2xl mx-4 relative ${searchFocused ? 'z-10' : ''}`}
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search by Block Number / Object Address / Transaction Hash"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              </div>
              {searchError && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500 text-white rounded-md text-sm">
                  {searchError}
                </div>
              )}
            </form>
          </div>

          {/* Stats section with API data */}
          <div className="grid grid-cols-3 gap-3 animate-fade-in delay-300">
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">24h Volume</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">
                ${data.statistics.totalVolume.toLocaleString()}
              </div>
            </div>
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">Miles Moved</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">
                {data.statistics.totalDistance.toFixed(2)}
              </div>
            </div>
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">Active Objects</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">
                {data.statistics.totalObjects}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White background section with transactions and blocks */}
      <div className="bg-white rounded-t-[32px] -mt-20 px-4 py-8 min-h-screen animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Recent Transactions Card */}
          <div className="bg-white text-black rounded-[20px] p-5 shadow-lg flex flex-col h-[550px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[24px] font-bold">Recent Transactions</h2>
              <button 
                onClick={() => navigate('/transaction-details')}
                className="text-blue-500 bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 transition duration-200"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {data.recentTransactions.map((transaction) => (
                  <div key={transaction.transactionHash} className="flex text-sm border-b py-2">
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" 
                         onClick={() => navigate(`/transaction/${transaction.transactionHash}`)}>
                      {transaction.transactionHash.substring(0, 20)}...
                      <div className="text-black text-xs">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" 
                         onClick={() => navigate(`/block/${transaction.blockNumber}`)}>
                      {transaction.blockNumber}
                    </div>
                    <div className="flex-1 text-black text-center">{transaction.object.name}</div>
                    <div className="flex-1 text-green-500 text-center">
                      {transaction.distanceMoved.toFixed(2)} miles
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Blocks Card */}
          <div className="bg-white text-black rounded-[20px] p-5 shadow-lg flex flex-col h-[550px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[24px] font-bold">Recent Blocks</h2>
              <button 
                onClick={() => navigate('/block-details')}
                className="text-blue-500 bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 transition duration-200"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {data.recentBlocks.map((block) => (
                  <div key={block.blockNumber} className="flex text-sm border-b py-2">
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" 
                         onClick={() => navigate(`/block/${block.blockNumber}`)}>
                      {block.blockNumber}
                      <div className="text-black text-xs">{block.timestamp}</div>
                    </div>
                    <div className="flex-1 text-blue-600 text-center">{block.transactionCount}</div>
                    <div className="flex-1 text-green-500 text-center">
                      ${block.totalValue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/block/:id" element={<BlockDetails />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
