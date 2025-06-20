import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  FiBriefcase,
  FiSearch,
  FiTrendingUp,
  FiTarget,
  FiBell,
  FiClipboard,
} from "react-icons/fi";

const features = [
  {
    name: "AI-Powered Job Matching",
    description:
      "Get matched with positions that perfectly align with your skills, experience, and career goals. Our AI understands both your potential and job requirements.",
    icon: <FiBriefcase className="w-7 h-7" />,
  },
  {
    name: "Smart CV Analysis",
    description:
      "Receive detailed feedback on your CV with specific improvements for each job application. Stand out to employers and ATS systems.",
    icon: <FiSearch className="w-7 h-7" />,
  },
  {
    name: "Career Insights",
    description:
      "Access real-time market insights, salary data, and skill trends in your industry. Make informed decisions about your career path.",
    icon: <FiTrendingUp className="w-7 h-7" />,
  },
];

const jobFeatures = [
  {
    title: "Smart Matching Algorithm",
    description:
      "Our AI analyzes over 50 data points to find your perfect job matches.",
    icon: <FiTarget className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Personalized Job Alerts",
    description:
      "Get notified instantly when relevant positions become available.",
    icon: <FiBell className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Application Tracking",
    description:
      "Monitor all your applications in one centralized dashboard.",
    icon: <FiClipboard className="w-8 h-8 text-blue-500" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/60 via-white to-indigo-150/60">
      <Navbar />
      {/* Hero Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/2 bottom-0 w-[400px] h-[400px] transform-gpu blur-[120px] bg-gradient-to-r from-blue-200/60 to-indigo-300/60 opacity-70 animate-blob"></div>
          <div className="absolute left-1/2 top-0 w-[400px] h-[400px] transform-gpu blur-[120px] bg-gradient-to-r from-indigo-200/60 to-blue-300/60 opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
          >
            Discover Our Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-600"
          >
            Everything you need to supercharge your job search and career growth, powered by advanced AI.
          </motion.p>
        </div>
      </div>

      {/* Main Features */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Core Capabilities
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Why Choose Resume Analyzer?
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="relative group rounded-2xl overflow-hidden"
            >
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl border border-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Job Search Features */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Job Search Tools
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Tools for Every Step
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {jobFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="relative group rounded-2xl overflow-hidden"
              >
                <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl border border-blue-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-indigo-50 text-blue-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Get Started Free
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}