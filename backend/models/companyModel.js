import mongoose from 'mongoose';

// Define company schema
const companySchema = new mongoose.Schema({
   companyName: { type: String, required: true },
   jobDescription: { type: String, required: true },
   roleDescription: { type: String, required: true },
   duration: { type: String, required: true },
   branchEligibility: { type: String, required: true },
   requiredSkills: { type: String, required: true },
   preferredSkills: { type: String, required: true },
   additionalInfo: { type: String },
   documents: { type: String },
   links: { type: String },
   upcomingSchedule: [{
      round: { type: String, required: true },
      date: { type: Date, required: true }
   }],
   eligibilityCriteria: { type: String, required: true },
   stipend: { type: String, required: true }
});

// Create Company model
const Company = mongoose.model('Company', companySchema);

export default Company;