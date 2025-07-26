// src/components/layout/MobileMenu.tsx
import React from 'react'
import { MobileMenuProps } from '../../types'

/**
 * Composant MobileMenu pour la navigation mobile d'oùquandquoi.fr
 * 
 * Note : Ce composant peut être simplifié car la logique du menu mobile
 * est maintenant intégrée directement dans le Header pour une meilleure cohérence.
 * 
 * @param isOpen - État d'ouverture du menu
 * @param onClose - Fonction de fermeture du menu
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Si le menu n'est pas ouvert, ne rien rendre
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation mobile"
    >
      <div 
        className="bg-white w-full max-w-sm h-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Fermer le menu de navigation"
            >
              ✕
            </button>
          </div>
          
          <div className="text-center text-gray-500">
            <p>Menu mobile intégré dans le Header</p>
            <p className="text-sm mt-2">
              Ce composant peut être supprimé car la navigation mobile 
              est maintenant gérée directement dans le composant Header.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
