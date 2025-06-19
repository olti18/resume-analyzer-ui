import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import CvAnalysisPage from "./components/CvAnalysis/CvAnalysisPage";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import CvManager from './components/CvManager';
import CvUpload from './components/CvUpload';

import "./App.css";
import JobRecommendations from "./components/JobRecommendations";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Analytics/>
        <SpeedInsights /> {/* Moved inside Router */}
        <Routes>
          
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected Routes */}
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <CvAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route path="/job-recommendations" element={<JobRecommendations cvId={53} />} />
          {/* <Route path="/job-recommendations" element={<JobRecommendations />} /> */}
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/cv-upload" element={<CvUpload />} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/" element={<CvUpload />} />
          <Route path="/manage-cv" element={<CvManager />} />
          {/* <Route path="/cv-upload" element={<CvUpload />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
