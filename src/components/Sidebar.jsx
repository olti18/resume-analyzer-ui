import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NAVIGATION_ITEMS = [
  {
    name: "Dashboard",
    path: "/",
    icon: "dashboard",
    ariaLabel: "Go to Dashboard",
  },
  {
    name: "Upload CV",
    path: "/cv-upload",
    icon: "upload_file",
    ariaLabel: "Upload your CV",
    badge: "New",
  },
  {
    name: "Job Recomm..",
    path: "/job-recommendations",
    icon: "recommend",
    ariaLabel: "Upload your CV",
    badge: "New",
  },
  {
    name: "Favorite Jobs",
    path: "/test",
    icon: "favorite",
    ariaLabel: "Upload your CV",
    badge: "PRO",
  },
  {
    name: "Scrape Jobs",
    path: "/jobs",
    icon: "work",
    ariaLabel: "Scrape Jobs",
    badge: "Beta",
    description: "Find relevant job postings",
  },
  {
    name: "analysis",
    path: "/tests",
    icon: "analytics",
    ariaLabel: "Upload your CV",
    badge: "PRO",
  },
  {
    name: "History",
    path: "/history",
    icon: "history",
    ariaLabel: "View History",
    count: "3",
  },
  
];

const NavItem = ({ item, active, onClick }) => (
  <li className="relative group">
    {active && (
      <span
        className="absolute left-0 top-2 h-10 w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 
        rounded-r-lg shadow-lg animate-pulse"
        aria-hidden="true"
      />
    )}
    <Link
      to={item.path}
      className={`flex items-center gap-4 pl-6 pr-4 py-4 rounded-xl font-medium text-[15px]
        transition-all duration-300 relative overflow-hidden
        ${
          active
            ? "bg-gradient-to-r from-blue-50/80 to-white text-blue-700 shadow-sm"
            : "text-slate-600 hover:bg-blue-50/50 hover:text-blue-700"
        }`}
      onClick={onClick}
      aria-label={item.ariaLabel}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={`material-icons text-xl transition-all duration-300 ${
          active ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"
        }`}
        aria-hidden="true"
      >
        {item.icon}
      </span>

      <span className="flex-1">{item.name}</span>

      {item.badge && (
        <span className="px-2 py-0.5 text-xs font-semibold rounded-full 
          bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
          {item.badge}
        </span>
      )}
      {item.count && (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full 
          bg-slate-100 text-slate-600">
          {item.count}
        </span>
      )}
    </Link>
  </li>
);

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 
        transition-opacity duration-300 lg:hidden
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] z-50 
        bg-white shadow-xl border-r border-slate-200/50 
        flex flex-col transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="h-[70px] flex items-center justify-between 
          bg-gradient-to-r from-blue-600 to-blue-500 px-6">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-white">
            <span className="flex items-center justify-center w-9 h-9 
              rounded-lg bg-white/20 backdrop-blur-md shadow-inner">
              CV
            </span>
            Analyzer
          </h1>

          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg 
            bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110"
            onClick={handleClose}
            aria-label="Close navigation"
          >
            <span className="material-icons text-2xl">close</span>
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* User Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50/50">
              <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-icons text-blue-600">person</span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  Welcome back
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Start analyzing your CV
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  active={location.pathname === item.path}
                  onClick={handleClose}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <footer className="p-6 bg-gradient-to-t from-slate-50">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200/70">
            <div className="text-center text-sm font-medium text-slate-600">
              &copy; {new Date().getFullYear()} CV Analyzer
            </div>
            <div className="mt-1 text-center text-xs text-slate-400">
              Version 1.0.0
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Sidebar;
