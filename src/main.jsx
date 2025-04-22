import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import MisRutas from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MisRutas />
  </StrictMode>,
)

