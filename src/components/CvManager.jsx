import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiSave,
} from "react-icons/fi";

export default function CvManager() {
  const { isAuthenticated, isLoading, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    summary: "",
    experiences: [{ position: "", company: "", years: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!isAuthenticated || !token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        "http://localhost:3000/Resume_Analyzer_db/api/cvs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("CV created successfully");
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
        summary: "",
        experiences: [{ position: "", company: "", years: "" }],
      });
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "Failed to save CV");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { position: "", company: "", years: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = formData.experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData({ ...formData, experiences: newExperiences });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Create Your Resume
            </h1>
            <p className="mt-2 text-gray-600">
              Fill in your professional details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiUser className="w-4 h-4 mr-2 text-blue-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="w-4 h-4 mr-2 text-blue-500" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiPhone className="w-4 h-4 mr-2 text-blue-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiBriefcase className="w-4 h-4 mr-2 text-blue-500" />
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Summary Section */}
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FiFileText className="w-4 h-4 mr-2 text-blue-500" />
                Professional Summary
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows={4}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Work Experience
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addExperience}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <FiPlus className="w-4 h-4 mr-1" />
                  Add Experience
                </motion.button>
              </div>

              {formData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-50 rounded-lg relative"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].position = e.target.value;
                        setFormData({ ...formData, experiences: newExperiences });
                      }}
                      placeholder="Position"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].company = e.target.value;
                        setFormData({ ...formData, experiences: newExperiences });
                      }}
                      placeholder="Company"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      value={exp.years}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].years = e.target.value;
                        setFormData({ ...formData, experiences: newExperiences });
                      }}
                      placeholder="Years (e.g., 2020-2023)"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => {
                        const newExperiences = formData.experiences.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, experiences: newExperiences });
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Resume...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5 mr-2" />
                    Create Resume
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
