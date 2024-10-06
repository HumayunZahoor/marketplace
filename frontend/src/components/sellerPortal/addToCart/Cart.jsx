import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Cart = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [wishlists, setWishlists] = useState([]);

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

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-indigo-950">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            {wishlists.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Product ID</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlists.map((wishlist, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="border px-4 py-2">{wishlist.productId}</td>
                                <td className="border px-4 py-2">
                                    {wishlist.status ? 'Active' : 'Inactive'}
                                </td>
                                <td className="border px-4 py-2" >{wishlist.userEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">No wishlist items found.</p>
            )}
        </div>
    );
};

export default Cart;
