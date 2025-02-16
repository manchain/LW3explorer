import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BlockDetails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await axios.get(`/api/block/${id}`);
        console.log('Block Data:', response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error details:', error);
        setError('Failed to fetch block data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlockData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Loading Block Details...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { block, transactions } = data;

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Header */}
      <div className="bg-[#000033] text-white px-4 sm:px-6 lg:px-20 xl:px-32 py-6">
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <button onClick={() => navigate(-1)} className="text-2xl text-white/80 hover:text-white transition-colors duration-200">
            <FaArrowLeft />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-white/80 hover:text-white transition-colors duration-200">
            <FaBars className={`transform transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`} />
          </button>
        </header>

        {menuOpen && (
          <div className="absolute top-20 right-4 bg-[#000033] rounded-xl p-4 shadow-lg z-50 border border-white/10">
            <ul className="space-y-3 text-white">
              <li onClick={() => navigate('/')} className="hover:text-white/80 cursor-pointer transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded">
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
      <div className="bg-white rounded-t-[32px] min-h-screen shadow-2xl animate-slide-up">
        <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto lg:px-20 xl:px-32">
          {/* Block Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">Block #{block.block_number}</h1>
              <p className="text-gray-500">{block.created_at}</p>
            </div>
            <div className="bg-[#F8FFF8] text-[#00AA00] px-4 py-2 rounded-full text-sm font-medium">
              {block.transaction_count} Transaction{block.transaction_count !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Block Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#F8FFF8] rounded-xl p-4">
              <div className="text-[#00AA00] text-sm mb-1">Total Value</div>
              <div className="text-xl font-bold text-[#1A1A1A]">${block.total_value.toLocaleString()}</div>
            </div>
            <div className="bg-[#FAF5FF] rounded-xl p-4">
              <div className="text-[#8833FF] text-sm mb-1">Total Distance</div>
              <div className="text-xl font-bold text-[#1A1A1A]">{block.total_distance.toFixed(2)} km</div>
            </div>
            <div className="bg-[#F8FFF8] rounded-xl p-4 sm:col-span-2 lg:col-span-1">
              <div className="text-[#0066FF] text-sm mb-1">Created At</div>
              <div className="text-xl font-bold text-[#1A1A1A]">{new Date(block.created_at).toLocaleString()}</div>
            </div>
          </div>

          {/* Transactions */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Transactions</h2>
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                onClick={() => navigate(`/transaction/${tx.hash}`)}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#000033] flex items-center justify-center">
                      <img src={tx.product.logo} alt={tx.product.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <div className="font-medium text-[#1A1A1A]">{tx.product.name}</div>
                      <div className="text-sm text-gray-500">{tx.product.address}</div>
                    </div>
                  </div>
                  <div className="bg-[#F8FFF8] text-[#00AA00] px-3 py-1 rounded-full text-sm">
                    {tx.distance_km.toFixed(2)} km
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>From: {tx.from.city}</span>
                  <span>→</span>
                  <span>To: {tx.to.city}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600 truncate">
                  {tx.hash}
                </div>
                <div className="mt-2 text-sm text-[#0066FF]">
                  Value: ${tx.product.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDetails; 