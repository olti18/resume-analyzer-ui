import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <span>ResumeAI</span>
        </div>
        <div className="navbar-links">
          <a href="#" className="active">
            Resume Checker
          </a>
          <a href="#">Templates</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
        </div>
        <div className="navbar-auth">
          <button className="btn-login">Log in</button>
          <button className="btn-signup">Sign up free</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
