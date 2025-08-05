// src/components/layout/CategoryNav.tsx
/**
 * Composant de navigation des catégories/sous-catégories pour oùquandquoi.fr.
 * S'appuie sur la liste centralisée des catégories dans src/utils/categories.ts.
 */

import React, { useState } from 'react'
import { CATEGORIES } from '@/utils/categories'

interface CategoryNavProps {
  onSelect: (cat: string, subcat: string) => void
  selected?: { category?: string; subcategory?: string }
  mode?: 'horizontal' | 'vertical'
}

export function CategoryNav({ onSelect, selected, mode = 'horizontal' }: CategoryNavProps) {
  const [openCat, setOpenCat] = useState<string | null>(null)

  // Style responsive (horizontal: barre, vertical: menu colonne)
  const containerClass = mode === 'horizontal'
    ? "flex gap-6 px-4 py-2"
    : "flex flex-col gap-2 px-4 py-2"

  return (
    <nav className={mode === 'horizontal' ? "bg-white border-b border-gray-200 w-full" : ""}>
      <div className={containerClass}>
        {CATEGORIES.map(category => (
          <div key={category.name} className="relative">
            <button
              className={`font-medium px-2 pb-1 transition 
                ${openCat === category.name || selected?.category === category.name
                  ? "text-green-700 border-b-2 border-green-600"
                  : "text-gray-700 hover:text-green-700"
                }`}
              onClick={() => setOpenCat(openCat === category.name ? null : category.name)}
              type="button"
            >
              {category.name}
            </button>
            {/* Sous-catégories (menu déroulant) */}
            {openCat === category.name && (
              <div className={
                mode === 'horizontal'
                  ? "absolute left-0 top-full mt-2 w-max bg-white border rounded-lg shadow-lg z-40 p-3 flex flex-col gap-1"
                  : "mt-1 ml-4 flex flex-col gap-1"
              }>
                {category.sub.map(sub => (
                  <button
                    key={sub}
                    className={`text-left px-3 py-1 rounded hover:bg-green-100 transition text-sm ${
                      selected?.category === category.name && selected?.subcategory === sub
                        ? "bg-green-200 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      onSelect(category.name, sub)
                      setOpenCat(null)
                    }}
                    type="button"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
