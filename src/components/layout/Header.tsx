// src/components/layout/Header.tsx
import { useState } from 'react'
import { SearchFilters } from '@/components/molecules/SearchFilters'
import { CategoryNav } from '@/components/layout/CategoryNav'
import MobileMenu from '@/components/layout/MobileMenu'
import {
  Bars3Icon,
  UserIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onNavigate?: (navId: string, href: string) => void
  favoritesActive?: boolean
  onToggleFavorites?: () => void
}

const Header = ({ onNavigate, favoritesActive = false, onToggleFavorites }: HeaderProps) => {
  const [search, setSearch] = useState<{ keyword: string, category?: string, subcategory?: string }>({
    keyword: "",
    category: undefined,
    subcategory: undefined
  })
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCategorySelect = (category: string, subcategory?: string) => {
    setSearch({
      keyword: "",
      category,
      subcategory
    })
    onNavigate?.('category', `/category/${category}`)
  }

  const handleWhatChange = (val: { keyword: string, category?: string, subcategory?: string }) => {
    setSearch(val)
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Menu principal"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Link
              to="/"
              onClick={() => onNavigate?.('logo', '/')}
              className="text-xl font-bold text-green-600 tracking-tight"
            >
              oùquandquoi
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <SearchFilters value={search} onWhatChange={handleWhatChange} />
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/deposer"
              onClick={() => onNavigate?.('deposer', '/deposer')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              <span className="text-lg">＋</span>
              <span className="text-sm">Déposer une activité</span>
            </Link>
            <div className="hidden lg:flex gap-4 text-gray-600">
              <button
                onClick={() => onNavigate?.('search', '/search')}
                className="hover:text-blue-600"
                aria-label="Mes recherches"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              {/* Bouton Favoris */}
              <button
                className={`relative group focus:outline-none`}
                aria-label={favoritesActive ? "Voir toutes les activités" : "Afficher mes favoris en premier"}
                onClick={onToggleFavorites}
                tabIndex={0}
              >
                {/* Cœur SVG jaune plein si actif, gris contour sinon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 transition-colors duration-150 ${
                    favoritesActive ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-400"
                  }`}
                  fill={favoritesActive ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke={favoritesActive ? "currentColor" : "#a1a1aa"}
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21C12 21 4 13.888 4 8.941A4.941 4.941 0 019 4a5.024 5.024 0 013 1.05A5.024 5.024 0 0115 4a4.941 4.941 0 015 4.941C20 13.888 12 21 12 21z"
                    fill={favoritesActive ? "currentColor" : "none"}
                  />
                </svg>
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
        {(search.category || search.subcategory) && (
          <div className="flex justify-center mt-1 text-green-700 text-sm">
            <span>
              Dans {search.category}
              {search.subcategory ? " / " + search.subcategory : ""}
            </span>
          </div>
        )}
      </header>
      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        onCategorySelect={handleCategorySelect}
        catSelection={search}
      />
      <div className="relative">
        <CategoryNav
          onSelect={handleCategorySelect}
          selected={search}
          mode="horizontal"
        />
      </div>
    </>
  )
}

export default Header
