import React, { useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

interface FilterWhenPanelProps {
  value: string
  onChange: (val: string) => void
  onClose: () => void
}

function formatDate(date: Date | undefined): string {
  return date ? date.toLocaleDateString('fr-FR') : '--/--/----'
}

export function FilterWhenPanel({ value, onChange, onClose }: FilterWhenPanelProps) {
  const [mode, setMode] = useState<'range' | 'single'>('range')
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [range, setRange] = useState<DateRange | undefined>()

  // --- DEBUG LOG à chaque render
  console.log('[FilterWhenPanel RENDER]', { mode, selected, range, value })

  // Sélection de période
  const handleRangeSelect = (rangeValue: DateRange | undefined) => {
  console.log('[handleRangeSelect]', { rangeValue })
  setRange(rangeValue)
  // Vérifie que from ET to sont définis ET différentes
  if (
    rangeValue?.from &&
    rangeValue?.to &&
    rangeValue.from.getTime() !== rangeValue.to.getTime()
  ) {
    console.log('[handleRangeSelect - FERMETURE]', { from: rangeValue.from, to: rangeValue.to })
    onChange(`${formatDate(rangeValue.from)} - ${formatDate(rangeValue.to)}`)
    onClose()
  }
}


  // Sélection simple
  const handleSelect = (date: Date | undefined) => {
    console.log('[handleSelect]', { date })
    setSelected(date)
    if (date) {
      onChange(formatDate(date))
      onClose()
    }
  }

  const startLabel = range?.from ? formatDate(range.from) : 'Sélectionner la date de début'
  const endLabel = range?.to ? formatDate(range.to) : 'Sélectionner la date de fin'

  return (
    <div className="absolute top-full left-0 bg-white border shadow rounded-lg p-4 z-20 w-[450px]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Quand ?</span>
        <button onClick={onClose} className="text-xs text-gray-500">Fermer</button>
      </div>
      <div className="mb-2 flex gap-2">
        <button
          className={`px-2 py-1 rounded ${mode === 'range' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setMode('range')}
        >
          Sélectionner une période
        </button>
        <button
          className={`px-2 py-1 rounded ${mode === 'single' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setMode('single')}
        >
          Date simple
        </button>
      </div>
      {mode === 'range' ? (
        <>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            locale={fr}
            weekStartsOn={1}
            modifiersClassNames={{
              selected: 'bg-green-600 text-white',
              today: 'border border-green-600',
              range_start: 'bg-green-500 text-white',
              range_end: 'bg-green-500 text-white',
              range_middle: 'bg-green-100'
            }}
          />
          <div className="mt-3 flex flex-col gap-1 items-center text-sm">
            <div>
              <span className="font-semibold">Date de début : </span>
              <span className={range?.from ? "text-green-700" : "text-gray-400"}>
                {startLabel}
              </span>
            </div>
            <div>
              <span className="font-semibold">Date de fin : </span>
              <span className={range?.to ? "text-green-700" : "text-gray-400"}>
                {endLabel}
              </span>
            </div>
            {!range?.to && range?.from && (
              <span className="text-xs text-gray-500 mt-2">
                Sélectionnez la date de fin de période.
              </span>
            )}
          </div>
        </>
      ) : (
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          locale={fr}
          weekStartsOn={1}
          modifiersClassNames={{
            selected: 'bg-green-600 text-white',
            today: 'border border-green-600'
          }}
        />
      )}
      <div className="mt-2 text-xs text-gray-400">
        Par défaut : Toute l’année.<br />
        <span className="text-green-700">Astuce : </span>
        En mode période, cliquez deux fois pour définir “du” et “au”.
      </div>
    </div>
  )
}
