import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/60 via-white to-indigo-150/60">
      <Navbar />
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8 overflow-hidden pt-16">
        {/* Enhanced Gradient Blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/2 bottom-0 -mb-8 -mr-96 w-[300px] h-[300px] transform-gpu blur-3xl bg-gradient-to-r from-blue-200/60 to-indigo-300/60 opacity-70 animate-blob"></div>
          <div className="absolute left-1/2 top-0 -ml-96 -mt-8 w-[300px] h-[300px] transform-gpu blur-3xl bg-gradient-to-r from-indigo-200/60 to-purple-300/60 opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl pt-20 pb-32"
        >
          <div className="text-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute right-1/2 bottom-0 -mb-8 -mr-96 w-[200px] h-[200px] transform-gpu blur-3xl bg-gradient-to-r from-blue-100 to-indigo-200 opacity-50"></div>
              <div className="absolute left-1/2 top-0 -ml-96 -mt-8 w-[200px] h-[200px] transform-gpu blur-3xl bg-gradient-to-r from-indigo-100 to-purple-200 opacity-50"></div>
            </div>

            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6 backdrop-blur-sm"
            >
              <span className="flex items-center gap-x-1.5">
                <svg
                  className="h-1.5 w-1.5 fill-blue-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                Thesis-Level Analysis
              </span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Academic Resume Analysis with
              <span className="block mt-2">Advanced AI Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
            >
              Enhance your academic CV with our specialized AI analysis tool.
              Perfect for researchers, PhD candidates, and academic
              professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-x-6 justify-center"
            >
              <Link
                to="/register"
                className="group relative rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300"></span>
                Analyze Your CV
              </Link>
              <Link
                to="/login"
                className="group relative rounded-full bg-white/80 backdrop-blur-sm px-8 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:ring-gray-300 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Sign In
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Statistics Section */}
      <div className="relative overflow-hidden">
        {/* Enhanced Statistics Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/2 bottom-0 -mb-8 -mr-96 w-[400px] h-[400px] transform-gpu blur-3xl bg-gradient-to-r from-blue-200/60 to-indigo-300/60 opacity-70 animate-blob"></div>
          <div className="absolute left-1/2 top-0 -ml-96 -mt-8 w-[400px] h-[400px] transform-gpu blur-3xl bg-gradient-to-r from-indigo-200/60 to-purple-300/60 opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                key={stat.name}
                className="relative group"
              >
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/50 to-indigo-500/50 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/60 backdrop-blur-xl rounded-xl p-8 text-center shadow-lg ring-1 ring-gray-900/10 group-hover:shadow-2xl group-hover:bg-white/70 transition-all duration-300">
                  <dt className="text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {stat.name}
                  </dt>
                  <motion.dd
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mt-3 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    {stat.value}
                  </motion.dd>
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

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Get an ATS understanding check
              </h2>
              <p className="text-lg text-gray-600">
                Part of the resume checker score we assign is based on the
                parsability rate of your resume. We've reverse-engineered the
                most popular applicant tracking systems currently used and we
                look for signs of ATS compatibility.
              </p>
              <p className="text-lg text-gray-600">
                For each resume uploaded, we look for skills and keywords
                connected to the job and industry you're applying for, readable
                contact information, file type, and length. Then, we'll give you
                suggestions on how to improve your resume.
              </p>
              <div className="flex gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  <span className="mr-2">•</span>
                  Keywords Analysis
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-full bg-indigo-100/80 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  <span className="mr-2">•</span>
                  Skills Check
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modern Features Grid */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-base/7 font-semibold text-blue-600">
              Advanced Features
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Everything you need for your resume
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* Resume Analysis Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:row-span-2"
            >
              <div className="absolute inset-px rounded-lg bg-white/90 backdrop-blur-sm lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                    Resume Analysis
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Our AI-powered system analyzes every aspect of your resume
                    in real-time, providing detailed feedback for improvement.
                  </p>
                </div>
                <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className="size-full object-cover object-top"
                      src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                      alt="Resume Analysis Interface"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </motion.div>

            {/* ATS Optimization Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-lg:row-start-1"
            >
              <div className="absolute inset-px rounded-lg bg-white/90 backdrop-blur-sm max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                    ATS Optimization
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Ensure your resume passes through ATS systems with our
                    advanced keyword analysis and formatting suggestions.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    className="w-full max-lg:max-w-xs"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                    alt="ATS Performance Graph"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </motion.div>

            {/* Skills Analysis Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
            >
              <div className="absolute inset-px rounded-lg bg-white/90 backdrop-blur-sm"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                    Skills Analysis
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    In-depth analysis of your skills and experience, matched
                    against job market requirements.
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    className="h-[min(152px,40cqw)] object-cover"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                    alt="Skills Analysis Chart"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
            </motion.div>

            {/* AI Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative lg:row-span-2"
            >
              <div className="absolute inset-px rounded-lg bg-white/90 backdrop-blur-sm max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                    AI Suggestions
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Get intelligent suggestions for improving your resume
                    content, structure, and formatting.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          AI Suggestions
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">
                          Resume.pdf
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14">
                      {/* Add your code example or content here */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
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
      </div>

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
                    Enhance your career prospects with our AI-powered resume analysis tool. Get detailed insights and recommendations.
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Social Links */}
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
                  <ul className="mt-4 space-y-2">
                    {['Features', 'Pricing', 'Demo', 'Guides'].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase()}`} className="text-blue-100 hover:text-white transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
                  <ul className="mt-4 space-y-2">
                    {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase()}`} className="text-blue-100 hover:text-white transition-colors">
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
                  © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link to="/privacy" className="text-sm text-blue-100 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-sm text-blue-100 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { name: "Active Users", value: "10K+" },
  { name: "Resumes Analyzed", value: "50K+" },
  { name: "Success Rate", value: "95%" },
  { name: "AI Suggestions", value: "1M+" },
];

// Keep only the features array
const features = [
  {
    name: "AI-Powered Analysis",
    description:
      "Our advanced AI algorithms analyze your resume content, format, and keywords to provide comprehensive feedback.",
    icon: (
      <svg
        className="h-5 w-5 text-blue-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
      </svg>
    ),
  },
  {
    name: "Instant Feedback",
    description:
      "Get real-time suggestions and improvements for your resume content, structure, and formatting.",
    icon: (
      <svg
        className="h-5 w-5 text-blue-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2c-4.477 0-8.101 2.009-8.101 4.5 0 1.197.52 2.291 1.401 3.177.88.886 2.066 1.558 3.415 1.967l-.667 2h1.904l-.667-2c1.349-.409 2.535-1.081 3.415-1.967.881-.886 1.401-1.98 1.401-3.177 0-2.491-3.624-4.5-8.101-4.5zM3.714 14l.001-.001.002-.002.033-.032a28.52 28.52 0 012.277-1.997c.06-.045.12-.089.182-.133C7.42 11.057 8.682 10.5 10 10.5c1.318 0 2.58.557 3.791 1.335.062.044.122.088.182.133.791.596 1.583 1.28 2.277 1.997l.033.032.002.002L16.286 14H3.714z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "ATS Optimization",
    description:
      "Ensure your resume passes Applicant Tracking Systems with our keyword analysis and formatting recommendations.",
    icon: (
      <svg
        className="h-5 w-5 text-blue-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];
