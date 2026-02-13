// import express from "express";
// import Student from "../models/Student.js";
// import Company from "../models/Company.js";
// import Application from "../models/Application.js";
// import nodemailer from "nodemailer";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// /* ===================================
// VIEW ELIGIBLE STUDENTS
// =================================== */
// router.get("/eligible/:companyId", async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);

//     if (!company) {
//       return res.status(404).json({ message: "Company not found" });
//     }

//     const applications = await Application.find({
//       companyId: company._id,
//       status: { $in: ["Applied", "Interview Scheduled"] }
//     }).populate("studentId");

//     if (!applications.length) {
//       return res.json({ applications: [] });
//     }

//     const eligibleApplications = applications.filter(app => {
//       const student = app.studentId;
//       if (!student) return false;

//       return (
//         student.cgpa >= company.minCGPA &&
//         student.arrears <= company.maxArrears
//       );
//     });

//     res.json({ applications: eligibleApplications });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// /* ===================================
// SEND INTERVIEW MAIL
// =================================== */
// // router.post("/send-interview/:companyId", async (req, res) => {
// // try {

// // const company = await Company.findById(req.params.companyId);

// // const applications = await Application.find({
// //   companyId: company._id,
// //   status: "Applied"
// // }).populate("studentId");

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS
// //   }
// // });

// // for (const app of applications) {

// //   const student = app.studentId;
// //   if (!student) continue;

// //   // eligibility check
// //   if (
// //     student.cgpa < company.minCGPA ||
// //     student.arrears > company.maxArrears
// //   ) continue;

// //   await transporter.sendMail({
// //     from: process.env.EMAIL_USER,
// //     to: student.email,
// //     subject: `Interview Scheduled - ${company.companyName}`,
// //     text: `Dear ${student.name},


// // You are eligible for ${company.companyName} interview.

// // Please upload your resume:
// // http://localhost:5173/upload-resume/${app._id}

// // Placement Cell`
// // });

// //   app.status = "Interview Scheduled";
// //   await app.save();
// // }

// // res.json({ message: "Interview mails sent successfully" });


// // } catch (err) {
// // res.status(500).json({ error: err.message });
// // }
// // });
// router.post("/send-interview/:companyId", async (req, res) => {
//   try {

//     const company = await Company.findById(req.params.companyId);

//     const applications = await Application.find({
//       companyId: company._id,
//       status: "Applied"
//     }).populate("studentId");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     let count = 0;

//     for (const app of applications) {

//       const student = app.studentId;
//       if (!student) continue;

//       // SAME ELIGIBILITY CHECK
//       if (
//         student.cgpa >= company.minCGPA &&
//         student.arrears <= company.maxArrears
//       ) {

//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: student.email,
//           subject: `Interview Scheduled - ${company.companyName}`,
//           text: `Dear ${student.name},

// You are eligible for ${company.companyName} interview.

// Upload resume:
// http://localhost:5173/upload-resume/${app._id}

// Placement Cell`
//         });

//         app.status = "Interview Scheduled";
//         await app.save();

//         count++;
//       }
//     }

//     res.json({ message: `Mail sent to ${count} students` });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// /* ===================================
// UPLOAD RESUME
// =================================== */
// router.post(
// "/upload-resume/:applicationId",
// upload.single("resume"),
// async (req, res) => {
// try {

//   const application = await Application.findById(req.params.applicationId);

//   application.resume = req.file.filename;
//   await application.save();

//   res.json({ message: "Resume uploaded successfully" });

// } catch (err) {
//   res.status(500).json({ error: err.message });
// }


// }
// );

// /* ===================================
// SELECT / REJECT
// =================================== */
// router.put("/update-status/:applicationId", async (req, res) => {
// try {

// const application = await Application.findById(req.params.applicationId)
//   .populate("studentId")
//   .populate("companyId");

// application.status = req.body.status;
// await application.save();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// await transporter.sendMail({
//   from: process.env.EMAIL_USER,
//   to: application.studentId.email,
//   subject: `Application Result - ${application.companyId.companyName}`,
//   text: `Dear ${application.studentId.name},


// Your status for ${application.companyId.companyName} is ${req.body.status}.

// Placement Cell`
// });

// res.json({ message: "Status updated and mail sent" });


// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });
// export default router;
import express from "express";
import Company from "../models/Company.js";
import Application from "../models/Application.js";
import Student from "../models/Student.js";
import nodemailer from "nodemailer";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===================================
   VIEW ELIGIBLE STUDENTS
=================================== */
// router.get("/eligible/:companyId", async (req, res) => {
//   try {
//     const companyId = req.params.companyId;

//     const company = await Company.findById(companyId);
//     if (!company) {
//       return res.status(404).json({ message: "Company not found" });
//     }

//     // Get only students who applied
//     const applications = await Application.find({
//       companyId: companyId,
//       studentId: { $ne: null }   // VERY IMPORTANT
//     })
//       .populate("studentId")
//       .populate("companyId");

//     // Filter eligible students
//     const eligible = applications.filter(app =>
//       app.studentId.cgpa >= company.minCGPA &&
//       app.studentId.arrears <= company.maxArrears
//     );

//     res.json(eligible);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/eligible/:companyId", async (req, res) => {
  try {

    const applications = await Application.find({
      companyId: req.params.companyId
    })
      .populate("studentId", "name registerNo email")
      .populate("companyId", "companyName");

    res.json({
      applications: applications || []
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ===================================
   SEND INTERVIEW MAIL
=================================== */
router.post("/send-interview/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const company = await Company.findById(companyId);

    const applications = await Application.find({
      companyId: companyId,
      status: "Applied",
      studentId: { $ne: null }
    }).populate("studentId");

    if (applications.length === 0) {
      return res.json({ message: "No eligible students found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    for (const app of applications) {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: app.studentId.email,
        subject: `Interview Scheduled - ${company.companyName}`,
        text: `Dear ${app.studentId.name},

You are shortlisted for ${company.companyName}.

Upload Resume:
http://localhost:5173/upload-resume/${app._id}

Placement Cell`
      });

      app.status = "Interview Scheduled";
      await app.save();
    }

    res.json({
      message: `Email sent to ${applications.length} students`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===================================
   UPLOAD RESUME
=================================== */
router.post(
  "/upload-resume/:applicationId",
  upload.single("resume"),
  async (req, res) => {
    try {
      const application = await Application.findById(
        req.params.applicationId
      );

      if (!application) {
        return res.status(404).json({ message: "Not found" });
      }

      application.resume = req.file.filename;
      await application.save();

      res.json({ message: "Resume uploaded" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/* ===================================
   SELECT / REJECT
=================================== */
router.put("/update-status/:applicationId", async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.applicationId
    )
      .populate("studentId")
      .populate("companyId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = req.body.status;
    await application.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    if (req.body.status === "Selected" || req.body.status === "Rejected") {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: application.studentId.email,
        subject: "Application Result",
        text: `Dear ${application.studentId.name},

Your status for ${application.companyId.companyName} is ${req.body.status}.

Placement Cell`
      });
    }

    res.json({ message: "Status updated" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===================================
   CLOSE COMPANY
=================================== */
router.put("/close-company/:companyId", async (req, res) => {
  await Company.findByIdAndUpdate(req.params.companyId, {
    status: "Closed"
  });

  res.json({ message: "Company closed" });
});

export default router;
