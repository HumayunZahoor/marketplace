import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedUserId, setHighlightedUserId] = useState(null);
  const rowRefs = useRef({});

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
      toast.success('Role updated successfully');
    } catch (err) {
      console.error('Error updating role', err);
    }
  };

  const handleSearch = () => {
    const matchingUser = users.find((user) => user.email === searchTerm);
    if (matchingUser) {
      setHighlightedUserId(matchingUser._id);
      rowRefs.current[matchingUser._id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      toast.error('No user found with this email');
      setHighlightedUserId(null);
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gray-100">
      <h1 className="text-3xl text-indigo-950 font-bold mb-6 text-center">Update User Roles</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md text-black w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-r-md"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-indigo-950 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-indigo-950 text-white">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                ref={(el) => (rowRefs.current[user._id] = el)}
                className={`border-b border-gray-300 hover:bg-indigo-100 ${
                  highlightedUserId === user._id ? 'bg-green-700' : ''
                }`}
              >
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <select
                    value={selectedRole[user._id] || user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-black w-full sm:w-auto"
                  >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Seller">Seller</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleSubmit(user._id)}
                    className="p-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-md w-full sm:w-auto"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateRole;
