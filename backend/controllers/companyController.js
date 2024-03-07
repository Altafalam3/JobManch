import Company from '../models/companyModel.js';

// Controller function to create a new company
export const createCompany = async (req, res) => {
   try {
      const newCompany = await Company.create(req.body);
      res.status(201).json({ success: true, data: newCompany });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message });
   }
};

// Controller function to get all companies
export const getAllCompanies = async (req, res) => {
   try {
      const companies = await Company.find();
      res.status(200).json({ success: true, data: companies });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message });
   }
};
