import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: String,
  minCGPA: Number,
  maxArrears: Number,
  skills: [String],
  status: {
    type: String,
    default: "Open"
  }
});

export default mongoose.model("Company", companySchema);
