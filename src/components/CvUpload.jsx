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

      <main className="flex-1 lg:ml-[280px]">
        <button
          className="fixed top-6 left-6 z-40 p-3 rounded-full bg-white/90 
            backdrop-blur-xl shadow-lg lg:hidden hover:bg-blue-50 
            transition-all duration-300 hover:shadow-blue-200/50"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="material-icons text-blue-600">menu</span>
        </button>

        <div className="min-h-screen p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8
                border border-white/50 hover:shadow-2xl hover:bg-white/80
                transition-all duration-500"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 
                to-indigo-600 bg-clip-text text-transparent mb-8 tracking-tight">
                Upload your CV
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-8 text-center 
                      transition-all duration-300 ${
                        selectedFile 
                          ? 'border-blue-400 bg-gradient-to-b from-blue-50/50 to-indigo-50/50' 
                          : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/30'
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
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg
                    shadow-lg transition-all duration-300 ${
                      loading || !selectedFile
                        ? 'bg-slate-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/25'
                    }`}
                  disabled={loading || !selectedFile}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="material-icons">upload_file</span>
                      <span>Upload and Analyze</span>
                    </div>
                  )}
                </motion.button>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50/50 backdrop-blur-sm border border-red-100
                    text-red-600 rounded-xl flex items-start space-x-3"
                >
                  <span className="material-icons text-red-500">error_outline</span>
                  <p>{error}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Analysis Results Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8
                border border-white/50 hover:shadow-2xl hover:bg-white/80
                transition-all duration-500"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 
                to-indigo-600 bg-clip-text text-transparent mb-8 tracking-tight">
                Analysis Results
              </h2>

              {result ? (
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 
                    rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 
                      flex items-center space-x-2">
                      <span className="material-icons">analytics</span>
                      <span>Summary</span>
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{result.summary}</p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 
                    rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4 
                      flex items-center space-x-2">
                      <span className="material-icons">lightbulb</span>
                      <span>Suggested Improvements</span>
                    </h3>
                    <div className="space-y-3">
                      {result.suggestedImprovements.split('\n').map((improvement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="material-icons text-indigo-400 text-sm mt-1">
                            arrow_right
                          </span>
                          <p className="text-slate-700">{improvement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] 
                  text-slate-400 bg-gradient-to-br from-slate-50/50 to-blue-50/50 
                  rounded-2xl">
                  <span className="material-icons text-5xl mb-4 
                    text-transparent bg-clip-text bg-gradient-to-r 
                    from-slate-400 to-blue-300">
                    description
                  </span>
                  <p className="text-lg">Upload a CV to see analysis results</p>
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