/**
 * InputField.tsx
 * Reusable input field component with unit selector and lock.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import { useState, useEffect } from 'react'
import { ParameterKey, Unit } from '../types'

interface InputFieldProps {
  label: string
  paramKey: ParameterKey
  value: number | null
  unit: Unit
  locked: boolean
  userProvided: boolean
  tooltip: string
  unitOptions?: Unit[]
  onValueChange: (value: number | null) => void
  onUnitChange: (unit: Unit) => void
  onLockToggle: () => void
}

export function InputField({
  label,
  paramKey,
  value,
  unit,
  locked,
  userProvided,
  tooltip,
  unitOptions = ['Pa', 'GPa'],
  onValueChange,
  onUnitChange,
  onLockToggle,
}: InputFieldProps) {
  // Use local state to preserve input text while typing (allows decimals like "50." or "0.4")
  const [inputText, setInputText] = useState<string>('')
  
  // Sync local state when external value changes (from calculations or unit conversion)
  useEffect(() => {
    if (value === null) {
      setInputText('')
    } else {
      // Only update if not currently focused (user is typing)
      const activeElement = document.activeElement
      const inputId = `input-${paramKey}`
      if (activeElement?.id !== inputId) {
        setInputText(String(value))
      }
    }
  }, [value, paramKey])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputText(val)
    
    if (val.trim() === '') {
      onValueChange(null)
      return
    }
    
    const parsed = parseFloat(val)
    if (!isNaN(parsed) && isFinite(parsed)) {
      onValueChange(parsed)
    }
  }
  
  const handleBlur = () => {
    // On blur, clean up the display if needed
    if (value !== null) {
      setInputText(String(value))
    }
  }

  const inputId = `input-${paramKey}`
  const isDisabled = locked && !userProvided
  const hasNoUnit = paramKey === 'nu' || paramKey === 'rho'

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={inputId} className="font-medium text-gray-700 flex items-center gap-2">
          {label}
          <button
            type="button"
            title={tooltip}
            className="text-primary-500 hover:text-primary-700 text-xs cursor-help"
            aria-label={`Help for ${label}`}
          >
            ℹ️
          </button>
        </label>
        <button
          type="button"
          onClick={onLockToggle}
          className={`text-lg transition-colors ${
            locked ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'
          }`}
          title={locked ? 'Unlock parameter' : 'Lock parameter'}
          aria-label={locked ? `Unlock ${label}` : `Lock ${label}`}
        >
          {locked ? '🔒' : '🔓'}
        </button>
      </div>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            isDisabled
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : userProvided
                ? 'border-primary-300 bg-white'
                : 'border-gray-300 bg-gray-50'
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
          aria-describedby={`${inputId}-unit`}
        />
        {!hasNoUnit && unitOptions.length > 1 && (
          <select
            id={`${inputId}-unit`}
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as Unit)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`Unit for ${label}`}
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        )}
        {hasNoUnit && paramKey === 'nu' && (
          <span className="px-3 py-2 text-gray-500 text-sm flex items-center">
            (dimensionless)
          </span>
        )}
        {hasNoUnit && paramKey === 'rho' && (
          <span className="px-3 py-2 text-gray-500 text-sm flex items-center">kg/m³</span>
        )}
      </div>
      {userProvided && !locked && (
        <p className="text-xs text-primary-600 mt-1">User provided</p>
      )}
      {locked && <p className="text-xs text-red-600 mt-1">Locked</p>}
    </div>
  )
}
