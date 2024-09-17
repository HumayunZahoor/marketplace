import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddProducts = () => {
  const { user, shopId } = useSelector((state) => state.auth);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [size, setSize] = useState([]);

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
    'Food & Drinks': ['Snacks', 'Drinks', 'Groceries'],
  };

  const sizeCategories = ['Fashion', 'Home & Garden', 'Beauty & Health', 'Automotive', 'Sports & Outdoors', 'Toys & Games'];

  useEffect(() => {
    if (category) {
      setSubcategories(categories[category] || []);
      setSubcategory('');
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

  const handleSizeChange = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && validImageTypes.includes(file.type)) {
      setImage(file);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('colors', JSON.stringify(colors));
    formData.append('features', JSON.stringify(features));
    formData.append('size', JSON.stringify(size));
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

      // setCategory('');
      // setSubcategory('');
      // setProductName('');
      // setPrice('');
      // setQuantity('');
      // setColors([]);
      // setImage(null);
      // setFeatures([]);
      // setSize([]);

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-indigo-950">
      <h2 className="text-2xl font-semibold mb-6 text-center m-16">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-indigo-950">
        <div>
          <label className="block font-semibold mb-1">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
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
            <label className="block font-semibold mb-1">Subcategory:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
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
          <label className="block font-semibold mb-1">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Colors (comma separated):</label>
          <input
            type="text"
            value={colors.join(',')}
            onChange={handleColorChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        {sizeCategories.includes(category) && (
          <div>
            <label className="block font-semibold mb-1">Size (comma separated):</label>
            <input
              type="text"
              value={size.join(',')}
              onChange={handleSizeChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
            />
          </div>
        )}
        <div>
          <label className="block font-semibold mb-1">Product Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Features/Size (comma separated):</label>
          <input
            type="text"
            value={features.join(',')}
            onChange={handleFeaturesChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-950"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-950 text-white p-2 rounded-lg hover:bg-indigo-900 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
