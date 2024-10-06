import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PrAEqKzHh91dh6pmnjWOwenujoLxq8wPkJ8guDBw93dCHNtm2KO3rrVOt0gGlkOoxfzLNjjnHixrt4Z0f4xWujy00vfSDjdRd');

const CreateShopForm = () => {
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/api/shops/create-shop', {
        shopName,
        description,
        userName: user.name,
        userEmail: user.email,
      });
  
      const { sessionId, newShop } = response.data;
  
      
      console.log('New Shop ID:', newShop._id);
  
      
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (!error) {
        window.open(`https://checkout.stripe.com/pay/${sessionId}`, '_blank');
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      alert('Error during checkout: ' + error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-centermax-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-indigo-950">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-indigo-950 text-center mb-6">Create Shop</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-indigo-950">
          <div>
            <label className="block font-semibold mb-1">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-950 text-white p-2 rounded-lg hover:bg-indigo-900 transition duration-300"
          >
            Create Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShopForm;
