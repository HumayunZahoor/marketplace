import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cat4 = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageSkincare, setPageSkincare] = useState(0);
  const [pageMakeup, setPageMakeup] = useState(0);
  const [pageWellness, setPageWellness] = useState(0);

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

  const beautyAndHealthProducts = products.filter((product) => product.category === 'Beauty & Health');

  const paginateProducts = (subcategory, page) => {
    const filteredProducts = beautyAndHealthProducts.filter((product) => product.subcategory === subcategory);
    const indexOfLastProduct = (page + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageClick = (selectedPage, subcategory) => {
    const newPage = selectedPage.selected;
    if (subcategory === 'Skincare') setPageSkincare(newPage);
    if (subcategory === 'Makeup') setPageMakeup(newPage);
    if (subcategory === 'Wellness') setPageWellness(newPage);
  };

  const renderPagination = (subcategory, currentPage) => {
    const totalProducts = beautyAndHealthProducts.filter((product) => product.subcategory === subcategory).length;
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


  if (!isLoggedIn) {
    return (
      <div className="text-red-700 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <Link to="/login" className="py-2 px-4 rounded bg-red-500 text-white transition duration-300 hover:bg-red-600">
          You are not logged in! Please login to buy or view these products...Click Here!
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Beauty & Health</h1>

      {paginateProducts('Skincare', pageSkincare).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skincare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Skincare', pageSkincare).map((skincare) => {
              const imageUrl = `http://localhost:5001/uploads/${skincare.image}`;
              return (
                <div key={skincare._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={skincare.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{skincare.productName}</h3>
                  <p>Price: ${skincare.price}</p>
                  <p>Quantity: {skincare.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Skincare', pageSkincare)}
        </div>
      )}

      {paginateProducts('Makeup', pageMakeup).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Makeup</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Makeup', pageMakeup).map((makeup) => {
              const imageUrl = `http://localhost:5001/uploads/${makeup.image}`;
              return (
                <div key={makeup._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={makeup.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{laptop.productName}</h3>
                  <p>Price: ${makeup.price}</p>
                  <p>Quantity: {makeup.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Makeup', pageMakeup)}
        </div>
      )}

      {paginateProducts('Wellness', pageWellness).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wellness</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Wellness', pageWellness).map((wellness) => {
              const imageUrl = `http://localhost:5001/uploads/${wellness.image}`;
              return (
                <div key={wellness._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={wellness.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{wellness.productName}</h3>
                  <p>Price: ${wellness.price}</p>
                  <p>Quantity: {wellness.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Wellness', pageWellness)}
        </div>
      )}
    </div>
  );
};

export default Cat4;
