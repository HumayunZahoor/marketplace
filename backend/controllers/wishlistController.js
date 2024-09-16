import Wishlist from '../models/Wishlist.js';

export const toggleWishlist = async (req, res) => {
  const { userEmail, productId } = req.body;

  try {
    let wishlistItem = await Wishlist.findOne({ userEmail, productId });

    if (wishlistItem) {
      
      wishlistItem.status = !wishlistItem.status;
      await wishlistItem.save();
      return res.json({ message: 'Wishlist item updated', status: wishlistItem.status });
    } else {
      
      wishlistItem = new Wishlist({ userEmail, productId, status: true });
      await wishlistItem.save();
      return res.json({ message: 'Wishlist item added', status: wishlistItem.status });
    }
  } catch (err) {
    console.error('Error updating wishlist:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


//-----------------------------------------------------

export const getUserWishlist = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userEmail: req.params.userEmail, status: true }); 
    res.json(wishlists);
  } catch (error) {
    console.error('Error fetching wishlists:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// export const getUserWishlist = async (req, res) => {
//     const { userEmail } = req.query;
  
//     try {
//       const wishlistItems = await Wishlist.find({ userEmail, status: true }).select('productId');
//       const likedProductIds = wishlistItems.map(item => item.productId.toString());
//       return res.json({ likedProductIds });
//     } catch (err) {
//       console.error('Error fetching user wishlist:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };