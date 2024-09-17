import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UpdateProducts = () => {
  const { user, shopId } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({}); 

  
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

  
  const handleInputChange = (e, productId) => {
    const { name, value, files } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [name]: name === 'image' ? files[0] : value,
      },
    }));
  };
  

 
  const handleArrayInputChange = (e, productId) => {
    const { name, value } = e.target;

   
    setFormData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [name]: value.split(',').map((item) => item.trim()),
      },
    }));
  };

  
  const handleUpdateProduct = async (productId) => {
    const productFormData = new FormData();
  
    for (const key in formData[productId]) {
      if (key === 'image') {
        productFormData.append(key, formData[productId][key]);
      } else if (key === 'features' || key === 'colors' || key === 'size') {
        productFormData.append(key, JSON.stringify(formData[productId][key])); 
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
      <h1 className="text-3xl font-bold mb-6 text-indigo-950">Manage Products</h1>
      <p className="mb-4 text-lg text-gray-700">
        Email of logged-in user: <span className="font-semibold">{user.email}</span>
      </p>
      <p className="mb-8 text-lg text-gray-700">
        Shop ID: <span className="font-semibold">{shopId}</span>
      </p>
  
      <div className="space-y-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-950">{product.productName}</h3>
  
            <input
              type="text"
              name="category"
              placeholder="Category"
              defaultValue={product.category}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="subcategory"
              placeholder="Subcategory"
              defaultValue={product.subcategory}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              defaultValue={product.productName}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              defaultValue={product.price}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              defaultValue={product.quantity}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="colors"
              placeholder="Colors (comma separated)"
              defaultValue={product.colors.join(',')}
              onChange={(e) => handleArrayInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="features"
              placeholder="Features (comma separated)"
              defaultValue={product.features.join(',')}
              onChange={(e) => handleArrayInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="size"
              placeholder="Size (comma separated)"
              defaultValue={product.size.join(',')}
              onChange={(e) => handleArrayInputChange(e, product._id)}
              className="mt-3 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-3 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-indigo-950 hover:file:bg-indigo-100"
            />
  
            <div className="flex justify-start space-x-4 mt-6">
              <button
                type="button"
                onClick={() => handleUpdateProduct(product._id)}
                className="py-2 px-6 bg-indigo-950 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-900"
              >
                Update Product
              </button>
  
              <button
                type="button"
                onClick={() => handleDeleteProduct(product._id)}
                className="py-2 px-6 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-500"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default UpdateProducts;
