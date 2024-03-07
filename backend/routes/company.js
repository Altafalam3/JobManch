import express from 'express';
import { createCompany, getAllCompanies } from '../controllers/companyController.js';

const router = express.Router();

// Route to create a new company
router.post('/', createCompany);

// Route to get all companies
router.get('/', getAllCompanies);

export default router;
