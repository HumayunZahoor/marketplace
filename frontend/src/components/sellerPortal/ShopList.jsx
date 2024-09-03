import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setShopId} from '../redux/authSlice'

const ShopList = () => {
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/shops/all-shops', {
          params: {
            email: user.email, 
          },
        });
        setShops(response.data);
      } catch (error) {
        setError('Error fetching shops: ' + error.message);
      }
    };

    fetchShops();
  }, [user.email]); 

  const handleAddProductsClick = (shopId) => {
    dispatch(setShopId(shopId)); 
    navigate('/AddProducts'); 
  };

  const handleUpdateProductsClick = (shopId) => {
    dispatch(setShopId(shopId))
    navigate('/UpdateProducts')
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Shop List</h2>
        {error && <p className="text-red-700 mb-4">{error}</p>}
        {shops.length === 0 ? (
          <p className="text-gray-700 text-center">No shops available.</p>
        ) : (
          <ul className="space-y-4">
            {shops.map((shop) => (
              <li key={shop.id} className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Shop Name:</h3>
                <p className="text-lg font-semibold text-gray-900 mb-4">{shop.shopName}</p>

                <h4 className="text-lg font-medium text-gray-800 mb-1">Description:</h4>
                <p className="text-gray-700">{shop.description}</p>
                
                <div className="text-gray-500 mt-4">
                  <p className="font-medium">Owner:</p>
                  <p>{shop.userName}</p>
                  
                  <p className="font-medium mt-1">Contact Email:</p>
                  <p>{shop.userEmail}</p>

                  <p className="font-medium mt-1">Shop Id:</p>
                  <p>{shop._id}</p>
                </div>
                <button 
                  onClick={() => handleAddProductsClick(shop._id)}
                  className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 inline-block text-center'>
                    AddProducts
                </button>
                <button 
                  onClick={() => handleUpdateProductsClick(shop._id)}
                  className='px-4 py-2 ml-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 inline-block text-center'>
                    Update Product
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-center">
          <Link to="/CreateShopForm" className="text-indigo-700 font-semibold hover:underline">
            Create New Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopList;
