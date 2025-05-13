import { useState, useCallback, useEffect } from "react";
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
  FiAlertTriangle,
  FiStar,
  FiTool,
  FiZap,
} from "react-icons/fi";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";

const AnalysisSection = ({ title, items, icon: Icon, color }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <Icon className="w-6 h-6" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <div className="mt-1">
            {item.type === "success" ? (
              <FiCheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <FiAlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <span className="text-gray-700">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ScoreIndicator = ({ score }) => (
  <div className="relative w-48 h-48">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#f0f0f0"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#scoreGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${score * 2.83} 283`}
        transform="rotate(-90 50 50)"
      />
      <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center flex-col">
      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        {score}%
      </span>
      <span className="text-sm text-gray-500">Score</span>
    </div>
  </div>
);

const MetricCard = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      {trend && (
        <span
          className={`text-xs font-medium ${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function CvAnalysisPage() {
  const { token, isAuthenticated } = useAuth();

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Initializing...");

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setError("Please log in to analyze your CV");
    }
  }, [isAuthenticated, token]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!isAuthenticated || !token) {
        setError("Please log in to analyze your CV");
        return;
      }

      const file = acceptedFiles[0];

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size too large. Please upload a file smaller than 5MB");
        return;
      }

      setFile(file);
      setLoading(true);
      setError(null);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      // Debug request details
      console.log("Upload details:", {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)}KB`,
        fileType: file.type,
        token: token ? "Present" : "Missing",
      });

      try {
        setProgressText("Starting upload...");

        const response = await fetch(
          "http://localhost:3000/Resume_Analyzer_db/api/cv/upload",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        console.log("Response status:", response.status);
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        if (!response.ok) {
          throw new Error(
            `Upload failed (${response.status}): ${
              responseText || "No error details available"
            }`
          );
        }

        let data;
        try {
          data = responseText ? JSON.parse(responseText) : null;
          if (!data) {
            throw new Error("Empty response from server");
          }
          // Extract the actual analysis content from the response
          const analysisContent = data.choices?.[0]?.message?.content;
          if (!analysisContent) {
            throw new Error("Invalid analysis format");
          }
          setAnalysis(analysisContent);
        } catch (parseError) {
          console.error("Parse error:", parseError);
          throw new Error("Failed to parse server response");
        }
      } catch (err) {
        console.error("Upload error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token, isAuthenticated]
  );

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
          <AnimatePresence mode="sync">
            {file && !loading && !analysis && (
              <motion.div
                key="file-preview"
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
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <FiLoader className="h-6 w-6 text-blue-500 animate-spin" />
                    <p className="text-lg text-gray-900">{progressText}</p>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <motion.div
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    This process may take up to 2 minutes to complete
                  </p>
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-10"
              >
                {/* Score Section with Enhanced Design */}
                <motion.div 
                  className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-blue-100/20 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-24 -top-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                  <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between space-x-10">
                      {/* Enhanced Score Circle */}
                      <div className="relative">
                        <svg className="w-40 h-40 transform transition-transform duration-1000 group-hover:rotate-180">
                          <circle
                            className="text-blue-50"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="70"
                            cx="80"
                            cy="80"
                          />
                          <motion.circle
                            className="text-blue-600"
                            strokeWidth="10"
                            strokeLinecap="round"
                            stroke="url(#gradient)"
                            fill="transparent"
                            r="70"
                            cx="80"
                            cy="80"
                            initial={{ strokeDashoffset: 440 }}
                            animate={{ 
                              strokeDashoffset: 440 - (440 * parseInt(typeof analysis === 'string' && analysis.includes("92-95%") ? "94" : "78")) / 100 
                            }}
                            strokeDasharray="440"
                            transform="rotate(-90 80 80)"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#2563EB" />
                              <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <motion.h2 
                              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              {typeof analysis === 'string' && analysis.includes("92-95%") ? "94%" : "78%"}
                            </motion.h2>
                            <p className="text-sm font-medium text-gray-500 mt-1">Overall Score</p>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Score Details */}
                      <div className="flex-1 space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            ATS Matching Score
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                            {parseInt(typeof analysis === 'string' && analysis.includes("92-95%") ? "94" : "78") >= 90 
                              ? "Excellent! Your CV is highly optimized for ATS systems. You're well-positioned to pass automated screenings."
                              : "Good start! With some targeted improvements, you can significantly boost your ATS compatibility and increase your chances of getting noticed."}
                          </p>
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
                            <div className="text-blue-600 font-semibold">Keywords</div>
                            <div className="text-2xl font-bold text-gray-900">92%</div>
                          </div>
                          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
                            <div className="text-indigo-600 font-semibold">Format</div>
                            <div className="text-2xl font-bold text-gray-900">88%</div>
                          </div>
                          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
                            <div className="text-purple-600 font-semibold">Content</div>
                            <div className="text-2xl font-bold text-gray-900">95%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Analysis Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {typeof analysis === "string" &&
                    analysis.split("\n\n").map((section, index) => {
                      if (section.startsWith("**")) {
                        const title = section.match(/\*\*(.*?)\*\*/)?.[1] || "";
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="relative bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-blue-100/20 h-full hover:shadow-xl transition-all duration-300">
                              <div className="flex items-center gap-3 mb-4">
                                {title.includes("Strengths") && (
                                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                                )}
                                {title.includes("Improve") && (
                                  <FiTool className="w-6 h-6 text-amber-500" />
                                )}
                                {title.includes("Critical") && (
                                  <FiAlertTriangle className="w-6 h-6 text-red-500" />
                                )}
                                {title.includes("Recommend") && (
                                  <FiZap className="w-6 h-6 text-blue-500" />
                                )}
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {title}
                                </h3>
                              </div>
                              <div className="prose prose-blue prose-sm max-w-none">
                                {section
                                  .replace(/\*\*(.*?)\*\*/, "")
                                  .trim()
                                  .split("\n")
                                  .map((line, i) => (
                                    <div key={i} className="mb-2">
                                      {line.startsWith("- ") ? (
                                        <div className="flex items-start gap-2">
                                          <div className="mt-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          </div>
                                          <p className="text-gray-700">
                                            {line.replace("- ", "")}
                                          </p>
                                        </div>
                                      ) : (
                                        <p className="text-gray-700">{line}</p>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                key="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-6 rounded-xl bg-red-50 border border-red-100"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3 text-red-600">
                    <FiAlertCircle className="h-5 w-5" />
                    <p className="font-medium">Upload Failed</p>
                  </div>
                  <p className="text-red-600 text-sm ml-8">{error}</p>
                  {process.env.NODE_ENV === "development" && (
                    <p className="text-red-400 text-xs ml-8 mt-1">
                      Check browser console for more details
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
