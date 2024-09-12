import express from 'express';
import { registerUser, loginUser , changePassword , getAllUsers , updateUserRole } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/change-password', changePassword);
userRoutes.get('/all-users', getAllUsers);  
userRoutes.put('/update-role', updateUserRole);  


export default userRoutes;
