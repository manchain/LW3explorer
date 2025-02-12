import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import VehicleDetails from './components/VehicleDetails';
import BlockDetails from './components/BlockDetails';
import TransactionDetails from './components/TransactionDetails';

// Create a separate component for the home page content
function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === '#1234567') {
      navigate('/block/1234567');
    }
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

        {menuOpen && (
          <div className="absolute top-20 right-4 bg-[#000033] rounded-xl p-4 shadow-lg z-50 animate-scale-in border border-white/10">
            <ul className="space-y-3 text-white">
              <li 
                onClick={() => navigate('/')} 
                className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded"
              >
                Home
              </li>
              <li 
                className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded"
              >
                Blocks
              </li>
              <li 
                className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded"
              >
                Organizations
              </li>
            </ul>
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
            <form onSubmit={handleSearch} className="relative">
              <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg transition-colors duration-200 ${searchFocused ? 'text-white' : ''}`} />
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white/10 text-white rounded-2xl py-3 sm:py-4 pl-12 pr-4 outline-none text-[14px] sm:text-[16px] transition-all duration-200 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
                placeholder="Search by address, block, or tx hash"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </form>
          </div>

          {/* Stats section - Now in one line */}
          <div className="grid grid-cols-3 gap-3 animate-fade-in delay-300">
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">24h Volume</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">$2.4M</div>
            </div>
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">Miles Moved</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">142K</div>
            </div>
            <div className="bg-white/10 rounded-[16px] p-4 transform transition-all duration-300 hover:bg-white/15">
              <div className="text-[#B3B3CC] text-[12px] whitespace-nowrap">Active Objects</div>
              <div className="text-white text-[24px] sm:text-[28px] font-bold mt-1">5,234</div>
            </div>
          </div>
        </div>
      </div>

      {/* White background section with negative margin */}
      <div className="bg-white rounded-t-[32px] -mt-20 px-4 py-8 min-h-screen animate-slide-up">
        {/* Recent Transactions and Recent Blocks Section */}
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
                <div className="flex font-bold text-sm md:text-base border-b pb-2">
                  <div className="flex-1 text-center">Transaction Hash</div>
                  <div className="flex-1 text-center">Block</div>
                  <div className="flex-1 text-center">Output Address</div>
                  <div className="flex-1 text-center">Output</div>
                </div>
                {[
                  { hash: 'd13e459c..7eea6029', block: '11477581', address: 'addr1q8n..8qevvh9g', output: '83,043.223637 ADA', time: '4 minutes ago' },
                  { hash: '988edd43..3bc15dd5', block: '11477581', address: 'addr1qyq..2sf7ew7h', output: '59,815.772739 ADA', time: '5 minutes ago' },
                  { hash: 'abd9b06b..f1842756', block: '11477581', address: 'addr1v83..9qymj0zq', output: '3,309.644402 ADA', time: '6 minutes ago' },
                  { hash: '2c377ba5..eca22af1', block: '11477581', address: 'addr1qxc..lsvm5ygk', output: '150.173629 ADA', time: '7 minutes ago' },
                  { hash: '516e89aa..cd7ec044', block: '11477581', address: 'Indigo P..col iBTC', output: '1,783.141664 ADA', time: '8 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                  { hash: '1486838c..25d5f9fc', block: '11477581', address: 'addr1qym..vqX0djp', output: '1,298.185708 ADA', time: '9 minutes ago' },
                  { hash: 'bb3c4953..532f164c', block: '11477581', address: 'addr1v3..lckg3fqh', output: '4,110.442959 ADA', time: '10 minutes ago' },
                ].map((transaction, index) => (
                  <div key={index} className="flex text-sm border-b py-2">
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" onClick={() => navigate(`/transaction/${transaction.hash}`)}>
                      {transaction.hash}
                      <div className="text-black text-xs">{transaction.time}</div>
                    </div>
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" onClick={() => navigate(`/block/${transaction.block}`)}>
                      {transaction.block}
                    </div>
                    <div className="flex-1 text-black text-center">{transaction.address}</div>
                    <div className="flex-1 text-green-500 text-center">{transaction.output}</div>
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
                onClick={() => navigate('/transaction-details')}
                className="text-blue-500 bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 transition duration-200"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <div className="flex font-bold text-sm md:text-base border-b pb-2">
                  <div className="flex-1 text-center">Block</div>
                  <div className="flex-1 text-center">Epoch / Slot</div>
                  <div className="flex-1 text-center">Pool</div>
                  <div className="flex-1 text-center">Transactions</div>
                  <div className="flex-1 text-center">Output</div>
                </div>
                {[
                  { block: '11477581', epoch: '539 / 372920', pool: 'Moonstake 9', transactions: '14', output: '713,148.792739 ADA', time: '4 minutes ago' },
                  { block: '11477580', epoch: '539 / 372892', pool: 'Emurgo B', transactions: '6', output: '6,269,710.564119 ADA', time: '5 minutes ago' },
                  { block: '11477579', epoch: '539 / 372884', pool: '3c2dedcde..c837', transactions: '0', output: '0.0 ADA', time: '6 minutes ago' },
                  { block: '11477578', epoch: '539 / 372883', pool: 'ADA Ocean Two', transactions: '13', output: '11,727,044.0463 ADA', time: '7 minutes ago' },
                  { block: '11477577', epoch: '539 / 372823', pool: '(Crypto C...) #Pool4', transactions: '10', output: '793,202.1301 ADA', time: '8 minutes ago' },
                  { block: '11477576', epoch: '539 / 372822', pool: 'Pool 5', transactions: '5', output: '1,000.0000 ADA', time: '9 minutes ago' },
                  { block: '11477575', epoch: '539 / 372821', pool: 'Pool 6', transactions: '8', output: '2,50,000.00 ADA', time: '10 minutes ago' },
                  { block: '11477576', epoch: '539 / 372822', pool: 'Pool 5', transactions: '5', output: '1,000.0000 ADA', time: '9 minutes ago' },
                  { block: '11477575', epoch: '539 / 372821', pool: 'Pool 6', transactions: '8', output: '2,50,000.00 ADA', time: '10 minutes ago' },
                  { block: '11477576', epoch: '539 / 372822', pool: 'Pool 5', transactions: '5', output: '1,000.0000 ADA', time: '9 minutes ago' },
                  { block: '11477575', epoch: '539 / 372821', pool: 'Pool 6', transactions: '8', output: '2,50,000.00 ADA', time: '10 minutes ago' },
                  { block: '11477576', epoch: '539 / 372822', pool: 'Pool 5', transactions: '5', output: '1,000.0000 ADA', time: '9 minutes ago' },
                  { block: '11477575', epoch: '539 / 372821', pool: 'Pool 6', transactions: '8', output: '2,50,000.00 ADA', time: '10 minutes ago' },
                  { block: '11477576', epoch: '539 / 372822', pool: 'Pool 5', transactions: '5', output: '1,000.0000 ADA', time: '9 minutes ago' },
                  { block: '11477575', epoch: '539 / 372821', pool: 'Pool 6', transactions: '8', output: '2,50,000.00 ADA', time: '10 minutes ago' },
                ].map((block, index) => (
                  <div key={index} className="flex text-sm border-b py-2">
                    <div className="flex-1 text-blue-600 cursor-pointer text-center" onClick={() => navigate(`/block/${block.block}`)}>
                      {block.block}
                      <div className="text-black text-xs">{block.time}</div>
                    </div>
                    <div className="flex-1 text-black text-center">{block.epoch}</div>
                    <div className="flex-1 text-black text-center">{block.pool}</div>
                    <div className="flex-1 text-blue-600 text-center">{block.transactions}</div>
                    <div className="flex-1 text-green-500 text-center">{block.output}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-[28px] font-bold mb-6 text-[#1A1A1A]">Top Valued Blocks</h2>
          
          {[
            { time: '2 mins ago', value: '$1.2M', miles: '2,450', number: '1234567', transactions: '12' },
            { time: '6 mins ago', value: '$5.5M', miles: '3,254', number: '1234566', transactions: '12' }
          ].map((block, index) => (
            <div 
              key={index}
              onClick={() => navigate(`/block/${block.number}`)}
              className="bg-white rounded-[24px] p-6 mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in cursor-pointer"
              style={{ animationDelay: `${(index + 6) * 100}ms` }}
            >
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-[#1A1A1A] font-bold text-[22px] mb-1">Block #{block.number}</div>
                  <div className="text-[#666666] text-[15px]">{block.time}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#00AA00] font-bold text-[22px]">{block.value}</div>
                  <div className="text-[#666666] text-[15px]">Total Value</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#F8F8F8] flex items-center justify-center p-2">
                    <img src="/ebay-logo.png" alt="eBay" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[38px] h-[38px] rounded-full bg-[#F8F8F8] flex items-center justify-center p-2">
                    <img src="/etsy-logo.jpg" alt="Etsy" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[38px] h-[38px] rounded-full bg-[#F8F8F8] flex items-center justify-center p-2">
                    <img src="/ford-logo.png" alt="Ford" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[15px] text-[#666666] ml-1">+1</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#666666] text-[15px]">{block.transactions} Transactions</div>
                  <div className="text-[#666666] text-[15px]">{block.miles} Miles</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 px-0 sm:px-4">
          <h2 className="text-[28px] font-bold mb-6 text-[#1A1A1A]">Top Organizations</h2>
          
          {[
            { name: 'Ford', type: 'Automotive', value: '$12.4M' },
            { name: 'Tata', type: 'Transport', value: '$8.9M' }
          ].map((org, index) => (
            <div 
              key={index}
              onClick={() => {
                if (org.name === 'Ford') {
                  navigate('/vehicle/EV789');
                } else if (org.name === 'Tata') {
                  navigate('/vehicle/TL123');
                }
              }}
              className="bg-white rounded-[20px] p-5 mb-4 shadow-lg border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in cursor-pointer"
              style={{ animationDelay: `${(index + 8) * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={org.name === 'Ford' ? '/ford-logo.png' : '/tata-logo.jpg'} alt={org.name} className="w-10 h-10 rounded-full bg-gray-100 p-2" />
                  <div>
                    <div className="text-gray-800 font-bold text-[16px]">{org.name}</div>
                    <div className="text-gray-500 text-[14px]">{org.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#00aa00] font-bold text-[18px]">{org.value}</div>
                  <div className="text-gray-500 text-[14px]">24h volume</div>
                </div>
              </div>
            </div>
          ))}
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
        <Route path="/transaction-details" element={<TransactionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
