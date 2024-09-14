import express from 'express';
import { toggleWishlist , getUserWishlist} from '../controllers/wishlistController.js';

const wishlistRoutes = express.Router();

wishlistRoutes.post('/added-to-wishlist', toggleWishlist);

wishlistRoutes.get('/get-wishlist/:userEmail' , getUserWishlist);

export default wishlistRoutes;
