import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Interview Scheduled",
        "Selected",
        "Rejected"
      ],
      default: "Applied"
    },
    resume: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
