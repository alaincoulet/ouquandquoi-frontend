import React from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu panel */}
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
        <div className="p-6 safe-top">
          {/* Header menu avec bouton fermer */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="touch-button p-2 rounded-lg hover:bg-gray-100"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation principale */}
          <nav className="space-y-2">
            <a 
              href="/" 
              className="flex items-center px-4 py-4 text-lg font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Accueil
            </a>

            <a 
              href="/activites" 
              className="flex items-center px-4 py-4 text-lg font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Activités
            </a>

            <a 
              href="/lieux" 
              className="flex items-center px-4 py-4 text-lg font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lieux
            </a>

            <a 
              href="/favoris" 
              className="flex items-center px-4 py-4 text-lg font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Mes Favoris
            </a>

            <a 
              href="/profil" 
              className="flex items-center px-4 py-4 text-lg font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mon Profil
            </a>
          </nav>

          {/* Section secondaire */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="space-y-2">
              <a 
                href="/aide" 
                className="flex items-center px-4 py-3 text-base text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={onClose}
              >
                Aide & Support
              </a>
              <a 
                href="/contact" 
                className="flex items-center px-4 py-3 text-base text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={onClose}
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
