// ===============================================
// FICHIER : src/types/search.ts
// Type partagé pour la recherche multi-critères
// Projet : oùquandquoi.fr
// ===============================================

export interface SearchParams {
  // Critère géographique
  lieu: string            // nom de ville ou code postal
  rayonKm: number         // rayon de recherche (en km)

  // Critères temporels
  dateUnique?: string     // ISO format: YYYY-MM-DD (pour recherche par jour)
  dateDebut?: string      // pour une période
  dateFin?: string        // pour une période

  // Critères de contenu
  categorieId?: string    // identifiant catégorie (UUID ou slug)
  sousCategorieId?: string // identifiant sous-catégorie
  motCle?: string         // recherche libre
}
