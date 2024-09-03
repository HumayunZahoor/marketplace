import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Shop = mongoose.model('shop', shopSchema);

export default Shop;
