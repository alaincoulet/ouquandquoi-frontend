// ============================================================================
// Composant principal : Header.tsx
// Header responsive pour oùquandquoi.fr (mobile + desktop)
// Contient le logo, le bouton, les filtres, et la navigation utilisateur
// ============================================================================

import { useState } from 'react'
import { SearchFilters } from '@/components/molecules/SearchFilters'
import { CategoryNav } from '@/components/layout/CategoryNav'
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Left side : Logo + Menu mobile */}
          <div className="flex items-center gap-4">
            {/* Menu burger (mobile uniquement) */}
            <button
              onClick={toggleMenu}
              className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Menu principal"
            >
              {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <span className="text-xl font-bold text-green-600 tracking-tight">
              oùquandquoi
            </span>
          </div>

          {/* Middle : SearchFilters (responsive) */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchFilters />
          </div>

          {/* Right side : Déposer activité + icônes utilisateur */}
          <div className="flex items-center gap-4">
            {/* Bouton Déposer une activité */}
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              <span className="text-lg">＋</span>
              <span className="text-sm">Déposer une activité</span>
            </button>

            {/* Icônes utilisateur (desktop uniquement) */}
            <div className="hidden lg:flex gap-4 text-gray-600">
              <button className="hover:text-blue-600" aria-label="Mes recherches">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              <button className="hover:text-red-500" aria-label="Mes favoris">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="hover:text-blue-600" aria-label="Messages">
                <ChatBubbleOvalLeftIcon className="w-5 h-5" />
              </button>
              <button className="hover:text-blue-600" aria-label="Profil utilisateur">
                <UserIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filtres affichés sous le header en mobile */}
        {menuOpen && (
          <div className="block md:hidden px-4 pb-4">
            <SearchFilters />
          </div>
        )}
      </header>

      {/* Barre de navigation par catégories */}
      <CategoryNav />
    </>
  )
}
