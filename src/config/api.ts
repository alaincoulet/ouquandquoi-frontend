// ==========================================================
// FICHIER : src/services/api.ts
// CONFIGURATION AXIOS + méthode de recherche d'activités
// Projet : oùquandquoi.fr
// ==========================================================

import axios, { AxiosInstance, AxiosError } from 'axios'
import { SearchParams } from '@/types/search'

/**
 * Base URL de l'API (modifier selon ton back-end)
 */
const BASE_URL = 'https://api.ouquandquoi.fr'

/**
 * Instance axios avec configuration commune
 */
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Gestion d'erreur centralisée (optionnel)
 */
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.error('Erreur API :', error.message)
    return Promise.reject(error)
  }
)

/**
 * Appel à l'API pour rechercher des activités
 * Peut évoluer : POST /search ou GET avec query params
 */
export const searchActivities = async (params: SearchParams) => {
  try {
    const response = await api.post('/activities/search', params)
    return response.data // typage à affiner quand tu connais la structure
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
    throw error
  }
}

export default api
