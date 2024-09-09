import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cat3 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageFurniture, setPageFurniture] = useState(1);
  const [pageDecore, setPageDecore] = useState(1);
  const [pageGardening, setPageGardening] = useState(1);

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

  const homeAndGardenProducts = products.filter((product) => product.category === 'Home & Garden');

  const paginateProducts = (subcategory, page) => {
    const filteredProducts = homeAndGardenProducts.filter((product) => product.subcategory === subcategory);
    const indexOfLastProduct = page * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const renderPagination = (subcategory, page, setPage) => {
    const totalProducts = homeAndGardenProducts.filter((product) => product.subcategory === subcategory).length;
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
      <h1 className="text-2xl font-bold mb-6">Home & Garden</h1>

      {paginateProducts('Furniture', pageFurniture).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Furniture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Furniture', pageFurniture).map((furniture) => {
              const imageUrl = `http://localhost:5001/uploads/${furniture.image}`;
              return (
                <div key={furniture._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={furniture.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={(e) => { 
                      e.target.src = '/path/to/placeholder/image.jpg'; 
                    }}
                  />
                  <h3 className="text-lg font-semibold">{furniture.productName}</h3>
                  <p>Price: ${furniture.price}</p>
                  <p>Quantity: {furniture.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Furniture', pageFurniture, setPageFurniture)}
        </div>
      )}

      {paginateProducts('Decore', pageDecore).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Decore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Decore', pageDecore).map((decore) => {
              const imageUrl = `http://localhost:5001/uploads/${decore.image}`;
              return (
                <div key={decore._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={decore.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={(e) => { 
                      e.target.src = '/path/to/placeholder/image.jpg'; 
                    }}
                  />
                  <h3 className="text-lg font-semibold">{decore.productName}</h3>
                  <p>Price: ${decore.price}</p>
                  <p>Quantity: {decore.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Decore', pageDecore, setPageDecore)}
        </div>
      )}

      {paginateProducts('Gardening', pageGardening).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Gardening</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Gardening', pageGardening).map((gardening) => {
              const imageUrl = `http://localhost:5001/uploads/${gardening.image}`;
              return (
                <div key={gardening._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={gardening.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={(e) => { 
                      e.target.src = '/path/to/placeholder/image.jpg'; 
                    }}
                  />
                  <h3 className="text-lg font-semibold">{gardening.productName}</h3>
                  <p>Price: ${gardening.price}</p>
                  <p>Quantity: {gardening.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Gardening', pageGardening, setPageGardening)}
        </div>
      )}
    </div>
  );
};

export default Cat3;
