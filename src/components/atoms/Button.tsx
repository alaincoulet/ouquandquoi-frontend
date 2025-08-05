// src/components/atoms/Button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  ariaLabel?: string
}

/**
 * Bouton réutilisable avec variantes de style
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  ariaLabel,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500'
  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'bg-transparent border border-blue-600 text-blue-700 hover:bg-blue-50'
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
