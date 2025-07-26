// ============================================================================
// Composant CategoryNav.tsx
// Barre de navigation secondaire pour oùquandquoi.fr
// Catégories d’activités — responsive et accessible
// ============================================================================

import React from 'react'

const categories = [
  'Événements & divertissements',
  'Sports',
  'Culture & patrimoine',
  'Gastronomie',
  'Bien-être',
  'Nature',
]

export function CategoryNav() {
  return (
    <nav
      aria-label="Catégories d’activités"
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <ul className="flex overflow-x-auto space-x-4 px-4 sm:px-6 lg:px-8 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
        {categories.map((category) => (
          <li key={category}>
            <button
              className="px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              aria-label={`Catégorie ${category}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
