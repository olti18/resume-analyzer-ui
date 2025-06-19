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
          <div className="max-w-2xl mx-auto pt-16 lg:pt-8">
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

              {result && (
                <div className="mt-8">
                  {/* ... existing result display ... */}
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