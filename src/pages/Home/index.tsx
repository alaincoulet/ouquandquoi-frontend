// src/pages/Home/index.tsx
import React, { useState, useEffect } from 'react'
import { Activity } from '../../types'
import Header from '../../components/layout/Header'
import SearchBox from '../../components/molecules/SearchBox'
import ProductCard from '../../components/molecules/ProductCard'
import Button from '../../components/atoms/Button'
import Icon from '../../components/atoms/Icon'

/**
 * Page d'accueil d'oùquandquoi.fr
 * 
 * Fonctionnalités :
 * - Affichage du header avec navigation
 * - Barre de recherche principale
 * - Grille de résultats d'activités
 * - Gestion des favoris
 * - Pagination des résultats
 */
const HomePage: React.FC = () => {
  // États pour la gestion des données et de l'interface
  const [results, setResults] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Données d'exemple pour le développement
  const sampleProducts: Activity[] = [
    {
      id: 1,
      title: "Concert de Jazz au Sunset",
      description: "Soirée jazz exceptionnelle avec des artistes internationaux dans un cadre intimiste.",
      location: "Paris, 75001",
      price: 25,
      image: "/images/concert-jazz.jpg",
      category: "Musique",
      isFavorite: false
    },
    {
      id: 2,
      title: "Exposition Monet au Musée d'Orsay",
      description: "Découvrez les chefs-d'œuvre impressionnistes de Claude Monet dans cette exposition unique.",
      location: "Paris, 75007",
      price: 16,
      image: "/images/exposition-monet.jpg",
      category: "Culture",
      isFavorite: true
    },
    {
      id: 3,
      title: "Randonnée Mont-Blanc",
      description: "Randonnée guidée de 2 jours avec vue panoramique sur le massif du Mont-Blanc.",
      location: "Chamonix, 74400",
      price: 120,
      image: "/images/mont-blanc.jpg",
      category: "Nature",
      isFavorite: false
    }
  ]

  /**
   * Initialisation des données au chargement de la page
   */
  useEffect(() => {
    setIsLoading(true)
    // Simulation d'un chargement asynchrone
    setTimeout(() => {
      setResults(sampleProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  /**
   * Gestionnaire de recherche
   */
  const handleSearch = (term: string): void => {
    setIsLoading(true)
    setSearchTerm(term)
    
    // Simulation d'une recherche asynchrone
    setTimeout(() => {
      if (term.trim() === '') {
        setResults(sampleProducts)
      } else {
        const filteredResults = sampleProducts.filter(product =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase()) ||
          product.location.toLowerCase().includes(term.toLowerCase())
        )
        setResults(filteredResults)
      }
      setIsLoading(false)
    }, 500)
  }

  /**
   * Gestionnaire de navigation depuis le header
   */
  const handleNavigation = (navId: string, href: string): void => {
    console.log(`Navigation vers ${navId}: ${href}`)
    // Ici, vous pourrez intégrer React Router ou votre système de navigation
  }

  /**
   * Gestionnaire de basculement des favoris
   */
  const handleToggleFavorite = (productId: number, isFavorite: boolean): void => {
    setResults(prevResults =>
      prevResults.map(product =>
        product.id === productId 
          ? { ...product, isFavorite } 
          : product
      )
    )
  }

  /**
   * Gestionnaire pour charger plus de résultats
   */
  const handleLoadMore = (): void => {
    console.log('Chargement de plus de résultats...')
    // Ici, vous pourrez implémenter la pagination
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header principal */}
      <Header onNavigate={handleNavigation} />

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Section hero avec recherche */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Découvrez des activités près de chez vous
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Concerts, expositions, randonnées, restaurants... 
            Trouvez l'activité parfaite pour chaque moment.
          </p>
          
          {/* Composant de recherche */}
          <div className="max-w-4xl mx-auto">
            <SearchBox onSearch={handleSearch} />
          </div>
        </section>

        {/* Section des résultats */}
        <section>
          {/* En-tête des résultats */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {searchTerm ? `Résultats pour "${searchTerm}"` : 'Activités recommandées'}
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({results.length} {results.length > 1 ? 'activités' : 'activité'})
              </span>
            </h3>
          </div>

          {/* État de chargement */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-gray-600">Recherche en cours...</span>
              </div>
            </div>
          )}

          {/* Grille des résultats */}
          {!isLoading && results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((activity) => (
                <ProductCard
                  key={activity.id}
                  product={activity}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}

          {/* État vide */}
          {!isLoading && results.length === 0 && (
            <div className="text-center py-12">
              <Icon name="search" size="xl" className="mx-auto mb-4 text-gray-400" ariaLabel="Aucun résultat" />
              <h4 className="text-xl font-medium text-gray-900 mb-2">
                Aucune activité trouvée
              </h4>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `Aucun résultat pour "${searchTerm}". Essayez avec d'autres termes.`
                  : 'Aucune activité disponible pour le moment.'
                }
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleSearch('')}
                  ariaLabel="Voir toutes les activités"
                >
                  Voir toutes les activités
                </Button>
              )}
            </div>
          )}

          {/* Bouton "Voir plus" */}
          {!isLoading && results.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="md"
                onClick={handleLoadMore}
                ariaLabel="Charger plus d'activités"
              >
                Voir plus <Icon name="arrow" className="ml-2" ariaLabel="Icône flèche vers le bas" />
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HomePage
