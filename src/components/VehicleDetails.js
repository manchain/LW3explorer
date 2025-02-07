import React, { useState } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function VehicleDetails() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Header */}
      <div className="bg-[#000033] text-white px-4 sm:px-6 lg:px-20 xl:px-32 py-6">
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <button 
            onClick={() => navigate(-1)}
            className="text-2xl text-white/80 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-2xl text-white/80 hover:text-white transition-colors duration-200"
          >
            <FaBars className={`transform transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`} />
          </button>
        </header>

        {menuOpen && (
          <div className="absolute top-20 right-4 bg-[#000033] rounded-xl p-4 shadow-lg z-50 border border-white/10">
            <ul className="space-y-3 text-white">
              <li 
                onClick={() => navigate('/')} 
                className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded"
              >
                Home
              </li>
              <li className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded">
                Blocks
              </li>
              <li className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded">
                Organizations
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Vehicle Info Card */}
      <div className="bg-white rounded-t-[32px] min-h-screen shadow-2xl animate-slide-up">
        <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto lg:px-20 xl:px-32">
          {/* Vehicle Header */}
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#000033] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
              <img src="/tata-logo.png" alt="TT" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">Electric Vehicle #EV789</h1>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-row justify-between gap-3 sm:gap-4 lg:gap-6 mb-6 px-0">
            {[
              { 
                bg: "F8FFF8", 
                color: "#0066FF", 
                label: "Current Value", 
                value: "$45,000",
                labelColor: "#0066FF"  // Blue
              },
              { 
                bg: "FAF5FF", 
                color: "#8833FF", 
                label: "Distance Moved", 
                value: "1,234 mi",
                labelColor: "#8833FF"  // Purple
              },
              { 
                bg: "F8FFF8", 
                color: "#00AA00", 
                label: "Production Date", 
                value: "Oct 15,2023",
                labelColor: "#00AA00"  // Green
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`bg-[${stat.bg === 'FAF5FF' ? '#FAF5FF' : '#F8FFF8'}] rounded-2xl p-3 flex-1 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                style={{ 
                  animation: `slideUp 0.5s ease-out forwards`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="text-[13px] whitespace-nowrap" style={{ color: stat.labelColor }}>
                  {stat.label}
                </div>
                <div className="text-[18px] sm:text-[22px] font-bold text-[#1A1A1A] mt-1 whitespace-nowrap">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-6">
              {/* Movement Track */}
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#1A1A1A]">Movement Track</h2>
                <div className="bg-[#F5F5F5] rounded-2xl p-4 sm:p-6">
                  <div className="h-40 sm:h-48 lg:h-56 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                    Map View
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">From</div>
                      <div className="font-medium text-[#1A1A1A]">Mumbai, India</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">To</div>
                      <div className="font-medium text-[#1A1A1A]">Delhi, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="animate-fade-in">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#1A1A1A]">Transaction Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Block Number</div>
                    <div className="font-medium text-[#1A1A1A]">#1234567</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Distance Moved</div>
                    <div className="font-medium text-[#1A1A1A]">1,234 miles</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Txn Hash</div>
                    <div className="font-medium text-[#1A1A1A]">0x3CW...J901</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Timestamp</div>
                    <div className="font-medium text-[#1A1A1A]">Oct 15, 2023 14:30:45</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement History */}
            <div className="animate-fade-in">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#1A1A1A]">Movement History</h2>
              <div className="space-y-4">
                {[
                  { title: "Factory Dispatch", time: "2 hours ago", status: "Completed", hash: "0x882...C635 → 0x3CW...J901" },
                  { title: "Quality Check", time: "5 hours ago", status: "Verified", hash: "0x882...C635 → 0x2NW...J901" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ 
                      animation: 'slideUp 0.5s ease-out forwards',
                      animationDelay: `${0.6 + (index * 0.15)}s`
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#000033] flex items-center justify-center">
                          <img src="/tata-logo.png" alt="TT" className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-medium text-[#1A1A1A]">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.time}</div>
                        </div>
                      </div>
                      <div className="bg-[#F8FFF8] text-[#00AA00] px-3 py-1 rounded-full text-sm font-medium">
                        {item.status}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div>{item.hash}</div>
                      <div>Block #1234567</div>
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

export default VehicleDetails; 