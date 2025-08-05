// src/components/layout/Layout.tsx
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * Composant Layout principal pour structurer toutes les pages (plus de header/footer ici !)
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col font-quicksand ${className}`}>
      <main role="main" aria-label="Contenu principal" className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout
