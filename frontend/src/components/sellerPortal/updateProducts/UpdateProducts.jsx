import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UpdateProducts = () => {
  const { user, shopId } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({}); // Using a regular object to handle input changes

  // Fetch products based on shopId
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/all-products-by-shopid/${shopId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (shopId) {
      fetchProducts();
    }
  }, [shopId]);

  // Handle form input changes
  const handleInputChange = (e, productId) => {
    const { name, value, files } = e.target;

    // Update the formData for the specific product
    setFormData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [name]: name === 'image' ? files[0] : value,
      },
    }));
  };

  // Handle array fields like features and colors
  const handleArrayInputChange = (e, productId) => {
    const { name, value } = e.target;

    // Split comma-separated values into an array and trim whitespaces
    setFormData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [name]: value.split(',').map((item) => item.trim()),
      },
    }));
  };

  // Update product handler
  const handleUpdateProduct = async (productId) => {
    const productFormData = new FormData();

    // Append data from formData state
    for (const key in formData[productId]) {
      if (key === 'image') {
        productFormData.append(key, formData[productId][key]);
      } else if (key === 'features' || key === 'colors') {
        productFormData.append(key, JSON.stringify(formData[productId][key])); // Send as JSON string
      } else {
        productFormData.append(key, formData[productId][key]);
      }
    }

    try {
      await axios.put(`http://localhost:5001/api/products/update-product/${productId}`, productFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/delete-product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <p className="mb-4 text-lg text-gray-700">
        Email of logged-in user: <span className="font-semibold">{user.email}</span>
      </p>
      <p className="mb-8 text-lg text-gray-700">
        ID of the shop: <span className="font-semibold">{shopId}</span>
      </p>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{product.productName}</h3>
            {/* Product fields */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              defaultValue={product.category}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="subcategory"
              placeholder="Subcategory"
              defaultValue={product.subcategory}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              defaultValue={product.productName}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              defaultValue={product.price}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="colors"
              placeholder="Colors (comma separated)"
              defaultValue={product.colors.join(',')}
              onChange={(e) => handleArrayInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="features"
              placeholder="Features (comma separated)"
              defaultValue={product.features.join(',')}
              onChange={(e) => handleArrayInputChange(e, product._id)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />

            {/* Update Button */}
            <button
              type="button"
              onClick={() => handleUpdateProduct(product._id)}
              className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
            >
              Update Product
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteProduct(product._id)}
              className="mt-2 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProducts;
