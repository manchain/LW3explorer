import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const TransactionDetails = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  // Sample data for demonstration
  const transactionData = {
    hash: '34c4ef58189040664dde284aca4e6ba020c96b5647ebbf9b12fb15e9d25817f4',
    block: '11482520',
    assurance: 'Low',
    confirmations: 1,
    message: 'Minswap: Order Executed',
    timestamp: 'Feb 14, 2025 2:12:27 PM (Confirmed within 15 secs)',
    totalFees: '0.178745 USD (0.14 $)',
    totalOutput: '8.35801 USD (6.79 $)',
    certificates: 0,
    ttl: 'Feb 14, 2025 2:15:27 PM (147956257)',
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    const fetchDirections = async () => {
      const apiKey = 'AlzaSyBu7MXTTobsgipvNHSSPLe-EWj0uqMClLI'; // Replace with your Google Maps API key
      const origin = 'Mumbai, India';
      const destination = 'Delhi, India';

      try {
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=Delhi&origins=Mumbai&key=AlzaSyBu7MXTTobsgipvNHSSPLe-EWj0uqMClLI`);
        if (response.data.status === 'OK') {
          setDirections(response.data.routes[0]);
        } else {
          setError(response.data.error_message);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    fetchDirections();
  }, []);

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
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="font-bold text-black">Transaction Hash</span>
          <span className="text-gray-400">{transactionData.hash}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Block</span>
          <span className="text-gray-400">{transactionData.block}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Assurance</span>
          <span className="text-gray-400">{transactionData.assurance} ({transactionData.confirmations} confirmation)</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Message</span>
          <span className="text-gray-400">{transactionData.message}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Timestamp</span>
          <span className="text-gray-400">{transactionData.timestamp}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Total Fees</span>
          <span className="text-red-500">{transactionData.totalFees}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Total Valued</span>
          <span className="text-green-500">{transactionData.totalOutput}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Certificates</span>
          <span className="text-gray-400">{transactionData.certificates}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">TTL</span>
          <span className="text-gray-400">{transactionData.ttl}</span>
        </div>
      </div>

      {/* Movement Track Section */}
      <div className="animate-fade-in mt-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-white">Movement Track</h2>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <LoadScript googleMapsApiKey="AlzaSyBu7MXTTobsgipvNHSSPLe-EWj0uqMClLI"> 
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={{ lat: 23.5937, lng: 77.2090 }} // Center between Mumbai and Delhi
              zoom={5}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{ suppressMarkers: true }} 
                />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails; 