import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto safe-bottom">
      <div className="px-4 py-8">
        {/* Section principale */}
        <div className="space-y-8">
          {/* Logo et description */}
          <div className="text-center">
            <img 
              src="/src/assets/images/logo-ouquandquoi.svg" 
              alt="OùQuandQuoi"
              className="h-8 w-auto mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Découvrez les meilleures activités et événements près de chez vous
            </p>
          </div>

          {/* Navigation rapide */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Découvrir</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/activites" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    Activités
                  </a>
                </li>
                <li>
                  <a href="/lieux" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    Lieux
                  </a>
                </li>
                <li>
                  <a href="/evenements" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    Événements
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Compte</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/inscription" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    S'inscrire
                  </a>
                </li>
                <li>
                  <a href="/connexion" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    Se connecter
                  </a>
                </li>
                <li>
                  <a href="/profil" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    Mon profil
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="touch-button p-2 text-gray-400 hover:text-primary-600 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="touch-button p-2 text-gray-400 hover:text-primary-600 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="touch-button p-2 text-gray-400 hover:text-primary-600 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="/mentions-legales" className="hover:text-gray-700 transition-colors">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="hover:text-gray-700 transition-colors">
              Confidentialité
            </a>
            <a href="/cgu" className="hover:text-gray-700 transition-colors">
              CGU
            </a>
            <a href="/contact" className="hover:text-gray-700 transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2025 OùQuandQuoi. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
