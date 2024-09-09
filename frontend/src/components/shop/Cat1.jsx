import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cat1 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [pagePhones, setPagePhones] = useState(1);
  const [pageLaptops, setPageLaptops] = useState(1);
  const [pageCameras, setPageCameras] = useState(1);

  
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

  const electronicsProducts = products.filter((product) => product.category === 'Electronics');

 
  const paginateProducts = (subcategory, page) => {
    const filteredProducts = electronicsProducts.filter((product) => product.subcategory === subcategory);
    const indexOfLastProduct = page * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  
  const renderPagination = (subcategory, page, setPage) => {
    const totalProducts = electronicsProducts.filter((product) => product.subcategory === subcategory).length;
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
      <h1 className="text-2xl font-bold mb-6">Electronics</h1>

      
      {paginateProducts('Phones', pagePhones).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Phones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Phones', pagePhones).map((phone) => {
              const imageUrl = `http://localhost:5001/uploads/${phone.image}`;
              return (
                <div key={phone._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={phone.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{phone.productName}</h3>
                  <p>Price: ${phone.price}</p>
                  <p>Quantity: {phone.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Phones', pagePhones, setPagePhones)}
        </div>
      )}

      
      {paginateProducts('Laptops', pageLaptops).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Laptops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Laptops', pageLaptops).map((laptop) => {
              const imageUrl = `http://localhost:5001/uploads/${laptop.image}`;
              return (
                <div key={laptop._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={laptop.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{laptop.productName}</h3>
                  <p>Price: ${laptop.price}</p>
                  <p>Quantity: {laptop.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Laptops', pageLaptops, setPageLaptops)}
        </div>
      )}

      
      {paginateProducts('Cameras', pageCameras).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cameras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Cameras', pageCameras).map((camera) => {
              const imageUrl = `http://localhost:5001/uploads/${camera.image}`;
              return (
                <div key={camera._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={camera.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{camera.productName}</h3>
                  <p>Price: ${camera.price}</p>
                  <p>Quantity: {camera.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Cameras', pageCameras, setPageCameras)}
        </div>
      )}
    </div>
  );
};

export default Cat1;
