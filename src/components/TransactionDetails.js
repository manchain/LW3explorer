import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TransactionDetails = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`/api/transaction/${id}`);
        console.log('Transaction Data:', response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error details:', error);
        setError('Failed to fetch transaction data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactionData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Loading Transaction Details...</div>
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

  const { transaction, object, block } = data;
  const center = [
    (transaction.from.latitude + transaction.to.latitude) / 2,
    (transaction.from.longitude + transaction.to.longitude) / 2
  ];

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
          {/* Map Section */}
          <div className="mb-8">
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
              <MapContainer
                center={center}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[transaction.from.latitude, transaction.from.longitude]}>
                  <Popup>
                    From: {transaction.from.city}
                  </Popup>
                </Marker>
                <Marker position={[transaction.to.latitude, transaction.to.longitude]}>
                  <Popup>
                    To: {transaction.to.city}
                  </Popup>
                </Marker>
                <Polyline
                  positions={[
                    [transaction.from.latitude, transaction.from.longitude],
                    [transaction.to.latitude, transaction.to.longitude]
                  ]}
                  color="#2196F3"
                  weight={3}
                  opacity={0.8}
                  dashArray="10, 10"
                />
              </MapContainer>
            </div>
          </div>

          {/* Object Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#000033] flex items-center justify-center">
              <img src={object.logo} alt={object.name} className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">{object.name}</h1>
              <p className="text-gray-500 text-sm">{object.address}</p>
            </div>
          </div>

          {/* Settlement Status */}
          <div className="mb-6 bg-[#F8FFF8] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Settlement Status</span>
              <span className="text-sm font-medium text-[#00AA00]">Settling</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#00AA00] rounded-full w-3/4 animate-settlement"></div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-gray-600 text-sm">Transaction Hash</div>
                  <div className="font-medium text-[#1A1A1A] break-all">{transaction.hash}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Block</div>
                  <div
                    className="font-medium text-[#0066FF] hover:text-[#0044CC] cursor-pointer transition-colors duration-200"
                    onClick={() => navigate(`/block/${block.number}`)}
                  >
                    #{block.number}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Timestamp</div>
                  <div className="font-medium text-[#1A1A1A]">{new Date(transaction.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-600 text-sm">Distance Moved</div>
                  <div className="font-medium text-[#00AA00]">{transaction.distance_km} km</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Value</div>
                  <div className="font-medium text-[#1A1A1A]">${object.value.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Fees</div>
                  <div className="font-medium text-red-500">0.1 ADA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Block Info */}
          <div className="mt-8 bg-[#F5F5F5] rounded-xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Block Information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-gray-600 text-sm">Block Time</div>
                <div className="font-medium text-[#1A1A1A]">{block.timestamp}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Total Value</div>
                <div className="font-medium text-[#1A1A1A]">${block.totalValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Total Distance</div>
                <div className="font-medium text-[#1A1A1A]">{block.totalDistance.toFixed(2)} km</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Transactions</div>
                <div className="font-medium text-[#1A1A1A]">{block.transactionCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails; 