import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cat2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to handle pagination
  const [pageMen, setPageMen] = useState(1);
  const [pageWomen, setPageWomen] = useState(1);
  const [pageKids, setPageKids] = useState(1);
  
  // Items per page
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products/product-by-category');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const fashionProducts = products.filter((product) => product.category === 'Fashion');

  // Helper function to paginate products
  const paginateProducts = (subcategory, page) => {
    const filteredProducts = fashionProducts.filter((product) => product.subcategory === subcategory);
    const indexOfLastProduct = page * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  // Function to render pagination buttons
  const renderPagination = (subcategory, page, setPage) => {
    const totalProducts = fashionProducts.filter((product) => product.subcategory === subcategory).length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`py-2 px-4 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    return <div className="flex space-x-2 mt-4">{pages}</div>;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Fashion</h1>

      {/* Men Section */}
      {paginateProducts('Men', pageMen).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Men</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Men', pageMen).map((product) => {
              const imageUrl = `http://localhost:5001/uploads/${product.image}`;
              return (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={product.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Men', pageMen, setPageMen)}
        </div>
      )}

      {/* Women Section */}
      {paginateProducts('Women', pageWomen).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Women</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Women', pageWomen).map((product) => {
              const imageUrl = `http://localhost:5001/uploads/${product.image}`;
              return (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={product.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Women', pageWomen, setPageWomen)}
        </div>
      )}

      {/* Kids Section */}
      {paginateProducts('Kids', pageKids).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kids</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Kids', pageKids).map((product) => {
              const imageUrl = `http://localhost:5001/uploads/${product.image}`;
              return (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={product.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Kids', pageKids, setPageKids)}
        </div>
      )}
    </div>
  );
};

export default Cat2;
