import express from 'express';
import multer from 'multer';
import path from 'path'; 
import { registerUser, loginUser, changePassword, getAllUsers, updateUserRole, userByEmail , updateUserImage} from '../controllers/userController.js';


  
const userRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  const upload = multer({ storage });

userRoutes.post('/register', upload.single('image'), registerUser); 
userRoutes.post('/login', loginUser);
userRoutes.post('/change-password', changePassword);
userRoutes.get('/all-users', getAllUsers);
userRoutes.put('/update-role', updateUserRole);
userRoutes.get('/user-by-email/:userEmail' , userByEmail)
userRoutes.put('/update-image/:email', upload.single('image'), updateUserImage);


export default userRoutes;
