// src/components/molecules/filters/FilterWherePanel.tsx
// Filtre “Où ?” — avec option pour masquer la distance si besoin

import React, { useState } from 'react'

interface FilterWherePanelProps {
  value: string
  onChange: (val: string) => void
  onClose: () => void
  hideDistance?: boolean // Ajout : masquer la distance ?
}

const MOCK_CITIES = [
  { name: "Paris", cp: "75000" },
  { name: "Toulouse", cp: "31000" },
  { name: "Bordeaux", cp: "33000" },
  { name: "Lyon", cp: "69000" },
  { name: "Marseille", cp: "13000" },
  { name: "Pau", cp: "64000" },
  { name: "Lourdes", cp: "65100" }
]

const DISTANCES = [10, 20, 50, 100]

export function FilterWherePanel({ value, onChange, onClose, hideDistance = false }: FilterWherePanelProps) {
  const [input, setInput] = useState(value)
  const [selectedCity, setSelectedCity] = useState<{name: string, cp: string} | null>(null)
  const [distance, setDistance] = useState(50)

  const filteredCities = input.length > 0
    ? MOCK_CITIES.filter(
        city =>
          city.name.toLowerCase().includes(input.toLowerCase()) ||
          city.cp.startsWith(input)
      )
    : MOCK_CITIES

  const handleSelectCity = (city: {name: string, cp: string}) => {
    setSelectedCity(city)
    setInput(`${city.name} (${city.cp})`)
    // Pas de distance si hideDistance
    if (hideDistance) onChange(`${city.name} (${city.cp})`)
    else onChange(`${city.name} (${city.cp}), ${distance} km`)
  }

  const handleValidate = () => {
    let val = selectedCity
      ? `${selectedCity.name} (${selectedCity.cp})`
      : input
    if (!hideDistance && (selectedCity || input)) {
      val += `, ${distance} km`
    }
    onChange(val)
    onClose()
  }

  function MockMap() {
    return (
      <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center mb-2 text-gray-500 text-xs">
        [Carte interactive ici bientôt]
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 bg-white border shadow rounded-lg p-4 z-20 w-80">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Où ?</span>
        <button onClick={onClose} className="text-xs text-gray-500">Fermer</button>
      </div>
      <input
        type="text"
        className="w-full border rounded-lg p-2 mb-2"
        placeholder="Ville ou code postal"
        value={input}
        onChange={e => {
          setInput(e.target.value)
          setSelectedCity(null)
        }}
        autoFocus
      />
      <div className="max-h-32 overflow-auto mb-2">
        {filteredCities.map(city => (
          <button
            key={city.cp}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
              selectedCity?.cp === city.cp ? 'bg-green-100 font-semibold' : ''
            }`}
            onClick={() => handleSelectCity(city)}
            type="button"
          >
            {city.name} ({city.cp})
          </button>
        ))}
      </div>

      <MockMap />

      {/* Affiche la distance uniquement si ce n'est pas masqué */}
      {!hideDistance && (
        <div className="flex items-center gap-2 mt-2 mb-2">
          <label htmlFor="distance" className="text-xs text-gray-500">Distance :</label>
          <select
            id="distance"
            className="border rounded p-1"
            value={distance}
            onChange={e => setDistance(Number(e.target.value))}
          >
            {DISTANCES.map(d => (
              <option key={d} value={d}>{d} km</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleValidate}
        className="mt-2 w-full bg-green-600 text-white rounded-lg py-2 font-medium hover:bg-green-700 transition"
      >
        Valider
      </button>
    </div>
  )
}
