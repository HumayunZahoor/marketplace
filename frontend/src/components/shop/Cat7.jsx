import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cat7 = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return (
      <div className="text-red-700 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <Link to="/login" className="py-2 px-4 rounded bg-red-500 text-white transition duration-300 hover:bg-red-600">
          You are not logged in! Please login to buy or view these products...Click Here!
        </Link>
      </div>
    );
  }
  
  return (
    <div>
    Toys & Games
    </div>
  )
}

export default Cat7
