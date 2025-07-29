import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StudentState from './context/StudentState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentState>
      <App />
    </StudentState>
  </StrictMode>,
)
