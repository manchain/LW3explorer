import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const TransactionDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    const fetchTransactionData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:3001/api/transaction/${id}`);
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
          try {
            const jsonData = JSON.parse(xhr.responseText);
            console.log('Transaction Data:', jsonData);
            setData(jsonData);
            setError(null);
          } catch (parseError) {
            console.error('Parse error:', parseError);
            setError('Error parsing data');
          }
        } else {
          console.error('XHR Status:', xhr.status);
          setError('Failed to fetch transaction data');
        }
        setLoading(false);
      };

      xhr.onerror = function() {
        console.error('Network error occurred');
        setError('Network error occurred');
        setLoading(false);
      };

      xhr.send();
    };

    if (id) {
      fetchTransactionData();
    }

    return () => {
      setData(null);
      setError(null);
      setLoading(true);
    };
  }, [id]);

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
          <span className="text-gray-400">{data?.transaction.hash}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Block</span>
          <span className="text-gray-400">{data?.block.number}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Assurance</span>
          <span className="text-gray-400">{data?.transaction.assurance} ({data?.transaction.confirmations} confirmation)</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Message</span>
          <span className="text-gray-400">{data?.transaction.message}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Timestamp</span>
          <span className="text-gray-400">{new Date(data?.transaction.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Total Fees</span>
          <span className="text-red-500">{data?.transaction.totalFees}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Total Valued</span>
          <span className="text-green-500">{data?.transaction.totalOutput}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">Certificates</span>
          <span className="text-gray-400">{data?.transaction.certificates}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-black">TTL</span>
          <span className="text-gray-400">{data?.transaction.ttl}</span>
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