// src/components/molecules/SearchBox.tsx
import React, { useState } from 'react'

interface SearchBoxProps {
  onSearch: (term: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(input)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Rechercher une activité, une ville…"
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        aria-label="Lancer la recherche"
      >
        Rechercher
      </button>
    </form>
  )
}

export default SearchBox
