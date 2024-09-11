import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Cat1 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagePhones, setPagePhones] = useState(0);
  const [pageLaptops, setPageLaptops] = useState(0);
  const [pageCameras, setPageCameras] = useState(0);

  const itemsPerPage = 4;

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
    const indexOfLastProduct = (page + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageClick = (selectedPage, subcategory) => {
    const newPage = selectedPage.selected;
    if (subcategory === 'Phones') setPagePhones(newPage);
    if (subcategory === 'Laptops') setPageLaptops(newPage);
    if (subcategory === 'Cameras') setPageCameras(newPage);
  };

  const renderPagination = (subcategory, currentPage) => {
    const totalProducts = electronicsProducts.filter((product) => product.subcategory === subcategory).length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    return (
      <ReactPaginate
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(page) => handlePageClick(page, subcategory)}
        containerClassName="flex justify-center space-x-2 mt-4"
        pageClassName="inline-flex items-center justify-center w-auto h-auto rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        pageLinkClassName="flex items-center justify-center w-full h-full"
        activeClassName="bg-blue-500 text-white border-blue-500"
        previousLabel="Previous"
        nextLabel="Next"
        previousClassName="inline-flex items-center justify-center w-auto h-auto rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        nextClassName="inline-flex items-center justify-center w-auto h-auto rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        breakLabel="..."
        breakClassName="inline-flex items-center justify-center w-auto h-auto rounded-md border border-gray-300 bg-white text-gray-700"
      />
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Electronics</h1>

      {paginateProducts('Phones', pagePhones).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Phones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Phones', pagePhones).map((phone) => {
              const imageUrl = `http://localhost:5001/uploads/${phone.image}`;
              return (
                <div key={phone._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  <div className="relative">
                    <img 
                      src={imageUrl} 
                      alt={phone.productName} 
                      className="h-48 w-full object-fit rounded-md"
                      onError={() => { 
                        console.error('Image failed to load:', imageUrl);
                      }}
                    />
                    <div className="absolute top-0 right-0 p-2 bg-white text-indigo-950 m-1 text-2xl rounded-3xl font-serif font-bold ">
                      ${phone.price}
                    </div>
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-xl" />
                    </button>                  
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-xl" />
                    </button> 
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <h3 className="text-lg font-semibold">{phone.productName}</h3>
                    <p className="text-lg font-semibold">Quantity: {phone.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {renderPagination('Phones', pagePhones)}
        </div>
      )}

      {paginateProducts('Laptops', pageLaptops).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Laptops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Laptops', pageLaptops).map((laptop) => {
              const imageUrl = `http://localhost:5001/uploads/${laptop.image}`;
              return (
                <div key={laptop._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={laptop.productName}
                      className="h-48 w-full object-fit rounded-md"
                      onError={() => {
                        console.error('Image failed to load:', imageUrl);
                      }}
                    />
                    <div className="absolute top-0 right-0 p-2 bg-white text-indigo-950 m-1 text-2xl rounded-3xl font-serif font-bold  ">
                      ${laptop.price}
                    </div>
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-xl" />
                    </button>
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <h3 className="text-lg font-semibold">{laptop.productName}</h3>
                    <p className="text-lg font-semibold">Quantity: {laptop.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {renderPagination('Laptops', pageLaptops)}
        </div>
      )}

      {paginateProducts('Cameras', pageCameras).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cameras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Cameras', pageCameras).map((camera) => {
              const imageUrl = `http://localhost:5001/uploads/${camera.image}`;
              return (
                <div key={camera._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={camera.productName}
                      className="h-48 w-full object-fit rounded-md"
                      onError={() => {
                        console.error('Image failed to load:', imageUrl);
                      }}
                    />
                    <div className="absolute top-0 right-0 p-2 bg-white text-indigo-950 m-1 text-2xl rounded-3xl font-serif font-bold ">
                      ${camera.price}
                    </div>
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-xl" />
                    </button>
                    <button className="p-2 w-[150px] h-[40px] bg-indigo-950 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <h3 className="text-lg font-semibold">{camera.productName}</h3>
                    <p className="text-lg font-semibold">Quantity: {camera.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {renderPagination('Cameras', pageCameras)}
        </div>
      )}
    </div>
  );
};

export default Cat1;
