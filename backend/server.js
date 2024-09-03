import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import path from 'path';  
import { fileURLToPath } from 'url'; 

import User from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/MarketPlace')
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      const existingSuperAdmin = await User.findOne({ email: 'humayuncs009@gmail.com' });
      if (!existingSuperAdmin) {
        const hashedPassword = await bcrypt.hash('12345', 10);
        const superAdmin = new User({
          name: 'Humayun',
          email: 'humayuncs009@gmail.com',
          role: 'SuperAdmin',
          password: hashedPassword
        });
        await superAdmin.save();
        console.log('SuperAdmin created');
      } else {
        console.log('SuperAdmin already exists');
      }
    } catch (err) {
      console.error('Error checking SuperAdmin:', err);
    }
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products/', productRoutes);

app.post('/logout', (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
