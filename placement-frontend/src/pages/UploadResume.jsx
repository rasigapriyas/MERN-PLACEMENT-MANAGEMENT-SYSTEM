import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../css/UploadResume.css";

export default function UploadResume() {

  const { applicationId } = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await axios.post(
        `http://localhost:5000/api/admin/upload-resume/${applicationId}`,
        formData
      );

      alert("Resume uploaded successfully ✅");

    } catch (error) {
      alert("Error uploading resume ❌");
      console.log(error);
    }
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <h2 className="upload-title">
          Upload Resume (PDF Only)
        </h2>

        <form onSubmit={handleUpload} className="upload-form">

          <label className="file-label">
            Choose PDF File
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
            />
          </label>

          {file && (
            <p className="file-name">
              Selected: {file.name}
            </p>
          )}

          <button type="submit" className="upload-button">
            Upload Resume
          </button>

        </form>

      </div>

    </div>
  );
}
