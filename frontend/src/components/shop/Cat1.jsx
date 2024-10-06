import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cat1 = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagePhones, setPagePhones] = useState(0);
  const [pageLaptops, setPageLaptops] = useState(0);
  const [pageCameras, setPageCameras] = useState(0);

  const [wishlists, setWishlists] = useState([]);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products/product-by-category');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishLists = async () => {
      if (!isLoggedIn || !user?.email) return;
      try {
        const response = await axios.get(`http://localhost:5001/api/wishlist/get-wishlist/${user.email}`);
        setWishlists(response.data);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishLists();
  }, [isLoggedIn, user?.email]);

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

  const handleIconClick = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5001/api/wishlist/added-to-wishlist', {
        userEmail: user.email,
        productId
      });

      const newStatus = JSON.parse(response.data.status);

      setWishlists((prevWishlists) => {
        const updatedWishlist = prevWishlists.map((item) =>
          item.productId === productId ? { ...item, status: newStatus } : item
        );

        if (!updatedWishlist.find((item) => item.productId === productId)) {
          updatedWishlist.push({ productId, status: newStatus });
        }

        return updatedWishlist;
      });
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  const isProductInWishlist = (productId) => {
    const wishlistItem = wishlists.find((item) => item.productId === productId);
    return wishlistItem ? wishlistItem.status : false;
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
      {/*  <p className="text-2xl font-bold mb-6">email ({user.email}) and name ({user.name}) of logged in user</p> */}
      <h1 className="text-4xl text-center font-bold mb-8 text-indigo-950 tracking-wide bg-gradient-to-r from-indigo-950 to-indigo-900 text-transparent bg-clip-text">
        Electronics
      </h1>


      {paginateProducts('Phones', pagePhones).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl text-indigo-950 font-semibold mb-4">Phones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Phones', pagePhones).map((phone) => {
              const imageUrl = `http://localhost:5001/uploads/${phone.image}`;
              const inWishlist = isProductInWishlist(phone._id);
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
                    {phone.onSale === 'true' ? (
                      <>
                        <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                          -{phone.priceOnSale}%
                        </div>
                        <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                          ${phone.price}
                        </div>
                      </>
                    ) : (
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                        ${phone.price}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <h3 className="text-2xl text-indigo-950 font-semibold">{phone.productName}</h3>
                    <div className="flex space-x-2 items-center">
                      <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl hover:text-indigo-900 transition-colors duration-300 flex items-center justify-center">
                        <FaShoppingCart className="text-2xl" />
                      </button>
                      <button
                        onClick={() => handleIconClick(phone._id)}
                        className={`text-2xl ${inWishlist ? 'text-red-700' : 'text-gray-400'}`}
                      >
                        <FaHeart />
                      </button>

                    </div>
                  </div>
                  {phone.quantity >= 20 ? (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Stock Available: {phone.quantity}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Hurry up! Only <span className="text-red-700">{phone.quantity}</span> Remaining</p>
                    </div>
                  )}
                {/*  <p className="text-lg text-indigo-950 font-semibold">Features: {phone.features.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Color: {phone.colors.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop Owner's Email: {phone.email}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop ID: {phone.shopId}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Category: {phone.category} = {phone.subcategory}</p>
                  <p className="text-lg text-indigo-950 font-semibold">On Sale: {phone.onSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {phone.priceOnSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Product Id: {phone._id}</p> */}
                </div>
              );
            })}
          </div>
          {renderPagination('Phones', pagePhones)}
        </div>
      )}

      {paginateProducts('Laptops', pageLaptops).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl text-indigo-950 font-semibold mb-4">Laptops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Laptops', pageLaptops).map((laptop) => {
              const imageUrl = `http://localhost:5001/uploads/${laptop.image}`;
              const inWishlist = isProductInWishlist(laptop._id);
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
                    {laptop.onSale === 'true' ? (
                      <>
                        <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                          -{laptop.priceOnSale}%
                        </div>
                        <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                          ${laptop.price}
                        </div>
                      </>
                    ) : (
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                        ${laptop.price}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <h3 className="text-2xl text-indigo-950 font-semibold">{laptop.productName}</h3>
                    <div className="flex space-x-2 items-center">
                      <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                        <FaShoppingCart className="text-2xl" />
                      </button>
                      <button
                        onClick={() => handleIconClick(laptop._id)}
                        className={`text-2xl ${inWishlist ? 'text-red-700' : 'text-gray-400'}`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                  {laptop.quantity >= 20 ? (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Stock Available: {laptop.quantity}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Hurry up! Only <span className="text-red-700">{laptop.quantity}</span> Remaining</p>
                    </div>
                  )}
                  {/* <p className="text-lg text-indigo-950 font-semibold">Features: {laptop.features.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Color: {laptop.colors.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop Owner's Email: {laptop.email}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop ID: {laptop.shopId}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Category: {laptop.category} = {laptop.subcategory}</p>
                  <p className="text-lg text-indigo-950 font-semibold">On Sale: {laptop.onSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {laptop.priceOnSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Product Id: {laptop._id}</p> */}
                </div>
              );
            })}
          </div>
          {renderPagination('Laptops', pageLaptops)}
        </div>
      )}

      {paginateProducts('Cameras', pageCameras).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl text-indigo-950 font-semibold mb-4">Cameras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateProducts('Cameras', pageCameras).map((camera) => {
              const imageUrl = `http://localhost:5001/uploads/${camera.image}`;
              const inWishlist = isProductInWishlist(camera._id);
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
                    {camera.onSale === 'true' ? (
                      <>
                        <div className="absolute top-0 left-0 p-1 mt-1 bg-green-800 text-white rounded-e-3xl font-serif font-bold">
                          -{camera.priceOnSale}%
                        </div>
                        <div className="absolute top-0 right-0 p-1 mt-1 bg-green-800 text-white rounded-s-3xl font-serif font-bold">
                          ${camera.price}
                        </div>
                      </>
                    ) : (
                      <div className="absolute top-0 right-0 p-1 mt-1 bg-red-700 text-white rounded-s-3xl font-serif font-bold">
                        ${camera.price}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end space-x-2 mt-3">
                    <h3 className="text-2xl text-indigo-950 font-semibold">{camera.productName}</h3>
                    <div className="flex space-x-2 items-center">
                      <button className="p-2 w-auto h-auto text-indigo-950 rounded-3xl hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                        <FaShoppingCart className="text-2xl" />
                      </button>
                      <button
                        onClick={() => handleIconClick(camera._id)}
                        className={`text-2xl ${inWishlist ? 'text-red-700' : 'text-gray-400'}`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                  {camera.quantity >= 20 ? (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Stock Available: {camera.quantity}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-end mt-4">
                      <p className="text-lg text-indigo-950 font-semibold">Hurry up! Only <span className="text-red-700">{camera.quantity}</span> Remaining</p>
                    </div>
                  )}
                  {/* <p className="text-lg text-indigo-950 font-semibold">Features: {camera.features.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Color: {camera.colors.join(', ')}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop Owner's Email: {camera.email}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Shop ID: {camera.shopId}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Category: {camera.category} = {camera.subcategory}</p>
                  <p className="text-lg text-indigo-950 font-semibold">On Sale: {camera.onSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">-% On Sale: {camera.priceOnSale}</p>
                  <p className="text-lg text-indigo-950 font-semibold">Product Id: {camera._id}</p> */}
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
