import React, { useState } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionDetails = () => {
  useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample data for demonstration
  const transactionData = {
    hash: '152febead42be48abd83553933e312bb938654dba750035b4b613e5edfe67754',
    block: '11479180',
    assurance: 'High',
    confirmations: 3170,
    epochSlot: '539 / 404805',
    absoluteSlot: '147889605',
    message: 'Minswap: Order Executed',
    timestamp: 'Feb 13, 2025 7:41:36 PM (Confirmed within 7 secs)',
    totalFees: '0.664805 ADA (0.53 $)',
    totalOutput: '6,268,556.507552 ADA (5,012,381.66 $)',
    certificates: 0,
    ttl: 'Feb 13, 2025 7:44:22 PM (147889771)',
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-[#000033] p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleBack} className="text-white">
          <FaArrowLeft />
        </button>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="text-2xl text-white/80 hover:text-white transition-colors duration-200"
        >
          <FaBars className={`transform transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>
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
      <h1 className="text-white text-2xl font-bold mb-4">Transaction Details</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300">
        <div className="mb-4">
          <span className="font-bold">Transaction Hash:</span> {transactionData.hash}
        </div>
        <div className="mb-4">
          <span className="font-bold">Block:</span> {transactionData.block}
        </div>
        <div className="mb-4">
          <span className="font-bold">Assurance:</span> {transactionData.assurance} ({transactionData.confirmations} confirmations)
        </div>
        <div className="mb-4">
          <span className="font-bold">Epoch / Slot:</span> {transactionData.epochSlot}
        </div>
        <div className="mb-4">
          <span className="font-bold">Absolute Slot:</span> {transactionData.absoluteSlot}
        </div>
        <div className="mb-4">
          <span className="font-bold">Message:</span> {transactionData.message}
        </div>
        <div className="mb-4">
          <span className="font-bold">Timestamp:</span> {transactionData.timestamp}
        </div>
        <div className="mb-4">
          <span className="font-bold">Total Fees:</span> {transactionData.totalFees}
        </div>
        <div className="mb-4">
          <span className="font-bold">Total Output:</span> {transactionData.totalOutput}
        </div>
        <div className="mb-4">
          <span className="font-bold">Certificates:</span> {transactionData.certificates}
        </div>
        <div className="mb-4">
          <span className="font-bold">TTL:</span> {transactionData.ttl}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails; 