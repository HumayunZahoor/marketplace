import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && validImageTypes.includes(file.type)) {
      setImage(file);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF).');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name' , name)
    formData.append('email' , email)
    formData.append('password' , password)
    formData.append('image', image);
    try {
       const response = await axios.post('http://localhost:5001/api/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.response?.data?.message || 'An error occurred during registration');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-indigo-950 text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4 text-indigo-950">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Product Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-950 text-white p-2 rounded-lg hover:bg-indigo-900 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
