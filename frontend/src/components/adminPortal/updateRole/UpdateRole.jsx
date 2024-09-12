import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/all-users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    fetchUsers();
  }, []);


  const handleRoleChange = (userId, role) => {
    setSelectedRole((prev) => ({ ...prev, [userId]: role }));
  };


  const handleSubmit = async (userId) => {
    const newRole = selectedRole[userId];
    try {
      await axios.put('http://localhost:5001/api/users/update-role', {
        userId,
        newRole,
      });
      alert('Role updated successfully');
    } catch (err) {
      console.error('Error updating role', err);
    }
  };

  return (
    <div>
      <h1>Update User Roles</h1>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={selectedRole[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="Seller">Seller</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleSubmit(user._id)}>
                  Update Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateRole;
