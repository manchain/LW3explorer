import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import Web3 from 'web3';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Initialize web3
const web3 = new Web3();

function VehicleDetails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(1);
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`/api/object/${id}`);
        console.log('Vehicle Data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error details:', error);
        setError('Failed to fetch vehicle data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  // Sort transactions by timestamp in descending order (latest first)
  const sortedTransactions = data?.transactions?.sort((a, b) => b.timestamp - a.timestamp) || [];

  // Get all unique locations from transactions
  const allLocations = sortedTransactions.reduce((acc, transaction) => {
    acc.push(transaction.from, transaction.to);
    return acc;
  }, []);

  // Calculate center of the map
  const bounds = allLocations.length > 0 ? L.latLngBounds(allLocations.map(loc => [loc.latitude, loc.longitude])) : null;
  const center = bounds ? bounds.getCenter() : [0, 0];

  // Create polylines data for the map
  const polylines = sortedTransactions.map(transaction => [
    [transaction.from.latitude, transaction.from.longitude],
    [transaction.to.latitude, transaction.to.longitude]
  ]);

  const handleUpdateLocation = async () => {
    try {
      setUpdating(true);

      // Get current GPS location
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Convert coordinates to integers
      const latitude = Math.round(position.coords.latitude);
      const longitude = Math.round(position.coords.longitude);

      // Convert address to checksum format
      const checksumAddress = web3.utils.toChecksumAddress(data.object.address);

      console.log('Sending update with data:', {
        msgSender: checksumAddress,
        latitude,
        longitude
      });

      const response = await axios.post('/api/setLocation', {
        msgSender: checksumAddress,
        latitude,
        longitude
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Raw response:', response);
      console.log('Update Location Response:', response.data);

      if (response.data.hash) {
        navigate(`/transaction/${response.data.hash}`);
      }
    } catch (error) {
      console.error('Error updating location:', error);
      if (error.message === 'Geolocation is not supported by your browser') {
        alert('Geolocation is not supported by your browser. Please use a modern browser with GPS support.');
      } else if (error.code === 1) {
        alert('Location access was denied. Please enable location access in your browser settings.');
      } else {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);
        alert(`Failed to update location: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Loading Vehicle Details...</div>
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

  if (!data || !data.object) {
    return (
      <div className="min-h-screen bg-[#000033] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">No vehicle data found</div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto lg:px-20 xl:px-32">
          {/* Vehicle Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#000033] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                <img src={data.object.logoURL} alt={data.object.productName} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{data.object.productName}</h1>
                <p className="text-xs sm:text-sm text-gray-500 break-all sm:break-normal">{data.object.address}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <a
                href={`https://scan.lw3.world/res/original/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#000033] text-white px-4 py-2 text-sm rounded-lg hover:bg-[#000066] transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Get Passport
              </a>
              <button
                onClick={handleUpdateLocation}
                disabled={updating || sortedTransactions.length === 0}
                className="bg-[#00AA00] text-white px-4 py-2 text-sm rounded-lg hover:bg-[#008800] transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Location'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-6">
            {[
              {
                bg: "F8FFF8",
                color: "#0066FF",
                label: "Current Value",
                value: `$${formatNumber(data.object.value || 0)}`,
                labelColor: "#0066FF"
              },
              {
                bg: "FAF5FF",
                color: "#8833FF",
                label: "Distance Moved",
                value: `${formatNumber(data.object.totalDistanceKm || 0)} km`,
                labelColor: "#8833FF"
              },
              {
                bg: "F8FFF8",
                color: "#00AA00",
                label: "Current Location",
                value: data.object.currentLocation?.city || 'N/A',
                labelColor: "#00AA00"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-[${stat.bg === 'FAF5FF' ? '#FAF5FF' : '#F8FFF8'}] rounded-xl p-3 flex-1`}
              >
                <div className="text-[11px] sm:text-[13px]" style={{ color: stat.labelColor }}>
                  {stat.label}
                </div>
                <div className="text-[14px] sm:text-[18px] lg:text-[22px] font-bold text-[#1A1A1A] mt-1 break-words">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Movement Track */}
          <div className="animate-fade-in mb-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#1A1A1A]">Movement Track</h2>
            <div className="bg-[#F5F5F5] rounded-2xl p-4 sm:p-6">
              {/* Map Container */}
              <div className="w-full h-[400px] mb-4 rounded-xl overflow-hidden">
                <MapContainer
                  center={center}
                  zoom={4}
                  style={{ height: '100%', width: '100%' }}
                  bounds={bounds}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {sortedTransactions.map((transaction, index) => (
                    <React.Fragment key={transaction.hash}>
                      <Marker position={[transaction.from.latitude, transaction.from.longitude]}>
                        <Popup>
                          From: {transaction.from.city}<br />
                          {new Date(transaction.timestamp).toLocaleString()}
                        </Popup>
                      </Marker>
                      <Marker position={[transaction.to.latitude, transaction.to.longitude]}>
                        <Popup>
                          To: {transaction.to.city}<br />
                          {new Date(transaction.timestamp).toLocaleString()}
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
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>

              {/* Location List */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <div className="flex-1 flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#000033]"></div>
                      <span className="font-medium">India</span>
                    </div>
                    <div className="mx-4 flex-1 border-t-2 border-dashed border-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#000033]"></div>
                      <span className="font-medium">Hong Kong</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Movement Transactions */}
          <div className="animate-fade-in">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#1A1A1A]">Movement Transactions</h2>
            <div className="space-y-4">
              {sortedTransactions.map((transaction, index) => (
                <div
                  key={transaction.hash}
                  onClick={() => navigate(`/transaction/${transaction.hash}`)}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{
                    animation: 'slideUp 0.5s ease-out forwards',
                    animationDelay: `${0.6 + (index * 0.15)}s`
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#000033] flex items-center justify-center">
                        <img src={data.object.logoURL} alt="Logo" className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{transaction.type}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F8FFF8] text-[#00AA00] px-3 py-1 rounded-full text-sm font-medium">
                      {transaction.distance_km.toFixed(2)} km
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {transaction.hash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails; 