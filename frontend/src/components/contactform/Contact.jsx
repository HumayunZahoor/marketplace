import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Contact = () => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = {
        name: user.name,
        email: user.email,
        message
      };
      await axios.post('http://localhost:5001/api/contacts/add-contacts', contactData);
      alert('Your message has been sent!');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-indigo-950">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <p className="text-lg mb-6 text-center">
        Do you want to create a shop and sell your amazing products? You're at the right place! At our marketplace, we provide the perfect platform to grow your business and reach countless customers. Simply request permission from the owner, and you could soon be managing your very own shop and making your entrepreneurial dreams come true!
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-indigo-950 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={user.name}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-indigo-950 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="mb-6">
          <label className="block text-indigo-950 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-950 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Describe yourself and why you want to create a shop?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
