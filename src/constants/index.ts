// =========================================
// FICHIER : src/constants/index.ts
// CONSTANTES GLOBALES DU PROJET
// Projet : oùquandquoi.fr
// =========================================

/**
 * Exemple : constantes d'environnement
 */
export const ENV = {
  IS_DEV: import.meta.env.MODE === 'development',
  IS_PROD: import.meta.env.MODE === 'production',
}

/**
 * Exemple : clés pour le localStorage
 */
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'oqq_search_history',
  USER_SETTINGS: 'oqq_user_settings',
}
