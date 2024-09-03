import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddProducts = () => {
  const { user, shopId } = useSelector((state) => state.auth);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([]);

  const [subcategories, setSubcategories] = useState([]);

  const categories = {
    'Electronics': ['Phones', 'Laptops', 'Cameras'],
    'Fashion': ['Men', 'Women', 'Kids'],
    'Home & Garden': ['Furniture', 'Decor', 'Gardening'],
    'Beauty & Health': ['Skincare', 'Makeup', 'Wellness'],
    'Automotive': ['Parts', 'Accessories', 'Tools'],
    'Sports & Outdoors': ['Fitness', 'Camping', 'Cycling'],
    'Toys & Games': ['Outdoor', 'Educational', 'Video Games'],
    'Books & Media': ['Books', 'Movies', 'Music'],
    'Services': ['Cleaning', 'Repair', 'Consulting'],
    'Food & Beverages': ['Snacks', 'Beverages', 'Groceries'],
  };

  useEffect(() => {
    if (category) {
      setSubcategories(categories[category] || []);
      setSubcategory(''); // Reset subcategory when category changes
    } else {
      setSubcategories([]);
      setSubcategory('');
    }
  }, [category]);

  const handleColorChange = (e) => {
    setColors(e.target.value.split(','));
  };

  const handleFeaturesChange = (e) => {
    setFeatures(e.target.value.split(','));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('colors', JSON.stringify(colors));
    formData.append('features', JSON.stringify(features));
    formData.append('image', image);
    formData.append('email', user.email);
    formData.append('shopId', shopId);

    try {
      const response = await axios.post('http://localhost:5001/api/products/add-products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {subcategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory:</label>
            <select 
              value={subcategory} 
              onChange={(e) => setSubcategory(e.target.value)} 
              required 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Colors (comma separated):</label>
          <input 
            type="text" 
            value={colors.join(',')} 
            onChange={handleColorChange} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image:</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            required 
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Features (comma separated):</label>
          <input 
            type="text" 
            value={features.join(',')} 
            onChange={handleFeaturesChange} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
