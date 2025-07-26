// =============================================
// HOOK : useSearch.ts
// Gère l'état du formulaire de recherche (où, quand, quoi)
// Projet : oùquandquoi.fr
// =============================================

import { useState, useCallback } from 'react'

export interface SearchParams {
  where: string
  when: string
  what: string
}

export function useSearch(initialParams?: Partial<SearchParams>) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    where: initialParams?.where ?? '',
    when: initialParams?.when ?? '',
    what: initialParams?.what ?? '',
  })

  const updateField = useCallback(
    (field: keyof SearchParams, value: string) => {
      setSearchParams(prev => ({ ...prev, [field]: value }))
    },
    []
  )

  const resetSearch = useCallback(() => {
    setSearchParams({ where: '', when: '', what: '' })
  }, [])

  return {
    searchParams,
    updateField,
    resetSearch,
  }
}
