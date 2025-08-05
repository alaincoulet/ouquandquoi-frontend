// src/components/atoms/Icon.tsx
import React from 'react'

interface IconProps {
  name: 'search' | 'arrow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  ariaLabel?: string
}

/**
 * Icône SVG générique (exemple pour 2 icônes)
 */
const iconPaths = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className = '',
  ariaLabel
}) => (
  <span
    className={`inline-block ${sizes[size]} ${className}`}
    role="img"
    aria-label={ariaLabel}
  >
    {iconPaths[name] || null}
  </span>
)

export default Icon
