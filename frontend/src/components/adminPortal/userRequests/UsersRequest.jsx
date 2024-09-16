import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosCopy } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersRequest = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/contacts/get-contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    
    fetchContacts();
  }, []);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        toast.success('Email copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying email:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-indigo-950 font-bold mb-4">All Contacts</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className='bg-indigo-950 text-white'>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">{contact.name}</td>
              <td className="py-2 px-4 border-b flex items-center">
                <span className="mr-2">{contact.email}</span>
                <button
                  onClick={() => handleCopy(contact.email)}
                  className=" text-indigo-950 text-2xl rounded ml-4"
                >
                <IoIosCopy />
                </button>
              </td>
              <td className="py-2 px-4 border-b">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersRequest;
