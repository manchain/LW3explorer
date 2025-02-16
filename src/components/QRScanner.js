import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Scanner from 'react-qr-scanner';

function QRScanner() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleScan = (result) => {
        if (result) {
            console.log('Scanned result:', result);
            const text = result.text;
            console.log('Scanned text:', text);
            if (text && (text.includes('scan.lw3.world/res/original/') || text.includes('scan.lw3.xyz/res/original/'))) {
                const id = text.split('/res/original/').pop().split('/')[0];
                console.log('Extracted ID:', id);
                navigate(`/vehicle/${id}`);
            }
        }
    };

    const handleError = (err) => {
        console.error('Scanner error:', err);
        if (err?.name === 'NotAllowedError' || err?.name === 'NotFoundError') {
            setError('Camera access denied. Please enable camera permissions in your browser settings.');
        }
    };

    return (
        <div className="min-h-screen bg-[#000033]">
            {/* Header */}
            <div className="bg-[#000033] text-white px-4 sm:px-6 lg:px-20 xl:px-32 py-6">
                <header className="flex justify-between items-center mb-8 animate-fade-in">
                    <button onClick={() => navigate(-1)} className="text-2xl text-white/80 hover:text-white transition-colors duration-200">
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold">Scan Passport</h1>
                    <div className="w-8"></div>
                </header>
            </div>

            {/* Content */}
            <div className="bg-white rounded-t-[32px] min-h-screen shadow-2xl animate-slide-up">
                <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto lg:px-20 xl:px-32">
                    <div className="max-w-lg mx-auto">
                        <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6">
                            <p className="text-center text-gray-600">
                                Scan the QR code on your LW3 passport to view vehicle details
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6">
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                            <Scanner
                                onError={handleError}
                                onScan={handleScan}
                                constraints={{
                                    video: { facingMode: 'environment' }
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Position the QR code within the frame to scan
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QRScanner; 