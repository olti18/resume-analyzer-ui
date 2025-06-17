import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { TypeAnimation } from "react-type-animation";
import {
  FiBriefcase,
  FiSearch,
  FiTrendingUp,
  FiTarget,
  FiBell,
  FiClipboard,
} from "react-icons/fi";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/60 via-white to-indigo-150/60">
      <Navbar />
      {/* Hero Section */}
      <div className="hero-section relative">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/2 bottom-0 -mb-8 -mr-96 w-[400px] h-[400px] transform-gpu blur-[120px] bg-gradient-to-r from-blue-200/60 to-indigo-300/60 opacity-70 animate-blob"></div>
          <div className="absolute left-1/2 top-0 -ml-96 -mt-8 w-[400px] h-[400px] transform-gpu blur-[120px] bg-gradient-to-r from-indigo-200/60 to-blue-300/60 opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] transform-gpu blur-[120px] bg-gradient-to-r from-blue-200/60 to-white/60 opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative pt-24 pb-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg shadow-blue-100/20">
              <span className="animate-pulse h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="ml-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </div>

            <motion.h1 className="text-6xl font-bold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Your Career Success
              <span className="block mt-2">Starts Here</span>
            </motion.h1>

            <TypeAnimation
              sequence={[
                "Find Your Perfect Job Match",
                2000,
                "Optimize Your CV",
                2000,
                "Track Your Applications",
                2000,
              ]}
              wrapper="span"
              className="block mt-6 text-2xl text-gray-600 font-medium"
              repeat={Infinity}
            />

            <motion.p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Experience the future of job hunting. Our AI analyzes your CV, matches you with ideal
              positions, and guides you to career success with personalized recommendations.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/register"
                className="group relative rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 overflow-hidden"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-blue-600 to-indigo-600" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-transparent">
                  Analyze Your CV
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>

              <Link
                to="/login"
                className="group relative rounded-full px-8 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center text-gray-900">
                  Sign In
                  <motion.span
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/2 bottom-0 w-[400px] h-[400px] transform-gpu blur-3xl bg-gradient-to-r from-blue-200/60 to-indigo-300/60 opacity-70 animate-blob"></div>
          <div className="absolute left-1/2 top-0 w-[400px] h-[400px] transform-gpu blur-3xl bg-gradient-to-r from-indigo-200/60 to-purple-300/60 opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                name: "Job Matches Daily",
                value: "5K+",
                description: "New opportunities matched",
                icon: <FiBriefcase className="w-6 h-6" />
              },
              {
                name: "Success Rate",
                value: "94%",
                description: "Placement success",
                icon: <FiTrendingUp className="w-6 h-6" />
              },
              {
                name: "Available Jobs",
                value: "100K+",
                description: "Active positions",
                icon: <FiSearch className="w-6 h-6" />
              },
              {
                name: "CV Score Improvement",
                value: "85%",
                description: "Average increase",
                icon: <FiTarget className="w-6 h-6" />
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/60 backdrop-blur-xl rounded-xl p-8 shadow-lg ring-1 ring-gray-900/5 group-hover:shadow-2xl group-hover:bg-white/90 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <dt className="text-base font-medium text-gray-900 text-center">
                    {stat.name}
                  </dt>
                  <motion.dd
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mt-2 text-4xl font-bold tracking-tight text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.dd>
                  <dd className="mt-2 text-sm text-gray-500 text-center">
                    {stat.description}
                  </dd>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ATS Understanding Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              {/* Background Image */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute right-[10%] top-[-15%] w-[280px]"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    zIndex: 20, // Ensures this comes to front when hovered
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    },
                  }}
                  className="relative bg-white p-2 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300"
                >
                  <img
                    src="https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9KSjBlMDVnUzFabHViUThjbmMzSGZNTWlmcnpCeG95dVRRbzM2czY4L2ltYWdlLnBuZw~~.png"
                    alt="Resume Example 2"
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute -top-4 left-4 inline-flex items-center rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    <span className="mr-1">•</span>
                    Analysis
                  </div>
                </motion.div>
              </motion.div>

              {/* Foreground Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-0 bottom-0 w-[280px] z-10"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    zIndex: 20, // Ensures this comes to front when hovered
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    },
                  }}
                  className="relative bg-white p-2 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300"
                >
                  <img
                    src="https://cdn.enhancv.com/predefined-examples/aKd9rVtC4r9CCHlZzMiGisTZnGKtwr4rqSqjA95o/image.png"
                    alt="Resume Example 1"
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute -top-4 left-4 inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    <span className="mr-1">•</span>
                    Keywords
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-700">
                  <span className="mr-2">✨</span>
                  AI-Powered Analysis
                </span>
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Smart Job Matching & CV Analysis
                </h2>
              </div>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="leading-relaxed">
                  Our advanced AI technology creates your professional fingerprint by analyzing your CV's unique
                  attributes, then matches you with opportunities that align perfectly with your profile.
                </p>
                <p className="leading-relaxed">
                  For each potential match, we provide tailored insights and specific recommendations
                  to optimize your CV, ensuring you present your most compelling case to employers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">Smart Keyword Analysis</span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100"
                >
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm font-medium text-gray-700">Skills Assessment</span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100"
                >
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">Match Score</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modern Features Grid */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 py-24 sm:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
        </div>
                  
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Advanced Features
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Elevate Your Career Journey
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our comprehensive suite of tools helps you build a stronger career path
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/80 backdrop-blur-sm p-8 h-full border border-blue-100/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                      <path d="M6.75 3.25L10.25 8L6.75 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Call to Action
      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to enhance your profile?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Get started with our AI-powered CV analysis and improve your impact.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div> */}

      {/* Enhanced Footer Section */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-indigo-700">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/30 to-purple-500/30 backdrop-blur-3xl" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    Resume Analyzer
                  </h3>
                  <p className="text-blue-100 max-w-sm">
                    Enhance your career prospects with our AI-powered resume
                    analysis tool. Get detailed insights and recommendations.
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Social Links */}
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://github.com/olti18"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-8 lg:col-span-3"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Product
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {["Features", "Pricing", "Demo", "Guides"].map((item) => (
                      <li key={item}>
                        <Link
                          to={`/${item.toLowerCase()}`}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Company
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {["About", "Blog", "Careers", "Contact"].map((item) => (
                      <li key={item}>
                        <Link
                          to={`/${item.toLowerCase()}`}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-blue-100">
                  © {new Date().getFullYear()} Resume Analyzer. All rights
                  reserved.
                </p>
                <div className="flex gap-6">
                  <Link
                    to="/privacy"
                    className="text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms"
                    className="text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <FloatingElements />
    </div>
  );
}

const stats = [
  {
    name: "Job Matches Daily",
    value: "5K+",
    description: "New opportunities matched to candidates",
  },
  {
    name: "Success Rate",
    value: "94%",
    description: "Of users find relevant positions",
  },
  {
    name: "Available Jobs",
    value: "100K+",
    description: "Active positions in our database",
  },
  {
    name: "CV Score Improvement",
    value: "85%",
    description: "Average increase in CV quality",
  },
];

// Update the features array
const features = [
  {
    name: "AI-Powered Job Matching",
    description:
      "Get matched with positions that perfectly align with your skills, experience, and career goals. Our AI understands both your potential and job requirements.",
    icon: <FiBriefcase className="w-6 h-6" />,
  },
  {
    name: "Smart CV Analysis",
    description:
      "Receive detailed feedback on your CV with specific improvements for each job application. Stand out to employers and ATS systems.",
    icon: <FiSearch className="w-6 h-6" />,
  },
  {
    name: "Career Insights",
    description:
      "Access real-time market insights, salary data, and skill trends in your industry. Make informed decisions about your career path.",
    icon: <FiTrendingUp className="w-6 h-6" />,
  },
];

// Add a new section for Job Search Features
const jobFeatures = [
  {
    title: "Smart Matching Algorithm",
    description:
      "Our AI analyzes over 50 data points to find your perfect job matches",
    icon: <FiTarget className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Personalized Job Alerts",
    description:
      "Get notified instantly when relevant positions become available",
    icon: <FiBell className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Application Tracking",
    description:
      "Monitor all your applications in one centralized dashboard",
    icon: <FiClipboard className="w-8 h-8 text-blue-500" />,
  },
];

const FeatureCard = ({ feature }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group"
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
)

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
    <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
  </div>
)