import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <div className="upload-section">
        <div className="resume-checker-header">Free Resume Analysis</div>
        <h2>Is your resume good enough?</h2>
        <p className="resume-upload-description">
          Get instant feedback on your resume's content, formatting, and ATS
          compatibility.
        </p>

        <div className="upload-box">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <div className="upload-button">Upload Your Resume</div>
              <div className="upload-info">
                Drop your PDF or Word file here • Max 2MB
              </div>
            </label>
          </form>
        </div>
      </div>

      <div className="ats-info-section">
        <h3>How Our ATS Score Works</h3>
        <div className="ats-tiers">
          <div className="tier">
            <h4>1. Content Interpretation</h4>
            <p>
              We analyze and comprehend your resume like an ATS system, ensuring
              optimal alignment with company requirements.
            </p>
          </div>
          <div className="tier">
            <h4>2. Quality Assessment</h4>
            <p>
              We evaluate quantifiable achievements and content quality that
              recruitment managers look for.
            </p>
          </div>
        </div>

        <div className="features-list">
          <h3>Our AI Checks Include:</h3>
          <ul>
            <li>ATS parse rate optimization</li>
            <li>Keyword analysis and suggestions</li>
            <li>Content quality assessment</li>
            <li>Format and structure verification</li>
          </ul>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {analysis && (
        <div className="analysis-result">
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
