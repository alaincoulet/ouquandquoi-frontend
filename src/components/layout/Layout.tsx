// src/components/layout/Layout.tsx
import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  showFooter?: boolean
}

/**
 * Composant Layout principal pour structurer toutes les pages
 * 
 * Avantages :
 * - Structure cohérente sur toute l'application
 * - Gestion centralisée du Header/Footer
 * - Optimisation SEO avec structure sémantique
 * - Accessibilité avec landmarks ARIA
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '',
  showHeader = true,
  showFooter = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-quicksand">
      {showHeader && (
        <Header onNavigate={(navId, href) => {
          // Logique de navigation globale
          console.log(`Navigation: ${navId} -> ${href}`)
        }} />
      )}
      
      <main 
        className={`flex-1 ${className}`}
        role="main"
        aria-label="Contenu principal"
      >
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout
