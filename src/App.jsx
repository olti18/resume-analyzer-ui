import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import CvAnalysisPage from './components/CvAnalysis/CvAnalysisPage';
import ProtectedRoute from './components/ProtectedRoute';

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/resume" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <CvAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/resume" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
