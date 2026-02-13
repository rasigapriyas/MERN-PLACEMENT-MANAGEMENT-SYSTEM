import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

/**
 * ADMIN: Add Company
 * POST /api/companies/add
 */
router.post("/add", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();

    res.status(201).json({
      message: "Company added successfully",
      company
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/**
 * GET ALL COMPANIES
 * GET /api/companies
 */
router.get("/", async (req, res) => {
  const companies = await Company.find({ status: "Open" });
  res.json(companies);
});

/**
 * ADMIN: Close Company
 * PUT /api/companies/close/:companyId
 */
router.put("/close/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { status: "Closed" },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company closed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;
