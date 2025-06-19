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
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px]">
        {/* Mobile Menu Button */}
        <button
          className="fixed top-6 left-6 z-40 p-3 rounded-xl bg-white/80 
            backdrop-blur-md shadow-lg lg:hidden
            hover:bg-blue-50 transition-colors"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <span className="material-icons text-blue-600">menu</span>
        </button>

        {/* Content Area */}
        <div className="min-h-screen p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 lg:pt-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h1 className="text-2xl font-bold text-blue-800 mb-8">
                Upload your CV
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-8 text-center 
                      transition-all duration-300 ${
                        selectedFile 
                          ? 'border-blue-400 bg-blue-50/50' 
                          : 'border-blue-200 hover:border-blue-400'
                      }`}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-blue-600">
                        <span className="material-icons text-4xl mb-4">
                          {selectedFile ? 'description' : 'upload_file'}
                        </span>
                        
                        <AnimatePresence mode="wait">
                          {selectedFile ? (
                            <motion.div
                              key="filename"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <p className="text-lg font-medium mb-2 truncate">
                                {selectedFile.name}
                              </p>
                              <p className="text-sm text-blue-400">
                                Click or drag to replace
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="upload-prompt"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <p className="text-lg font-medium mb-2">
                                Drop your CV here or click to browse
                              </p>
                              <p className="text-sm text-blue-400">
                                Supports PDF, DOC, DOCX
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </label>
                  </div>
                  
                  {/* File Size Info */}
                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2"
                    >
                      <span className="material-icons text-base">description</span>
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl 
                    font-semibold hover:bg-blue-700 transition-all 
                    disabled:opacity-50 disabled:hover:bg-blue-600 
                    disabled:cursor-not-allowed"
                  disabled={loading || !selectedFile}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin material-icons text-base">
                        refresh
                      </span>
                      Uploading...
                    </span>
                  ) : (
                    'Upload and Analyze CV'
                  )}
                </motion.button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">
                  {error}
                </div>
              )}
            </motion.div>

            {/* Analysis Results Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-8">
                Analysis Results
              </h2>

              {result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-blue-700 mb-2">
                      Summary
                    </h3>
                    <p className="text-slate-600">{result.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-blue-700 mb-2">
                      Suggested Improvements
                    </h3>
                    <div className="space-y-2">
                      {result.suggestedImprovements.split('\n').map((improvement, index) => (
                        <p key={index} className="text-slate-600">
                          {improvement}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
                  <span className="material-icons text-4xl mb-4">description</span>
                  <p>Upload a CV to see analysis results</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CvUpload;