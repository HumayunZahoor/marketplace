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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {men.onSale === 'true' ? (
                    <>
                      <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                        -{men.priceOnSale}%
                      </div>
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                        ${men.price}
                      </div>
                    </>
                  ) : (
                    <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                      ${men.price}
                    </div>
                  )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl  hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-2xl" />
                      <span className="font-serif text-indigo-950 ml-2">Add</span>
                    </button>      
                    <button className="p-2 w-uto h-auto text-white rounded-3xl transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-2xl text-indigo-950 " />
                    </button> 
                  </div>
                <div className="flex justify-between items-end mt-4">
                  <h3 className="text-lg text-indigo-950 font-semibold">{men.productName}</h3>
                  <p className="text-lg text-indigo-950 font-semibold">Quantity: {men.quantity}</p>
                </div>
                <p className="text-lg text-indigo-950 font-semibold">Features: {men.features.join(',')}</p>
                <p className="text-lg text-indigo-950 font-semibold">Color: {men.colors.join(',')}</p> 
                <p className="text-lg text-indigo-950 font-semibold">Email: {men.email}</p>
                <p className="text-lg text-indigo-950 font-semibold">ShopID: {men.shopId}</p>
                <p className="text-lg text-indigo-950 font-semibold">Category: {men.category} = {men.subcategory}</p>
                <p className="text-lg text-indigo-950 font-semibold">On Sale: {men.onSale}</p>
                <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {men.priceOnSale}</p>
                <p className="text-lg text-indigo-950 font-semibold">Size: {men.size.join(',')}</p> 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Women', pageWomens).map((women) => {
              const imageUrl = `http://localhost:5001/uploads/${women.image}`;
              return (
                <div key={women._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  <div className="relative">
                    <img 
                      src={imageUrl} 
                      alt={women.productName} 
                      className="h-48 w-full object-fit rounded-md"
                      onError={() => { 
                        console.error('Image failed to load:', imageUrl);
                      }}
                    />
                     {women.onSale === 'true' ? (
                      <>
                        <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                          -{women.priceOnSale}%
                        </div>
                        <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                          ${women.price}
                        </div>
                      </>
                    ) : (
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                        ${women.price}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-2xl" />
                      <span className="font-serif text-indigo-950 ml-2">Add</span>
                    </button>      
                    <button className="p-2 w-uto h-auto text-white rounded-3xl transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-2xl text-indigo-950 " />
                    </button> 
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <h3 className="text-lg text-indigo-950 font-semibold">{women.productName}</h3>
                    <p className="text-lg text-indigo-950 font-semibold">Left in Stock: {women.quantity}</p>
                  
                  </div>
                   <p className="text-lg text-indigo-950 font-semibold">Features: {women.features.join(',')}</p>
                    <p className="text-lg text-indigo-950 font-semibold">Color: {women.colors.join(',')}</p> 
                    <p className="text-lg text-indigo-950 font-semibold">Email: {women.email}</p>
                    <p className="text-lg text-indigo-950 font-semibold">ShopID: {women.shopId}</p>
                    <p className="text-lg text-indigo-950 font-semibold">Category: {women.category} = {women.subcategory}</p>
                    <p className="text-lg text-indigo-950 font-semibold">On Sale: {women.onSale}</p>
                    <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {women.priceOnSale}</p>
                    <p className="text-lg text-indigo-950 font-semibold">Size: {women.size.join(',')}</p> 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Kids', pageKids).map((kids) => {
              const imageUrl = `http://localhost:5001/uploads/${kids.image}`;
              return (
                <div key={kids._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  <div className="relative">
                    <img 
                      src={imageUrl} 
                      alt={kids.productName} 
                      className="h-48 w-full object-fit rounded-md"
                      onError={() => { 
                        console.error('Image failed to load:', imageUrl);
                      }}
                    />
                     {kids.onSale === 'true' ? (
                      <>
                        <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                          -{kids.priceOnSale}%
                        </div>
                        <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                          ${kids.price}
                        </div>
                      </>
                    ) : (
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                        ${kids.price}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                      <FaShoppingCart className="text-2xl" />
                      <span className="font-serif text-indigo-950 ml-2">Add</span>
                    </button>      
                    <button className="p-2 w-uto h-auto text-white rounded-3xl transition-colors duration-300 flex items-center justify-center">
                      <FaHeart className="text-2xl text-indigo-950 " />
                    </button> 
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <h3 className="text-lg text-indigo-950 font-semibold">{kids.productName}</h3>
                    <p className="text-lg text-indigo-950 font-semibold">Left in Stock: {kids.quantity}</p>
                  </div>
                  <p className="text-lg text-indigo-950 font-semibold">Features: {kids.features.join(',')}</p>
                <p className="text-lg text-indigo-950 font-semibold">Color: {kids.colors.join(',')}</p> 
                <p className="text-lg text-indigo-950 font-semibold">Email: {kids.email}</p>
                <p className="text-lg text-indigo-950 font-semibold">ShopID: {kids.shopId}</p>
                <p className="text-lg text-indigo-950 font-semibold">Category: {kids.category} = {kids.subcategory}</p>
                <p className="text-lg text-indigo-950 font-semibold">On Sale: {kids.onSale}</p>
                <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {kids.priceOnSale}</p>
                <p className="text-lg text-indigo-950 font-semibold">Size: {kids.size.join(',')}</p> 
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
