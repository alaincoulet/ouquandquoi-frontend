// src/components/molecules/ProductCard.tsx
// Composant carte activité, avec gestion favori (cœur), UX optimisée et a11y
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: {
    id: string | number
    title: string
    description: string
    location?: string
    when?: string
    image?: string
    isFavorite?: boolean
  }
  // Appelée quand on veut changer l'état favori (sera gérée côté parent)
  onToggleFavorite?: (id: string | number, newFav: boolean) => Promise<void> | void
  modeCarousel?: boolean
}

// Utilitaire : coupe le texte sans mot tronqué
function truncateText(text: string, maxLength: number) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  const truncated = text.slice(0, maxLength)
  return truncated.slice(0, truncated.lastIndexOf(' ')) + '...'
}

// Proportions carte (A4 + zone texte plus haute)
const CARD_WIDTH = 288
const TEXT_HEIGHT = 72
const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.414) + (TEXT_HEIGHT - 48)

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
  modeCarousel = false,
}) => {
  // Gestion optimiste du favori (UX : le cœur se met à jour sans attendre la réponse serveur)
  const [favLocal, setFavLocal] = useState(product.isFavorite ?? false)
  const [loadingFav, setLoadingFav] = useState(false)

  const imageSrc =
    product.image && !product.image.includes("undefined")
      ? product.image
      : "/placeholder.png"

  const maxTitle = 38
  const maxInfo = 45
  const maxDesc = 60

  const infoLine = product.location
    ? product.when
      ? `${product.location}, ${product.when}`
      : product.location
    : product.when || ''

  // Gestion du clic cœur : PATCH favori si handler fourni, sinon local
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loadingFav) return // anti double-clic
    setLoadingFav(true)
    const newFav = !favLocal
    setFavLocal(newFav)
    try {
      if (onToggleFavorite) {
        // Peut être async : on attend la réponse du parent (mise à jour API)
        await onToggleFavorite(product.id, newFav)
      }
    } catch (err) {
      // Rollback UX si échec API
      setFavLocal(!newFav)
      // Option : afficher un toast/alerte "Erreur serveur"
    } finally {
      setLoadingFav(false)
    }
  }

  return (
    <Link to={`/activity/${product.id}`} className="block group focus:outline-none">
      <article
        className="bg-white border rounded-lg shadow-md overflow-hidden group-hover:shadow-xl transition-shadow min-w-[16rem] max-w-[18rem] relative"
        style={{
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`
        }}
      >
        {/* Bloc image */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: `${CARD_HEIGHT - TEXT_HEIGHT}px`,
            background: '#fafafa'
          }}
        >
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-full object-contain"
            loading="lazy"
            style={{ display: 'block', margin: '0 auto', maxHeight: '100%', maxWidth: '100%' }}
          />
          {/* Bouton favori coin haut-droite */}
          {onToggleFavorite && (
            <button
              className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 shadow hover:bg-yellow-100 transition focus:outline-none focus:ring focus:ring-yellow-300"
              onClick={handleFavoriteClick}
              aria-label={favLocal ? "Retirer des favoris" : "Ajouter aux favoris"}
              tabIndex={0}
              disabled={loadingFav}
              type="button"
            >
              {/* SVG cœur : plein si favori, contour sinon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${favLocal ? "text-yellow-400" : "text-gray-400"} transition`}
                fill={favLocal ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke={favLocal ? "currentColor" : "#a1a1aa"}
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={favLocal
                    ? "M12 21C12 21 4 13.888 4 8.941A4.941 4.941 0 019 4a5.024 5.024 0 013 1.05A5.024 5.024 0 0115 4a4.941 4.941 0 015 4.941C20 13.888 12 21 12 21z"
                    : "M12 21C12 21 4 13.888 4 8.941A4.941 4.941 0 019 4a5.024 5.024 0 013 1.05A5.024 5.024 0 0115 4a4.941 4.941 0 015 4.941C20 13.888 12 21 12 21z"}
                  fill={favLocal ? "currentColor" : "none"}
                />
              </svg>
            </button>
          )}
        </div>
        {/* Bloc texte, lisible et accessible */}
        <div
          className="absolute left-0 bottom-0 w-full px-4 py-1 bg-white flex flex-col justify-center"
          style={{
            height: `${TEXT_HEIGHT}px`,
            lineHeight: 1.25,
            boxSizing: 'border-box'
          }}
        >
          <h2 className="font-bold text-base text-green-800 truncate" style={{ margin: 0 }}>
            {truncateText(product.title, maxTitle)}
          </h2>
          {infoLine && (
            <div className="text-xs text-gray-600 truncate" style={{ margin: 0 }}>
              {truncateText(infoLine, maxInfo)}
            </div>
          )}
          <p className="text-sm text-gray-700 truncate" style={{ margin: 0 }}>
            {truncateText(product.description, maxDesc)}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
