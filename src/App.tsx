// =========================================================================
// App.tsx — Point d’entrée principal de oùquandquoi.fr (test header + carte)
// =========================================================================

import React from 'react'
import { Header } from '@/components/layout/Header'

interface ActivityProps {
  title: string
  location: string
  date: string
  price?: number
  isAccessible: boolean
}

/**
 * Carte d'activité (exemple de contenu)
 */
const ActivityCard: React.FC<ActivityProps> = ({
  title,
  location,
  date,
  price,
  isAccessible
}) => {
  return (
    <article
      className="p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto"
      role="article"
      aria-labelledby={`activity-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <h2
        id={`activity-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-xl font-bold mb-2"
      >
        {title}
      </h2>
      <p className="text-gray-600">{location}</p>
      <p className="text-sm text-gray-500">{date}</p>
      {price !== undefined && (
        <p className="text-lg font-semibold text-green-600 mt-1">
          {price > 0 ? `${price} €` : 'Gratuit'}
        </p>
      )}
      {isAccessible && (
        <span
          className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-2"
          aria-label="Activité accessible PMR"
        >
          ♿ Accessible
        </span>
      )}
    </article>
  )
}

/**
 * App principale : header + contenu simulé
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Composant temporaire pour test de rendu */}
        <ActivityCard
          title="Concert de Jazz"
          location="Paris, France"
          date="15 août 2025"
          price={25}
          isAccessible={true}
        />
      </main>
    </div>
  )
}

export default App
