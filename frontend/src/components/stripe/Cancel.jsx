import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Importing an icon

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-800">
        <FaTimesCircle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Action Canceled</h1>
        <p className="text-lg mb-4">The shop creation process has been canceled in <strong>تجارت گھر</strong>.</p>
        <p className="text-md">If this was a mistake, you can restart the process at any time.</p>
      </div>
    </div>
  );
}

export default Cancel;
