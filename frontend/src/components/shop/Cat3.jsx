import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cat3 = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageFurniture, setPageFurniture] = useState(0);
  const [pageDecore, setPageDecore] = useState(0);
  const [pageGardening, setPageGardening] = useState(0);

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
    const indexOfLastProduct = (page + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageClick = (page, subcategory) => {
    const selectedPage = page.selected;
    if (subcategory === 'Furniture') setPageFurniture(selectedPage);
    if (subcategory === 'Decor') setPageDecore(selectedPage);
    if (subcategory === 'Gardening') setPageGardening(selectedPage);
  };

  const renderPagination = (subcategory, currentPage) => {
    const totalProducts = homeAndGardenProducts.filter((product) => product.subcategory === subcategory).length;
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
          {renderPagination('Furniture', pageFurniture)}
        </div>
      )}

      {paginateProducts('Decor', pageDecore).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Decor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Decor', pageDecore).map((decor) => {
              const imageUrl = `http://localhost:5001/uploads/${decor.image}`;
              return (
                <div key={decor._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={decor.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={(e) => { 
                      e.target.src = '/path/to/placeholder/image.jpg'; 
                    }}
                  />
                  <h3 className="text-lg font-semibold">{decor.productName}</h3>
                  <p>Price: ${decor.price}</p>
                  <p>Quantity: {decor.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Decor', pageDecore)}
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
          {renderPagination('Gardening', pageGardening)}
        </div>
      )}
    </div>
  );
};

export default Cat3;
