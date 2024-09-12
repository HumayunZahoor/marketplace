import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true 
  },
  subcategory: { 
    type: String, 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  colors: { 
    type: [String], 
  },
  image: { 
    type: String, 
    required: true 
  },
  features: { 
    type: [String], 
  },
  email: { 
    type: String, 
    required: true 
  },
  shopId: { 
    type: String, 
    required: true 
  },
  onSale: { 
    type: String, 
    default: false, 
  },
  priceOnSale: {
    type: Number,
    default: null,
  },
  size: {
    type: [String],
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
