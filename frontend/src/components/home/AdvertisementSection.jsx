import React from 'react';
import { Link } from 'react-router-dom';

const AdvertisementSection = () => {
  return (
    <div className="relative m-2 min-h-[100px] md:min-h-[200px] lg:min-h-[300px] mb-7 overflow-hidden bottom-shadow background rounded-3xl pb-2">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-1 " ></div>
      <div className="relative flex items-center justify-center h-full text-center text-white p-6 z-2">
        <div className="animate-slide-in">
          <h2 className="text-5xl lg:text-6xl font-bold m-10">Start Your Shop, Ignite Success!</h2>
          <p className="m-10 text-lg lg:text-xl">
            Join our marketplace and create your own shop today. Reach new customers and grow your business with ease.
          </p>
          <Link to="/Contact" className="bg-indigo-400 hover:bg-indigo-700 text-gradient-to-r from-gray-400 via-gray-700 to-gray-400 font-bold py-3 px-6 pb-2 rounded-full transition duration-300">
            Let's Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
