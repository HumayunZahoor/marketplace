import express from 'express';
import { createShop, getShops } from '../controllers/shopController.js';

const shopRoutes = express.Router();

shopRoutes.post('/create-shop', createShop);
shopRoutes.get('/all-shops', getShops);

export default shopRoutes;
