import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['SuperAdmin', 'Seller', 'Visitor'], 
    default: 'Visitor' 
  },
  password: { 
    type: String, 
    required: true 
  },
  image: {
    type: String, 
    required: false
  },
  balance : { 
    type: Number, 
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', userSchema);

export default User;
