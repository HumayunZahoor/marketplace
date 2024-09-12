import express from 'express';
import { createContact , getContacts} from '../controllers/contactController.js';

const contactRoutes = express.Router();

contactRoutes.post('/add-contacts', createContact);
contactRoutes.get('/get-contacts', getContacts);

export default contactRoutes;
