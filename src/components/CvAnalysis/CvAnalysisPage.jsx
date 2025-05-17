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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl shadow-xl border border-blue-100/20"
              >
                <div className="space-y-8">
                  {/* Enhanced loading indicator */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FiLoader className="h-8 w-8 text-blue-500" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-center">
                      <motion.p 
                        className="text-xl font-semibold text-gray-900 mb-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {progressText}
                      </motion.p>
                      <p className="text-sm text-gray-500">Please wait while we analyze your CV</p>
                    </div>
                  </div>

                  {/* Enhanced progress bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-100/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                        }}
                      />
                    </div>
                    <motion.span 
                      className="absolute right-0 -top-6 text-sm font-medium text-gray-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {progress}%
                    </motion.span>
                  </div>

                  {/* Enhanced footer */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6V12L16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                    <span>Estimated time: ~2 minutes</span>
                  </div>

                  {/* Processing steps */}
                  <div className="grid grid-cols-3 gap-4 text-center text-xs">
                    {['Scanning Document', 'Analyzing Content', 'Generating Report'].map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: progress > (index * 33) ? 1 : 0.5,
                          scale: progress > (index * 33) ? 1.05 : 1
                        }}
                        className={`p-3 rounded-lg ${
                          progress > (index * 33)
                            ? 'bg-blue-50/50 text-blue-600'
                            : 'bg-gray-50/50 text-gray-400'
                        } backdrop-blur-sm transition-all duration-300`}
                      >
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            Analysis Results
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {typeof analysis === "string" &&
                    analysis.split("\n\n").map((section, index) => {
                      if (section.startsWith("**")) {
                        const title = section.match(/\*\*(.*?)\*\*/)?.[1] || "";
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100,
                              damping: 15
                            }}
                            className="group relative"
                          >
                            {/* Enhanced hover effect background */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
                            
                            {/* Main content card with improved styling */}
                            <div className="relative bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-blue-100/20 h-full hover:shadow-2xl transition-all duration-300">
                              {/* Enhanced header section */}
                              <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 group-hover:scale-110 transition-transform duration-300">
                                  {title.includes("Strengths") && (
                                    <FiCheckCircle className="w-7 h-7 text-green-500" />
                                  )}
                                  {title.includes("Improve") && (
                                    <FiTool className="w-7 h-7 text-amber-500" />
                                  )}
                                  {title.includes("Critical") && (
                                    <FiAlertTriangle className="w-7 h-7 text-red-500" />
                                  )}
                                  {title.includes("Recommend") && (
                                    <FiZap className="w-7 h-7 text-blue-500" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                    {title}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {title.includes("Strengths") && "What you're doing well"}
                                    {title.includes("Improve") && "Areas for enhancement"}
                                    {title.includes("Critical") && "Important fixes needed"}
                                    {title.includes("Recommend") && "Suggested changes"}
                                  </p>
                                </div>
                              </div>

                              {/* Enhanced content section */}
                              <div className="prose prose-blue prose-lg max-w-none">
                                {section
                                  .replace(/\*\*(.*?)\*\*/, "")
                                  .trim()
                                  .split("\n")
                                  .map((line, i) => (
                                    <motion.div 
                                      key={i} 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.05 }}
                                      className="mb-4"
                                    >
                                      {line.startsWith("- ") ? (
                                        <div className="flex items-start gap-3 group/item hover:bg-blue-50/50 p-3 rounded-xl transition-all duration-200">
                                          <div className="mt-2">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover/item:scale-125 transition-transform duration-200" />
                                          </div>
                                          <p className="text-gray-700 leading-relaxed">
                                            {line.replace("- ", "")}
                                          </p>
                                        </div>
                                      ) : (
                                        <p className="text-gray-700 leading-relaxed px-3">
                                          {line}
                                        </p>
                                      )}
                                    </motion.div>
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
