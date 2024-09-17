import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShopId } from '../redux/authSlice';

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
          params: { email: user.email },
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
    dispatch(setShopId(shopId));
    navigate('/UpdateProducts');
  };

  const handleOnSaleProducts = (shopId) => {
    dispatch(setShopId(shopId));
    navigate('/ProductOnsale');
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mt-6">
        <h2 className="text-3xl font-bold text-indigo-950 mb-6 text-center">Shop List</h2>
        <div className="text-center mb-6">
          <Link to="/CreateShopForm" className="inline-block py-2 px-4 bg-indigo-950 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-900 transition-colors duration-300">
            Create New Shop
          </Link>
        </div>
        {error && <p className="text-indigo-950 text-center mb-4">{error}</p>}
        {shops.length === 0 ? (
          <p className="text-indigo-950 text-center">No shops available.</p>
        ) : (
          <ul className="space-y-6">
            {shops.map((shop) => (
              <li key={shop.id} className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <h3 className="text-xl font-semibold text-indigo-950 mb-2">Shop Name:</h3>
                <p className="text-lg font-medium text-indigo-950 mb-4">{shop.shopName}</p>

                <h4 className="text-lg font-medium text-indigo-950 mb-1">Description:</h4>
                <p className="text-indigo-950 mb-4">{shop.description}</p>

                <div className="text-indigo-950 mb-4">
                  <p className="font-medium">Owner:</p>
                  <p>{shop.userName}</p>

                  <p className="font-medium mt-2">Contact Email:</p>
                  <p>{shop.userEmail}</p>

                  <p className="font-medium mt-2">Shop ID:</p>
                  <p>{shop._id}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddProductsClick(shop._id)}
                    className="px-4 py-2 bg-indigo-950 text-white rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Add Products
                  </button>
                  <button
                    onClick={() => handleUpdateProductsClick(shop._id)}
                    className="px-4 py-2 bg-indigo-950 text-white rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Update Products
                  </button>
                  <button
                    onClick={() => handleOnSaleProducts(shop._id)}
                    className="px-4 py-2 bg-indigo-950 text-white rounded-lg hover:bg-indigo-900 transition-colors"
                  >
                    Set Price & On Sale
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopList;
