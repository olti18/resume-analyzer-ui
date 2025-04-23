import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData.username, formData.password);
    if (result.success) {
      navigate('/resume');
    } else {
      setError(result.error);
    }
  };

  return (
    //<div className="auth-wrapper">
      <div className="auth-overlay">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              <span>ResumeAI</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Username or Email"
                  required
                />
              </div>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>
    //</div>
  );
}