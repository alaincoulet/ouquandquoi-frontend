// src/App.tsx
// Point d'entrée et routage principal de l'application oùquandquoi.fr

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DeposerActivite from '@/pages/DeposerActivite'
import Home from '@/pages/Home'
import PolitiqueConfidentialite from '@/pages/confidentialite'
import ActivityDetail from '@/pages/Activity'

/**
 * Tableau des routes où le Header/Footer doivent être cachés
 */
const headerFooterExclusions = ['/deposer']

const AppRoutes: React.FC = () => {
  const location = useLocation()
  const hideHeaderFooter = headerFooterExclusions.includes(location.pathname)

  // ⬇️ Gestion centralisée du toggle favoris
  const [favoritesActive, setFavoritesActive] = useState(false)
  const handleToggleFavorites = () => setFavoritesActive(prev => !prev)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header sur toutes les pages sauf exclusions */}
      {!hideHeaderFooter &&
        <Header
          favoritesActive={favoritesActive}
          onToggleFavorites={handleToggleFavorites}
        />
      }

      {/* Main pour le contenu */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favoritesActive={favoritesActive}
                onToggleFavorites={handleToggleFavorites}
              />
            }
          />
          <Route path="/deposer" element={<DeposerActivite />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          {/* Ajoute d'autres routes ici */}
        </Routes>
      </main>

      {/* Footer sur toutes les pages sauf exclusions */}
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
