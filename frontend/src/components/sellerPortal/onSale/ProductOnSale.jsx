import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductOnSale = () => {
  const { user, shopId } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});

  // Fetch products by shop ID
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

  // Handle input changes for each product
  const handleInputChange = (e, productId) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  // Handle product update
  const handleUpdateProduct = async (productId) => {
    const productData = formData[productId];
    try {
      await axios.put(
        `http://localhost:5001/api/products/products-on-sale/${productId}`,
        productData, // send as JSON
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Products On Sale</h1>
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

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              defaultValue={product.productName}
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-96 p-2 border border-gray-300 rounded-md shadow-sm"
            />

            <input
              type="number"
              name="price"
              placeholder="Original Price"
              defaultValue={product.price}
              disabled
              className="mt-1 block w-96 p-2 border border-gray-300 rounded-md shadow-sm"
            />

            <input
              type="number"
              name="priceOnSale"
              placeholder="Discount Percentage (e.g. 30)"
              onChange={(e) => handleInputChange(e, product._id)}
              className="mt-1 block w-96 p-2 border border-gray-300 rounded-md shadow-sm"
              disabled={!formData[product._id]?.onSale}
            />

            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="onSale"
                onChange={(e) => handleInputChange(e, product._id)}
                checked={formData[product._id]?.onSale || false}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">On Sale</span>
            </label>

            <button
              type="button"
              onClick={() => handleUpdateProduct(product._id)}
              className="mt-4 h-12 w-30 py-2 px-4 bg-indigo-900 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
            >
              Update Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOnSale;
