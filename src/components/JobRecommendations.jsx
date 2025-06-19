import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const JobRecommendations = ({ cvId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!cvId) return;
    setLoading(true);
    setError(null);

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    fetch(
      `http://localhost:3000/Resume_Analyzer_db/api/cv/recommendations?cvId=${cvId}`,
      {
        method: "POST",
        credentials: "include",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setMatches(data.matches || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cvId]);

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-[280px] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10
              border border-white/60 hover:shadow-blue-200/50
              transition-all duration-500 w-full"
          >
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 flex items-center gap-3 tracking-tight">
              <span className="material-icons text-4xl text-blue-500">
                work_outline
              </span>
              Job Recommendations
            </h2>
            {loading && (
              <div className="text-blue-500 flex items-center gap-2 text-lg font-medium">
                <span className="material-icons animate-spin">autorenew</span>
                Loading recommendations...
              </div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-2"
              >
                <span className="material-icons text-red-400">error_outline</span>
                {error}
              </motion.div>
            )}
            {!loading && !error && matches.length === 0 && (
              <div className="text-slate-400 text-lg flex flex-col items-center py-16">
                <span className="material-icons text-6xl mb-4 text-blue-200">
                  search_off
                </span>
                No recommendations found.
              </div>
            )}
            <div className="grid gap-8 md:grid-cols-2">
              {matches.map((job, idx) => (
                <motion.div
                  key={job.link + idx}
                  whileHover={{
                    scale: 1.025,
                    boxShadow:
                      "0 8px 32px 0 rgba(60, 120, 255, 0.15)",
                  }}
                  className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl p-7 shadow hover:shadow-xl transition-all border border-blue-100/60"
                >
                  <div className="flex flex-col gap-2 mb-3">
                    <a
                      href={job.link.replace(
                        "https://kosovajob.comhttps://kosovajob.com",
                        "https://kosovajob.com"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-blue-800 hover:underline flex items-center gap-2"
                    >
                      <span className="material-icons text-indigo-400">
                        business_center
                      </span>
                      {job.title}
                    </a>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-icons text-base mr-1">
                          apartment
                        </span>
                        {job.company}
                      </span>
                      <span className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-icons text-base mr-1">
                          place
                        </span>
                        {job.location}
                      </span>
                      <span className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-icons text-base mr-1">
                          schedule
                        </span>
                        {job.expires}
                      </span>
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-icons text-base mr-1">star</span>
                        {job.matchScore} Match
                      </span>
                    </div>
                  </div>
                  {job.reasons && job.reasons.length > 0 && (
                    <ul className="list-disc ml-6 text-slate-700 space-y-1 mt-2">
                      {job.reasons.map((reason, i) => (
                        <li key={i} className="text-sm">
                          {reason}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default JobRecommendations;