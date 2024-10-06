import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/users/change-password', {
        email,
        newPassword
      });

      setMessage(response.data.message);
      alert(response.data.message)
      navigate('/Login')
    } catch (err) {
      setMessage(err.response.data.message || 'Error changing password');
    }
  };

  return (
    <div className="flex justify-center items-center max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-indigo-950">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-indigo-950 text-center mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-indigo-950">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-950 text-white p-2 rounded-lg hover:bg-indigo-900 transition duration-300"
          >
            Change Password
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-red-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
