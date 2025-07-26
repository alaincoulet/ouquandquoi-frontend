// =============================================
// HOOK : useGeolocation.ts
// Permet d'obtenir la position GPS de l'utilisateur
// Typé & compatible React 19
// =============================================

import { useEffect, useState } from 'react'

interface GeolocationPosition {
  coords: {
    latitude: number
    longitude: number
    accuracy: number
  }
  timestamp: number
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

interface UseGeolocationReturn {
  position: GeolocationPosition | null
  error: string | null
  loading: boolean
}

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n’est pas supportée par votre navigateur.')
      setLoading(false)
      return
    }

    const successHandler = (pos: GeolocationPosition) => {
      setPosition(pos)
      setError(null)
      setLoading(false)
    }

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message)
      setLoading(false)
    }

    const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, options)

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [options])

  return { position, error, loading }
}
