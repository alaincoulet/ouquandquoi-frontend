// src/main.tsx
import ReactDOM from 'react-dom/client'
// On importe StrictMode directement
import { StrictMode } from 'react'
import App from '@/App'
import '@/styles/index.css'

// Récupère la div racine pour React
const rootElement = document.getElementById('root') as HTMLElement

// Monte l’application en mode Strict
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
