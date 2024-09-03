import React from 'react'
import { useSelector } from 'react-redux'

const AdminPortal = () => {
    const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>{user.name} Wellcome to Admin Portal</h1>
    </div>
  )
}

export default AdminPortal
