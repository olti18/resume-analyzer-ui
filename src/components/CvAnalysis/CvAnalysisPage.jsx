import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFileText,
  FiAlertCircle,
  FiLoader,
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiBox,
} from "react-icons/fi";
import Navbar from "../Navbar";

export default function CvAnalysisPage() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:3000/Resume_Analyzer_db/api/cv/upload",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError("Failed to analyze CV. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const stats = [
    {
      icon: FiAward,
      label: "Resume Score",
      value: analysis ? "92%" : "-",
      color: "text-blue-600",
    },
    {
      icon: FiTrendingUp,
      label: "ATS Compatibility",
      value: analysis ? "High" : "-",
      color: "text-green-600",
    },
    {
      icon: FiCheckCircle,
      label: "Keywords Matched",
      value: analysis ? "18/20" : "-",
      color: "text-indigo-600",
    },
    {
      icon: FiBox,
      label: "Sections Found",
      value: analysis ? "8" : "-",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/40 blur-3xl"></div>
        <div className="absolute -left-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-blue-50/30 to-purple-50/30 blur-3xl"></div>
      </div>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block mb-6 p-2 rounded-2xl bg-blue-50/50 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white shadow-sm">
                <FiUploadCloud className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Resume Analysis
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              CV Analysis Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upload your CV to get instant AI-powered feedback and suggestions
              for improvement
            </p>
          </motion.div>

          {/* Enhanced Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl transform group-hover:scale-105 transition-transform"></div>
            <div
              {...getRootProps()}
              className={`
                relative cursor-pointer
                rounded-xl border-2 border-dashed p-12
                transition-all duration-300 ease-in-out
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-300 hover:border-blue-500 bg-white/60"
                }
                backdrop-blur-sm
              `}
            >
              <input {...getInputProps()} />

              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative text-center">
                <FiUploadCloud className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <p className="text-xl font-medium text-gray-900 mb-2">
                  {isDragActive
                    ? "Drop your CV here"
                    : "Drag & drop your CV here"}
                </p>
                <p className="text-sm text-gray-500">
                  Or click to browse files (PDF, DOC, DOCX)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced File Preview and Results */}
          <AnimatePresence mode="wait">
            {file && !loading && !analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <FiFileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center justify-center space-x-4">
                  <FiLoader className="h-6 w-6 text-blue-500 animate-spin" />
                  <p className="text-lg text-gray-900">Analyzing your CV...</p>
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Analysis Results
                  </h2>
                  <div className="prose prose-blue max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 rounded-lg p-4">
                      {JSON.stringify(analysis, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-6 rounded-xl bg-red-50 border border-red-100"
              >
                <div className="flex items-center space-x-3 text-red-600">
                  <FiAlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
