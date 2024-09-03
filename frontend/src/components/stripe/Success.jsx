import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-800">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
        <p className="text-lg mb-4">Your shop has been successfully created in <strong>تجارت گھر</strong>.</p>
        <p className="text-md">You have paid <strong>$XX</strong> to create your shop. You can now add your products and start selling!</p>
      </div>
    </div>
  );
}

export default Success;
