import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/Logout');
      dispatch(logout());
      navigate('/Login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!isLoggedIn || !user?.email) return;
  
      try {
        const response = await axios.get(`http://localhost:5001/api/wishlist/get-wishlist/${user.email}`);
        const activeWishlists = response.data.filter(wishlist => wishlist.status === true); 
        setWishlistCount(activeWishlists.length); 
      } catch (error) {
        console.error('Error fetching wishlist count:', error);
      }
    };
  
    fetchWishlistCount();
  }, [isLoggedIn, user?.email]);
  

  return (
    <div className="bg-indigo-950 text-white py-4 px-8 sticky top-0 z-50">
      <div className="flex justify-between items-center h-full">
        
        <div className="flex items-center">
          <Link
            to="/"
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400 font-extrabold text-2xl drop-shadow-lg hover:text-gray-400 mt-0 mb-0 pb-2"
          >
            تجارت گھر
          </Link>
        </div>

        <div className="block lg:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex flex-grow mx-4 justify-center">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[400px] lg:w-[600px] py-2 px-4 rounded-l bg-gray-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-r flex items-center"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
              >
                Reach Out
              </Link>
            </li>
            {isLoggedIn && (
              <>
                {user.role === 'SuperAdmin' && (
                  <li className="flex space-x-4">
                    <Link
                      to="/AdminPortal"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                    >
                      Admin Portal
                    </Link>
                    <Link
                      to="/Shop"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                    >
                      Shop Stop
                    </Link>
                  </li>
                )}
                {user.role === 'Seller' && (
                  <li className="flex space-x-4">
                    <Link
                      to="/SellerPortal"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                    >
                      Seller Portal
                    </Link>
                    <Link
                      to="/Shop"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                    >
                      Shop Stop
                    </Link>
                  </li>
                )}
                {user.role === 'Visitor' && (
                  <li className="flex space-x-4"> 
                    <Link
                      to="/Shop"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                    >
                      Shop Stop
                    </Link>
                  </li> 
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="relative">
                <Link
                  to="/Cart"
                  className="text-blue-200 hover:text-blue-100 py-2 px-4 rounded transition duration-300 flex items-center"
                >
                  <FaShoppingCart />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 text-sm bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-indigo-950 text-white py-4 px-8 absolute top-full left-0 w-full">
          <form onSubmit={handleSearch} className="flex mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-l bg-gray-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-r flex items-center"
            >
              <FaSearch />
            </button>
          </form>
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Shop"
                className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Stop
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                ContactUS
              </Link>
            </li>
            {isLoggedIn && (
              <>
                {user.role === 'SuperAdmin' && (
                  <li>
                    <Link
                      to="/AdminPortal"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Portal
                    </Link>
                  </li>
                )}
                {user.role === 'Seller' && (
                  <li>
                    <Link
                      to="/SellerPortal"
                      className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Seller Portal
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="hover:text-gray-400 py-2 px-4 rounded transition duration-300 flex items-center"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            <li>
              <Link
                to="/Cart"
                className="text-blue-200 hover:text-blue-100 py-2 px-4 rounded transition duration-300 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaShoppingCart />
                {wishlistCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
