/**
 * ValidationPanel.tsx
 * Show errors and warnings.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

// Initialize the Validation Panel Prop as an interfaces
interface ValidationPanelProps {
  errors: string[]
  warnings: string[]
}

// This TypeScript React component displays validation errors and warnings in a structured panel.
export function ValidationPanel({ errors, warnings }: ValidationPanelProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return (
      <div className="bg-green-50 p-3 sm:p-4 rounded-lg shadow-md border border-green-200">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-green-600 text-base sm:text-xl">✓</span>
          <p className="text-green-800 font-medium text-sm sm:text-base">All inputs valid</p>
        </div>
      </div>
    )
  }

  // Junky HTML/JSX code for the Validation Panel (with Tailwind CSS classes)
  return (
    <div className="space-y-2 sm:space-y-3">
      {errors.length > 0 && (
        <div className="bg-red-50 p-3 sm:p-4 rounded-lg shadow-md border border-red-200">
          <h3 className="text-red-800 font-bold mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <span className="text-base sm:text-xl">⚠️</span>
            Errors
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700 text-xs sm:text-sm break-words">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg shadow-md border border-yellow-200">
          <h3 className="text-yellow-800 font-bold mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <span className="text-base sm:text-xl">⚡</span>
            Warnings
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-700 text-xs sm:text-sm break-words">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
