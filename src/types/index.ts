// src/types/index.ts
import React from 'react'

/**
 * Types pour les composants de base (Atoms)
 * Respectent les standards d'accessibilité WCAG
 */
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
  ariaLabel: string
  className?: string
}

export interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  id?: string
  name?: string
  ariaDescribedBy?: string
  ariaLabel?: string  // ← Ajout de cette propriété optionnelle
  className?: string
}

export interface IconProps {
  name: 'search' | 'location' | 'calendar' | 'filter' | 'star' | 'heart' | 'arrow' | 'close' | 'menu'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
  ariaLabel: string
}

/**
 * Types pour les données métier d'oùquandquoi.fr
 */
export interface Activity {
  id: string                    // id généré côté backend (string, pour compatibilité JSON)
  title: string                 // titre de l'activité
  description: string           // description de l'activité
  location: string              // lieu (ville, code postal)
  user: string                  // nom de l'utilisateur (souvent 'Alain')
  image: string                 // chemin image côté backend (ex: /images/xxx.png)
  createdAt: string             // date ISO de création
  category?: string             // 🆕 catégorie principale
  subcategory?: string          // 🆕 sous-catégorie (optionnelle)
}

/**
 * Types pour les composants complexes (Molecules & Organisms)
 */
export interface HeaderProps {
  onNavigate: (navId: string, href: string) => void
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export interface ProductCardProps {
  product: Activity
  onToggleFavorite: (id: string, isFavorite: boolean) => void
}

export interface SearchBoxProps {
  onSearch: (term: string) => void
}
