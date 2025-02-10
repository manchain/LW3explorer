import React, { useState } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BlockDetails() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Header */}
      <div className="bg-[#000033] text-white px-4 sm:px-6 lg:px-20 xl:px-32 py-4">
        <header className="flex justify-between items-center">
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
          <div className="absolute top-16 right-4 bg-[#000033] rounded-xl p-4 shadow-lg z-50 border border-white/10">
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

      {/* Content */}
      <div className="bg-white min-h-screen px-5 sm:px-6 lg:px-20 xl:px-32 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Block's Analytics */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#1A1A1A] mb-4">Block's Analytics</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-[#F8FFF8] rounded-2xl p-4">
                <div className="text-[#0066FF] text-[16px] mb-1">Total Volume</div>
                <div className="text-[24px] font-bold text-[#1A1A1A]">$24.5M</div>
              </div>
              <div className="bg-[#FAF5FF] rounded-2xl p-4">
                <div className="text-[#8833FF] text-[16px] mb-1">Distance Moved</div>
                <div className="text-[24px] font-bold text-[#1A1A1A]">5,234 Mi</div>
              </div>
            </div>
          </div>

          {/* Content Grid for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Block Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6 lg:mb-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[20px] font-bold text-[#1A1A1A]">#1234567</h3>
                  <p className="text-gray-500 text-[14px]">2 mins ago</p>
                </div>
                <span className="bg-[#F8FFF8] text-[#00AA00] px-3 py-1 rounded-full text-sm">Latest</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Organizations</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <img src="/nvidia-logo.jpg" alt="NVIDIA" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <img src="/walmart-logo.png" alt="Walmart" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <img src="/mastercard-logo.jpg" alt="Mastercard" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Value Secured</span>
                  <span className="text-[#00AA00] font-bold">$1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Miles Moved</span>
                  <span className="text-[#1A1A1A] font-medium">2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transactions</span>
                  <span className="text-[#1A1A1A] font-medium">12</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/transaction/0x3CW...J901`)}
                className="w-full mt-6 py-3 border border-[#0066FF] text-[#0066FF] rounded-xl hover:bg-[#0066FF] hover:text-white transition-colors duration-200"
              >
                View Details
              </button>
            </div>

            {/* Block's Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1A1A1A] mb-6">Block's Activity</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Block Time</span>
                  <span className="text-[#1A1A1A] font-medium">12.5s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transactions (24h)</span>
                  <span className="text-[#1A1A1A] font-medium">45,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Routes</span>
                  <span className="text-[#1A1A1A] font-medium">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Objects (24h)</span>
                  <span className="text-[#1A1A1A] font-medium">234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDetails; 