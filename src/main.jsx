import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css' // <-- Make sure this is App.css, not index.css!
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
