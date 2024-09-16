import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SellerPortal = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn || !user?.email) return;
      try {
        const response = await axios.get(`http://localhost:5001/api/users/user-by-email/${user.email}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (user.email) {
      fetchUser();
    }
  }, [isLoggedIn, user?.email]);

  const imageUrl = profile?.image ? `http://localhost:5001/uploads/${profile.image}` : 'profile';

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-6">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div>
          <h1 className="text-indigo-950 font-serif text-2xl font-bold">{profile?.name || user.name}</h1>
          <p className="text-gray-700">{profile?.email || user.email}</p>
          <p className="text-gray-500">{profile?.role || 'Visitor'}</p>
        </div>
      </div>

  
      <div className="space-y-4">
        <Link
          to="/CreateShopForm"
          className="block py-2 px-4 bg-indigo-600 text-white rounded-lg text-center transition duration-300 hover:bg-indigo-700"
        >
          Start Your Shop, Ignite Success!
        </Link>
        <Link
          to="/ShopList"
          className="block py-2 px-4 bg-gray-600 text-white rounded-lg text-center transition duration-300 hover:bg-gray-700"
        >
          Your Shop
        </Link>
      </div>
    </div>
  );
}

export default SellerPortal;
