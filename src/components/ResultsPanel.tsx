/**
 * ResultsPanel.tsx
 * Display computed results.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 * /
// Import stuff (mostly functions and types)
import { ParameterState } from '../types'

// Initialise the Panel Prop as an interfaces
interface ResultsPanelProps {
  parameters: ParameterState
  precision: number
}

// This TypeScript React component displays the computed material parameters in a structured results panel.
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

  // Junky HTML/JSX code for the Results Panel (with Tailwind CSS classes)
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Computed Results</h2>
      <div className="space-y-2 sm:space-y-3">
        {(Object.keys(parameters) as (keyof ParameterState)[]).map((key) => {
          const param = parameters[key]
          const displayUnit = key === 'nu' ? '' : key === 'rho' ? 'kg/m³' : param.unit
          return (
            <div key={key} className="flex justify-between items-center pb-2 border-b border-gray-100 gap-2">
              <span className="font-medium text-gray-700 text-sm sm:text-base">{labels[key]}</span>
              <span className="text-gray-900 font-mono text-xs sm:text-sm break-all">
                {formatValue(param.value, key)}{' '}
                {displayUnit && <span className="text-gray-500 text-xs sm:text-sm">{displayUnit}</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
