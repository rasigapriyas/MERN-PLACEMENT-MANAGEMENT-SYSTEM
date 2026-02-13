import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Upload Resume (PDF Only)</h2>

      <form onSubmit={handleUpload} style={{ marginTop: "20px" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          Upload Resume
        </button>
      </form>
    </div>
  );
}
