import React from 'react'
import { useSelector } from 'react-redux'

const UpdateProducts = () => {
  const { user , shopId} = useSelector((state) => state.auth);
  return (
    <div>
      <p>email of logged in user is {user.email}</p>
      <p>id of shope that is clicked to update products {shopId}</p>
    </div>
  )
}

export default UpdateProducts
