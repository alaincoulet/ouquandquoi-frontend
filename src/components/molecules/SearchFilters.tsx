// ============================================================================
// Composant molécule : SearchFilters.tsx
// Regroupe les 3 filtres de recherche : Où ?, Quand ?, Quoi ?
// Projet : oùquandquoi.fr
// Usage : Header de la page d’accueil (mobile & desktop)
// ============================================================================

import { useState } from 'react'
import { IconButton } from '@/components/atoms/IconButton'
import {
  MapPinIcon,
  CalendarIcon,
  KeyIcon
} from '@heroicons/react/24/solid'

type FilterType = 'where' | 'when' | 'what' | null

export function SearchFilters() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null)

  const handleClick = (filter: FilterType) => {
    setActiveFilter(prev => (prev === filter ? null : filter))
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <IconButton
        label="Où ?"
        icon={<MapPinIcon className="w-5 h-5" />}
        isActive={activeFilter === 'where'}
        onClick={() => handleClick('where')}
      />
      <IconButton
        label="Quand ?"
        icon={<CalendarIcon className="w-5 h-5" />}
        isActive={activeFilter === 'when'}
        onClick={() => handleClick('when')}
      />
      <IconButton
        label="Quoi ?"
        icon={<KeyIcon className="w-5 h-5" />}
        isActive={activeFilter === 'what'}
        onClick={() => handleClick('what')}
      />
    </div>
  )
}
