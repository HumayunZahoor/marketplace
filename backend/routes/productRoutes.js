import express from 'express';
import multer from 'multer';
import path from 'path';  
import { addProduct , getProductsByShop , updateProduct , deleteProduct } from '../controllers/productController.js';

const productRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

productRoutes.post('/add-products', upload.single('image'), addProduct);


productRoutes.get('/all-products-by-shopid/:shopId', getProductsByShop);


productRoutes.put('/update-product/:productId', upload.single('image'), updateProduct);


productRoutes.delete('/delete-product/:productId', deleteProduct);

export default productRoutes;
