import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SellerPortal = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn || !user?.email) return;
      try {
        const response = await axios.get(`http://localhost:5001/api/users/user-by-email/${user.email}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [isLoggedIn, user?.email]);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/update-image/${user.email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: response.data.image,
      }));
      alert('Profile image updated successfully');
      setImageUpdated(true);
      setShowUploadButton(false); 
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };

  const imageUrl = profile?.image
    ? `http://localhost:5001/uploads/${profile.image}`
    : 'profile';

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setShowUploadButton(true); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="relative flex items-center p-4 bg-white shadow-md rounded-lg mb-6">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover mr-4"
        />
        <div>
          <h1 className="text-indigo-950 font-serif text-2xl font-bold">
            {profile?.name || user.name}
          </h1>
          <p className="text-gray-700">{profile?.email || user.email}</p>
          <p className="text-gray-500">{profile?.role || 'Visitor'}</p>
        </div>
        <button
          className="absolute top-2 right-2 py-1 px-3 bg-indigo-950 text-white rounded-full transition duration-300 hover:bg-indigo-900"
          onClick={triggerFileInput}
        >
          Edit
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {showUploadButton && (
        <div className="flex justify-end">
          <button
            onClick={handleImageUpload}
            className="py-2 px-4 bg-indigo-950 text-white rounded-lg transition duration-300 hover:bg-indigo-900"
          >
            Update Profile Image
          </button>
        </div>
      )}

      <div className="space-y-4 mt-6">
        <Link
          to="/CreateShopForm"
          className="block py-2 px-4 bg-indigo-950 text-white rounded-lg text-center transition duration-300 hover:bg-indigo-900"
        >
          Start Your Shop, Ignite Success!
        </Link>
        <Link
          to="/ShopList"
          className="block py-2 px-4 bg-indigo-950 text-white rounded-lg text-center transition duration-300 hover:bg-indigo-900"
        >
          Your Shop
        </Link>
      </div>
    </div>
  );
};

export default SellerPortal;
