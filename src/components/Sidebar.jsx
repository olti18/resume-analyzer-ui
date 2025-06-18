import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Upload CV', path: '/cv-upload', icon: 'upload_file' },
  { name: 'History', path: '/history', icon: 'history' },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close sidebar overlay"
      />
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 z-50 bg-white/80 backdrop-blur-2xl shadow-2xl border-r border-sky-100 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Sidebar"
      >
        {/* Logo/Header */}
        <div className="h-24 flex items-center justify-between bg-gradient-to-tr from-sky-500 via-blue-400 to-sky-300 rounded-br-3xl shadow-lg mb-8 px-6">
          <span className="text-3xl font-extrabold text-white tracking-widest drop-shadow-lg font-mono">
            <span className="bg-white/20 px-2 py-1 rounded-lg mr-2">CV</span>Analyzer
          </span>
          {/* Close button for mobile */}
          <button
            className="lg:hidden text-white text-3xl focus:outline-none transition-transform hover:scale-110"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-6">
          <ul className="space-y-2 relative">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.name} className="relative">
                  {active && (
                    <span className="absolute left-0 top-2 h-10 w-1.5 bg-gradient-to-b from-sky-400 to-blue-500 rounded-r-lg shadow-lg animate-pulse"></span>
                  )}
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-4 pl-6 pr-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 relative
                      ${
                        active
                          ? 'bg-gradient-to-r from-sky-100 to-blue-50 text-sky-700 shadow-lg'
                          : 'text-sky-600 hover:bg-sky-50 hover:text-sky-900'
                      }
                    `}
                    style={{ boxShadow: active ? '0 4px 24px 0 rgba(56,189,248,0.10)' : undefined }}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`material-icons text-2xl transition-all duration-200 group-hover:scale-110 ${
                        active
                          ? 'text-sky-500 drop-shadow'
                          : 'text-sky-400 group-hover:text-sky-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="transition-all duration-200 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Footer */}
        <div className="mt-auto mb-8 px-6">
          <div className="bg-white/90 rounded-xl py-3 text-center text-xs text-sky-400 shadow font-mono tracking-widest">
            &copy; {new Date().getFullYear()} CV Analyzer
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;