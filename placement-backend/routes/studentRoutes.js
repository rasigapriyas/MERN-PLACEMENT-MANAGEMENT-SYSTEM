import express from "express";
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

const router = express.Router();

/* ===============================
   ADD STUDENT
================================ */
router.post("/add", async (req, res) => {
  try {
    const { name, registerNo, email, cgpa, arrears, skills } = req.body;

    const existing = await Student.findOne({ registerNo });

    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = new Student({
      name,
      registerNo,
      email,
      cgpa,
      arrears,
      skills
    });

    await student.save();

    res.json({ message: "Student added successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ===============================
   STUDENT LOGIN
================================ */
router.post("/login", async (req, res) => {
  try {
    const { registerNo, email } = req.body;

    const student = await Student.findOne({
      registerNo,
      email
    });

    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ===============================
   APPLY FOR COMPANY
================================ */
router.post("/apply", async (req, res) => {
  try {
    const { studentId, companyId } = req.body;

    const alreadyApplied = await Application.findOne({
      studentId,
      companyId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      studentId,
      companyId,
      status: "Applied"
    });

    await application.save();

    res.json({ message: "Applied successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ===============================
   GET STUDENT APPLICATIONS
================================ */
router.get("/applications/:studentId", async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.params.studentId
    }).populate("companyId", "companyName");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
