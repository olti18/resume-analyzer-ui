import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const CvUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch("http://localhost:3000/Resume_Analyzer_db/api/cv/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      }

      if (!response.ok) {
        throw new Error("Failed to upload CV");
      }

      const data = await response.json();
      if (data.analysisResult?.summary && data.analysisResult?.suggestedImprovements) {
        setResult({
          summary: data.analysisResult.summary,
          suggestedImprovements: data.analysisResult.suggestedImprovements
        });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err?.message || 'An error occurred while uploading the CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-[280px] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Upload Section - Horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8
              border border-white/50 hover:shadow-2xl hover:bg-white/80
              transition-all duration-500 w-full"
          >
            <div className="flex items-center gap-12"> {/* Increased gap */}
              <div className="flex-shrink-0 w-72"> {/* Increased width from w-64 to w-72 */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 
                  to-indigo-600 bg-clip-text text-transparent mb-2">
                  Upload your CV
                </h1>
                <p className="text-sm text-slate-500 mb-4">PDF, DOC, DOCX (max 5MB)</p>
              </div>

              <div className="flex-grow max-w-4xl"> {/* Added max-width */}
                <form onSubmit={handleSubmit} className="flex items-center gap-6"> {/* Increased gap */}
                  <div className="flex-grow">
                    <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 
                      hover:border-blue-400 transition-colors"> {/* Increased padding */}
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-4">
                        <span className="material-icons text-2xl text-blue-500">upload_file</span>
                        <span className="text-blue-600 text-lg">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !selectedFile}
                    className={`flex-shrink-0 px-8 py-4 rounded-xl font-medium text-lg
                      transition-all duration-300 ${
                      loading || !selectedFile
                        ? 'bg-slate-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="material-icons">analytics</span>
                        <span>Analyze</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Analysis Results - Horizontal */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Summary Section */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6
                border border-white/50 hover:shadow-2xl hover:bg-white/80
                transition-all duration-500"
              >
                <h2 className="flex items-center gap-2 text-xl font-bold text-blue-800 mb-4">
                  <span className="material-icons">analytics</span>
                  Summary
                </h2>
                <p className="text-slate-600 leading-relaxed">{result.summary}</p>
              </div>

              {/* Improvements Section */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6
                border border-white/50 hover:shadow-2xl hover:bg-white/80
                transition-all duration-500"
              >
                <h2 className="flex items-center gap-2 text-xl font-bold text-indigo-800 mb-4">
                  <span className="material-icons">lightbulb</span>
                  Suggested Improvements
                </h2>
                <div className="space-y-2">
                  {result.suggestedImprovements.split('\n').map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="material-icons text-indigo-400 text-sm">arrow_right</span>
                      <p className="text-slate-600">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CvUpload;