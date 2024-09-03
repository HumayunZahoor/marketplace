import express from 'express';
import { registerUser, loginUser , changePassword} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/change-password', changePassword);

export default userRoutes;
