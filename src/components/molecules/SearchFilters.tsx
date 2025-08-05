import { useState } from 'react'
import IconButton from '@/components/atoms/IconButton'
import { FilterWherePanel } from './filters/FilterWherePanel'
import { FilterWhenPanel } from './filters/FilterWhenPanel'
import { FilterWhatPanel } from './filters/FilterWhatPanel'
import {
  MapPinIcon,
  CalendarIcon,
  KeyIcon
} from '@heroicons/react/24/solid'

type FilterType = 'where' | 'when' | 'what' | null

interface SearchFiltersProps {
  value: { keyword: string; category?: string; subcategory?: string }
  onWhatChange: (val: { keyword: string; category?: string; subcategory?: string }) => void
}

export function SearchFilters({ value, onWhatChange }: SearchFiltersProps) {
  const [where, setWhere] = useState('France')
  const [when, setWhen] = useState('Toute l’année')
  const [activeFilter, setActiveFilter] = useState<FilterType>(null)

  const handleClick = (filter: FilterType) => {
    setActiveFilter(prev => (prev === filter ? null : filter))
  }

  const handleClosePanel = () => setActiveFilter(null)

  function renderWhatLabel() {
    return value.keyword ? value.keyword : "Quoi ?"
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start relative">
        {/* Où ? */}
        <div className="relative">
          <IconButton
            label={where === 'France' ? 'Où ?' : where}
            icon={<MapPinIcon className="w-5 h-5" />}
            isActive={activeFilter === 'where'}
            onClick={() => handleClick('where')}
          />
          {activeFilter === 'where' && (
            <FilterWherePanel
              value={where}
              onChange={setWhere}
              onClose={handleClosePanel}
            />
          )}
        </div>

        {/* Quand ? */}
        <div className="relative">
          <IconButton
            label={when === 'Toute l’année' ? 'Quand ?' : when}
            icon={<CalendarIcon className="w-5 h-5" />}
            isActive={activeFilter === 'when'}
            onClick={() => handleClick('when')}
          />
          {activeFilter === 'when' && (
            <FilterWhenPanel
              value={when}
              onChange={setWhen}
              onClose={handleClosePanel}
            />
          )}
        </div>

        {/* Quoi ? */}
        <div className="relative">
          <IconButton
            label={renderWhatLabel()}
            icon={<KeyIcon className="w-5 h-5" />}
            isActive={activeFilter === 'what'}
            onClick={() => handleClick('what')}
          />
          {activeFilter === 'what' && (
            <FilterWhatPanel
              value={value}
              onChange={onWhatChange}
              onClose={handleClosePanel}
            />
          )}
        </div>
      </div>
      {/* Plus de feedback ici */}
    </div>
  )
}
