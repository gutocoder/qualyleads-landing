import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QualyLeadsLanding from './QualyLeadsLanding.jsx'
import Privacy from './Privacy.jsx'

const path = window.location.pathname;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/privacy' ? <Privacy /> : <QualyLeadsLanding />}
  </StrictMode>,
)
