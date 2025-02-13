import React from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TransactionDetails() {
  const navigate = useNavigate();

  // Sample transaction data
  const transactions = [
    {
      block: '#1234567',
      slot: '11007626',
      age: '12 secs ago',
      txn: '251',
      feeRecipient: 'beaverbuild',
      gasUsed: '20,526,216',
      gasLimit: '35,824,535',
      baseFee: '0.999 ADA',
      reward: '0.02316 ADA',
      burntFees: '0.020512 ADA',
    },
    {
      block: '#1234568',
      slot: '11007625',
      age: '24 secs ago',
      txn: '228',
      feeRecipient: 'rsync-builder.eth',
      gasUsed: '13,789,485',
      gasLimit: '35,789,586',
      baseFee: '1.028 ADA',
      reward: '0.0264 ADA',
      burntFees: '0.014187 ADA',
    },
    {
      block: '#1234569',
      slot: '11007624',
      age: '36 secs ago',
      txn: '262',
      feeRecipient: 'beaverbuild',
      gasUsed: '17,242,797',
      gasLimit: '35,824,569',
      baseFee: '1.033 ADA',
      reward: '0.03011 ADA',
      burntFees: '0.017823 ADA',
    },
    {
      block: '#1234570',
      slot: '11007623',
      age: '48 secs ago',
      txn: '350',
      feeRecipient: 'Titan Builder',
      gasUsed: '19,252,395',
      gasLimit: '35,859,587',
      baseFee: '1.024 ADA',
      reward: '0.04174 ADA',
      burntFees: '0.019718 ADA',
    },
    {
      block: '#1234571',
      slot: '11007622',
      age: '1 min ago',
      txn: '356',
      feeRecipient: 'beaverbuild',
      gasUsed: '31,836,471',
      gasLimit: '35,894,639',
      baseFee: '0.933 ADA',
      reward: '0.06959 ADA',
      burntFees: '0.029731 ADA',
    },
    {
      block: '#1234572',
      slot: '11007621',
      age: '1 min ago',
      txn: '148',
      feeRecipient: '0xcE086c8F...7FF123FA5',
      gasUsed: '7,812,436',
      gasLimit: '35,929,725',
      baseFee: '1.004 ADA',
      reward: '0.01268 ADA',
      burntFees: '0.007850 ADA',
    },
    {
      block: '#1234573',
      slot: '11007620',
      age: '1 min ago',
      txn: '147',
      feeRecipient: 'beaverbuild',
      gasUsed: '12,119,825',
      gasLimit: '35,964,845',
      baseFee: '1.047 ADA',
      reward: '0.01513 ADA',
      burntFees: '0.012696 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    {
      block: '#1234574',
      slot: '11007619',
      age: '1 min ago',
      txn: '351',
      feeRecipient: 'beaverbuild',
      gasUsed: '21,243,187',
      gasLimit: '36,000,000',
      baseFee: '1.024 ADA',
      reward: '0.02424 ADA',
      burntFees: '0.021763 ADA',
    },
    
  ];

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
            className="text-2xl text-white/80 hover:text-white transition-colors duration-200"
          >
            <FaBars />
          </button>
        </header>
      </div>

      {/* Content */}
      <div className="bg-white min-h-screen px-5 sm:px-6 lg:px-20 xl:px-32 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-4">Transaction Details</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Block</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Txn</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Fee Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Gas Used</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Gas Limit</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Base Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Reward</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Burnt Fees (ADA)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{transaction.block}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.slot}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.txn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{transaction.feeRecipient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.gasUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.gasLimit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.baseFee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.reward}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.burntFees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails; 