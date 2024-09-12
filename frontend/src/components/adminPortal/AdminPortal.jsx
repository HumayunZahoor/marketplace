import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const AdminPortal = () => {
    const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>{user.name} Wellcome to Admin Portal</h1>
      
      <div className="text-red-700">
            <Link to="/UpdateRole" className="py-2 px-4 rounded transition duration-300 flex items-center">
              Update Role of USer Who Want To Create Shop
            </Link>
            <Link to="/UsersRequest" className="py-2 px-4 rounded transition duration-300 flex items-center">
              Users Requests To Allow them to Create shops
            </Link>
          </div>
    </div>
  )
}

export default AdminPortal
