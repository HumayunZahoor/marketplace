import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: 'User',
    required: true,
  },
  productId: {
    type: String,
    ref: 'Product',
    required: true,
  },
  status: {
    type: Boolean,
    default: false, 
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
