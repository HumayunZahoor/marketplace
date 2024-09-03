import React from 'react'
import { Link } from 'react-router-dom'
const SellerPortal = () => {
  return (
    <div>
      Seller AdminPortal
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
