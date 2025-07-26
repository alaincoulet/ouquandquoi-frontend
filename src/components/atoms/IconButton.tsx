// ============================================================================
// Composant atomique : IconButton.tsx
// Usage actuel : Filtres de recherche "Où ?", "Quand ?", "Quoi ?"
// Design : icône à gauche + texte, avec état actif et accessibilité
// Projet : oùquandquoi.fr (page d’accueil - header)
// ============================================================================

import { ReactNode } from 'react'

interface IconButtonProps {
  label: string         // Texte du bouton (ex : "Où ?")
  icon: ReactNode       // Icône JSX à afficher à gauche
  onClick?: () => void  // Fonction appelée au clic
  isActive?: boolean    // Style actif pour le filtre sélectionné
  disabled?: boolean    // Bouton désactivé
  className?: string    // Classes CSS supplémentaires
}

export function IconButton({
  label,
  icon,
  onClick,
  isActive = false,
  disabled = false,
  className = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full border
        text-sm font-medium transition-all duration-150
        ${
          isActive
            ? 'border-green-600 text-green-600 bg-green-50'
            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        ${className}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
