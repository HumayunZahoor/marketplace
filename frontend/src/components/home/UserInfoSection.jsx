import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserInfoSection = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center">
      {isLoggedIn ? (
        <div className="bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-lg max-w-lg text-center text-gray-800">
          <p className="text-lg font-semibold mb-4">
            I am <span className="text-blue-500 font-bold">{user.name}</span>, my email is{' '}
            <span className="text-blue-500 font-bold">{user.email}</span>, and my role is{' '}
            <span className="text-blue-500 font-bold">{user.role}</span>.
          </p>
        </div>
        
      ) : (
        <div className="text-red-700">
          <Link to="/login" className="py-2 px-4 rounded transition duration-300 flex items-center">
            "Start Your Shop, Ignite Success!"
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoSection;
