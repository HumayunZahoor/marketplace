import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const SellerPortal = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
    <h1>{user.name} Wellcome to Seller Portal</h1>
      <div className="text-red-700">
            <Link to="/CreateShopForm" className="py-2 px-4 rounded transition duration-300 flex items-center">
              "Start Your Shop, Ignite Success!"
            </Link>
            <Link to="/ShopList" className="py-2 px-4 rounded transition duration-300 flex items-center">
              Your Shop
            </Link>
          </div>
    </div>
  )
}

export default SellerPortal
