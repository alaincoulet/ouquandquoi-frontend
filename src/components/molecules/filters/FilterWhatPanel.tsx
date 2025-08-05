import React, { useState, useRef, useEffect } from 'react'

interface FilterWhatPanelProps {
  value: {
    keyword: string
    category?: string
    subcategory?: string
  }
  onChange: (val: { keyword: string; category?: string; subcategory?: string }) => void
  onClose: () => void
}

const CATEGORIES = [
  {
    name: "Événements & divertissements",
    sub: [
      "Arts vivants",
      "Événements festifs",
      "Événements professionnels",
      "Salons expositions, artisanat",
      "Loisirs ludiques",
      "Jeux, tournois, concours"
    ]
  },
  {
    name: "Sports",
    sub: [
      "Sports collectifs",
      "Sports individuels",
      "Sports de combats",
      "Sports de pleine nature",
      "Sports mécaniques",
      "Sports adaptés"
    ]
  },
  {
    name: "Gastronomie",
    sub: [
      "Cours de cuisine",
      "Dégustations",
      "Produits du terroir",
      "Restaurants"
    ]
  },
  {
    name: "Culture & patrimoine",
    sub: [
      "Musées & expositions",
      "Monuments & fouilles",
      "Arts plastiques & numériques",
      "Patrimoines industriels",
      "Patrimoines naturels",
      "Littérature & écriture"
    ]
  },
  {
    name: "Nature",
    sub: [
      "Jardinage & botanique",
      "Observation faune & flore",
      "Écotourisme"
    ]
  },
  {
    name: "Bien-être",
    sub: [
      "Soin du corps",
      "Soin de l’esprit"
    ]
  }
];

export function FilterWhatPanel({ value, onChange, onClose }: FilterWhatPanelProps) {
  const [input, setInput] = useState(value.keyword || "")
  const [selectedCat, setSelectedCat] = useState<string | undefined>(value.category)
  const [selectedSub, setSelectedSub] = useState<string | undefined>(value.subcategory)
  const inputRef = useRef<HTMLInputElement>(null)

  // Autofocus et curseur au début
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.setSelectionRange(0, 0)
  }, [])

  // Reset catégorie/sous-catégorie si on retape un mot-clé
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setSelectedCat(undefined)
    setSelectedSub(undefined)
  }

  // Sélection sous-catégorie
  const handleSelectSub = (cat: string, sub: string) => {
    setSelectedCat(cat)
    setSelectedSub(sub)
  }

  // Validation manuelle
  const handleValidate = () => {
    if (!input.trim() && !selectedCat && !selectedSub) return
    onChange({ keyword: input, category: selectedCat, subcategory: selectedSub })
    onClose()
  }

  return (
    <div className="absolute top-full left-0 bg-white border shadow rounded-lg p-0 z-20 w-[340px] max-h-[450px] flex flex-col">
      {/* Header + Champ de saisie FIXE EN HAUT */}
      <div className="sticky top-0 bg-white p-4 z-10 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Quoi ?</span>
          <button onClick={onClose} className="text-xs text-gray-500">Fermer</button>
        </div>
        <label htmlFor="what-input" className="block text-sm font-medium text-gray-700 mb-1">
          Votre activité recherchée ?
        </label>
        <input
          ref={inputRef}
          id="what-input"
          type="text"
          className="w-full border rounded-lg p-2 text-base"
          value={input}
          onChange={handleInput}
          onKeyDown={e => {
            if (e.key === 'Enter') handleValidate()
          }}
        />
      </div>

      {/* Liste des catégories et sous-catégories SCROLLABLE */}
      <div className="flex-1 overflow-auto p-4 pt-0">
        {CATEGORIES.map(category => (
          <div key={category.name} className="mb-2">
            <div className="font-semibold text-green-700 mb-1">{category.name}</div>
            <div className="flex flex-wrap gap-2">
              {category.sub.map(sub => (
                <button
                  key={sub}
                  className={`bg-gray-100 hover:bg-green-100 text-gray-800 text-xs px-3 py-1 rounded-lg border transition ${
                    selectedCat === category.name && selectedSub === sub ? 'bg-green-200 font-bold border-green-600' : ''
                  }`}
                  onClick={() => handleSelectSub(category.name, sub)}
                  type="button"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={handleValidate}
          className="w-full bg-green-600 text-white rounded-lg py-2 font-medium hover:bg-green-700 transition"
        >
          Valider
        </button>
        <div className="mt-2 text-xs text-gray-400">Par défaut : Toutes les activités</div>
      </div>
    </div>
  )
}
