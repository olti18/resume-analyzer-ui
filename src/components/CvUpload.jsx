import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const CvUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("http://localhost:3000/Resume_Analyzer_db/api/cv/upload", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

      // To handle the response:
      if (!response.ok) {
        throw new Error("Failed to upload CV");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err?.message || 'An error occurred while uploading the CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-sky-50 min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Hamburger button (mobile only) */}
      <button
        className="fixed top-6 left-6 z-50 p-2 rounded-lg bg-white/80 shadow-lg lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <span className="material-icons text-sky-600 text-3xl">menu</span>
      </button>
      <main className="flex-1 lg:ml-72 w-full flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-sky-800 mb-8">
            Upload Your CV
          </h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <div className="border-2 border-dashed border-sky-200 rounded-2xl p-8 text-center cursor-pointer hover:border-sky-400 transition-all">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-sky-600">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xl mb-2">Drop your CV here or click to upload</p>
                    <p className="text-sm text-sky-400">Supports PDF, DOC, DOCX</p>
                  </div>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-sky-700 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : 'Upload and Analyze CV'}
            </motion.button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sky-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-sky-800 mb-6">Analysis Results</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-sky-700 mb-3">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {result.analysisResult.summary}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-sky-700 mb-3">Suggested Improvements</h3>
                  <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {result.analysisResult.suggestedImprovements}
                  </pre>
                </div>

                <div className="text-sm text-gray-500 text-right">
                  CV ID: {result.cvId}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default CvUpload;