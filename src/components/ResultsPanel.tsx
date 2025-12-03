/**
 * ResultsPanel.tsx
 * Display computed results.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import { ParameterState } from '../types'

interface ResultsPanelProps {
  parameters: ParameterState
  precision: number
}

export function ResultsPanel({ parameters, precision }: ResultsPanelProps) {
  const formatValue = (value: number | null, key: string): string => {
    if (value === null || value === undefined || !isFinite(value)) return '—'
    if (key === 'nu') {
      return value.toPrecision(precision)
    }
    return value.toExponential(precision)
  }

  const labels: Record<keyof ParameterState, string> = {
    lambda: 'λ (Lamé)',
    mu: 'μ (Shear)',
    E: "E (Young's)",
    K: 'K (Bulk)',
    nu: 'ν (Poisson)',
    rho: 'ρ (Density)',
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Computed Results</h2>
      <div className="space-y-3">
        {(Object.keys(parameters) as (keyof ParameterState)[]).map((key) => {
          const param = parameters[key]
          const displayUnit = key === 'nu' ? '' : key === 'rho' ? 'kg/m³' : param.unit
          return (
            <div key={key} className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">{labels[key]}</span>
              <span className="text-gray-900 font-mono">
                {formatValue(param.value, key)}{' '}
                {displayUnit && <span className="text-gray-500 text-sm">{displayUnit}</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
