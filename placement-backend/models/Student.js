import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registerNo: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  arrears: {
    type: Number,
    required: true
  },
  skills: {
    type: [String],
    required: true
  }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
