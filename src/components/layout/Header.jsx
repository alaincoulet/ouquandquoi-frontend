import React, { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className="mobile-header bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 safe-top">
          {/* Logo OùQuandQuoi */}
          <div className="flex items-center">
            <img 
              src="/src/assets/images/logo-ouquandquoi.svg" 
              alt="OùQuandQuoi - Découvrez les activités près de chez vous"
              className="h-8 w-auto"
            />
          </div>

          {/* Actions navigation */}
          <div className="flex items-center space-x-2">
            {/* Bouton recherche */}
            <button
              onClick={toggleSearch}
              className="touch-button p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-transform duration-150"
              aria-label="Ouvrir la recherche"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Bouton menu hamburger */}
            <button
              onClick={toggleMenu}
              className="touch-button p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-transform duration-150"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay recherche */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 safe-top">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSearch}
                className="touch-button p-2 rounded-lg"
                aria-label="Fermer la recherche"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <input
                type="search"
                placeholder="Rechercher une activité, un lieu..."
                className="flex-1 p-3 text-lg border-b-2 border-gray-200 focus:border-primary-500 outline-none"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Composant MobileMenu modulaire */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default Header;
