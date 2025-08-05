// src/pages/Home/index.tsx
// Page d’accueil, affiche activités, favoris, synchronisée avec le header (props)

import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import SearchBox from '@/components/molecules/SearchBox'
import ProductCard from '@/components/molecules/ProductCard'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Carousel from '@/components/carousel/Carousel'

interface HomePageProps {
  favoritesActive: boolean
  onToggleFavorites: () => void
}

const HomePage: React.FC<HomePageProps> = ({ favoritesActive, onToggleFavorites }) => {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => { fetchActivities() }, [])

  const fetchActivities = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:4000/api/activities")
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setErrorMsg("Erreur lors de la récupération des activités")
    } finally {
      setIsLoading(false)
    }
  }

  // PATCH favori
  const handleToggleFavorite = async (id: string | number, newFav: boolean) => {
    setResults(results => results.map(activity =>
      activity.id === id ? { ...activity, isFavorite: newFav } : activity
    ))
    try {
      const res = await fetch(`http://localhost:4000/api/activities/${id}/favorite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: newFav })
      })
      if (!res.ok) throw new Error()
    } catch (err) {
      setResults(results => results.map(activity =>
        activity.id === id ? { ...activity, isFavorite: !newFav } : activity
      ))
      setErrorMsg("Impossible de mettre à jour le favori. Vérifiez votre connexion.")
    }
  }

  // Recherche (avant split)
  const searchedResults = searchTerm
    ? results.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : results

  // Split favoris/autres
  const favorites = searchedResults.filter((a) => a.isFavorite)
  const others = searchedResults.filter((a) => !a.isFavorite)

  // Affichage selon état favorisActive
  let sectionFavorites: React.ReactNode = null
  let sectionOthers: React.ReactNode = null

  if (favoritesActive) {
    // Mode favoris actif
    sectionFavorites = favorites.length > 0 && (
      <>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-black flex items-center">
            Mes favoris
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({favorites.length} {favorites.length > 1 ? 'activités' : 'activité'})
            </span>
          </h3>
        </div>
        <div className="mb-8">
          <Carousel
            items={favorites}
            renderItem={(activity) => (
              <ProductCard
                product={activity}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
            spacing="gap-6"
          />
        </div>
      </>
    )
    sectionOthers = others.length > 0 && (
      <>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-semibold text-gray-900">
            Activités en ligne
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({others.length} {others.length > 1 ? 'activités' : 'activité'})
            </span>
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {others.map(activity => (
            <div key={activity.id} className="flex flex-col items-center">
              <ProductCard
                product={activity}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>
      </>
    )
  } else {
    // Mode normal (pas de section favoris)
    sectionOthers = (
      <>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Activités en ligne
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({searchedResults.length} {searchedResults.length > 1 ? 'activités' : 'activité'})
            </span>
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {searchedResults.map(activity => (
            <div key={activity.id} className="flex flex-col items-center">
              <ProductCard
                product={activity}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <Layout>
      {/* Ajout du bouton toggle favoris dans la page, synchronisé avec le header */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Découvrez des activités près de chez vous
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Concerts, expositions, randonnées, restaurants…
          </p>
          <div className="max-w-4xl mx-auto">
            <SearchBox onSearch={setSearchTerm} />
          </div>
        </section>
        <section>
          {sectionFavorites}
          {sectionOthers}
          {!isLoading && !sectionOthers && !sectionFavorites && (
            <div className="text-center py-12">
              <Icon
                name="search"
                size="xl"
                className="mx-auto mb-4 text-gray-400"
                ariaLabel="Aucun résultat"
              />
              <h4 className="text-xl font-medium text-gray-900 mb-2">
                Aucune activité trouvée
              </h4>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? `Aucun résultat pour “${searchTerm}”.`
                  : 'Aucune activité disponible.'}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSearchTerm('')}
                  ariaLabel="Voir toutes les activités"
                >
                  Voir toutes les activités
                </Button>
              )}
            </div>
          )}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" />
                <span className="text-gray-600">Chargement…</span>
              </div>
            </div>
          )}
          {errorMsg && (
            <div className="text-center text-red-600 mb-4">{errorMsg}</div>
          )}
        </section>
      </main>
    </Layout>
  )
}

export default HomePage
