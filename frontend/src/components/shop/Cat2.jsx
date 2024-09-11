import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Cat2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageMens, setPageMens] = useState(0);
  const [pageWomens, setPageWomens] = useState(0);
  const [pageKids, setPageKids] = useState(0);

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

  const paginateProducts = (subcategory, page) => {
    const filteredProducts = fashionProducts.filter((product) => product.subcategory === subcategory);
    const indexOfLastProduct = (page + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageClick = (selectedPage, subcategory) => {
    const newPage = selectedPage.selected;
    if (subcategory === 'Men') setPageMens(newPage);
    if (subcategory === 'Women') setPageWomens(newPage);
    if (subcategory === 'Kids') setPageKids(newPage);
  };

  const renderPagination = (subcategory, currentPage) => {
    const totalProducts = fashionProducts.filter((product) => product.subcategory === subcategory).length;
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
      <h1 className="text-2xl font-bold mb-6">Fashions</h1>

      {paginateProducts('Men', pageMens).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Mens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Men', pageMens).map((men) => {
              const imageUrl = `http://localhost:5001/uploads/${men.image}`;
              return (
                <div key={men._id} className="bg-white p-4 rounded-lg shadow-md relative">
                <div className='relative'>
                  <img 
                    src={imageUrl} 
                    alt={men.productName} 
                    className="h-48 w-full object-fit rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <div className="absolute top-0 right-0 p-2 bg-white text-indigo-950 m-1 text-2xl rounded-3xl font-serif font-bold ">
                      ${men.price}
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
                  <h3 className="text-lg font-semibold">{men.productName}</h3>
                  <p className="text-lg font-semibold">Quantity: {men.quantity}</p>
                </div>
                </div>
              );
            })}
          </div>
          {renderPagination('Men', pageMens)}
        </div>
      )}

      {paginateProducts('Women', pageWomens).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Women</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Women', pageWomens).map((women) => {
              const imageUrl = `http://localhost:5001/uploads/${women.image}`;
              return (
                <div key={women._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={women.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{women.productName}</h3>
                  <p>Price: ${women.price}</p>
                  <p>Quantity: {women.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Women', pageWomens)}
        </div>
      )}

      {paginateProducts('Kids', pageKids).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kids</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginateProducts('Kids', pageKids).map((kids) => {
              const imageUrl = `http://localhost:5001/uploads/${kids.image}`;
              return (
                <div key={kids._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src={imageUrl} 
                    alt={kids.productName} 
                    className="h-48 w-full object-contain mb-4 rounded-md"
                    onError={() => { 
                      console.error('Image failed to load:', imageUrl);
                    }}
                  />
                  <h3 className="text-lg font-semibold">{kids.productName}</h3>
                  <p>Price: ${kids.price}</p>
                  <p>Quantity: {kids.quantity}</p>
                </div>
              );
            })}
          </div>
          {renderPagination('Kids', pageKids)}
        </div>
      )}
    </div>
  );
};

export default Cat2;
