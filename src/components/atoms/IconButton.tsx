// src/components/atoms/IconButton.tsx
import { ReactNode } from 'react'

interface IconButtonProps {
  label: string
  icon: ReactNode
  onClick?: () => void
  isActive?: boolean
  disabled?: boolean
  className?: string
}

/**
 * Bouton icône + texte réutilisable pour les filtres ou actions rapides.
 */
const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  onClick,
  isActive = false,
  disabled = false,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full border
      text-sm font-medium transition-all duration-150
      ${isActive ? 'border-green-600 text-green-600 bg-green-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      ${className}
    `}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
)

export default IconButton
