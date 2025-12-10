/**
 * DerivationTrace.tsx
 * Show which formulas were used in calculation.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

// Initialize the Derivation Trace Prop as an interfaces
interface DerivationTraceProps {
  derivations: string[]
}

// This TypeScript React component displays the derivation trace of calculations (i.e. the process of how values were derived).
export function DerivationTrace({ derivations }: DerivationTraceProps) {

  // Handle empty state when no derivations are available
  if (derivations.length === 0) {

    // HTML/JSX code for empty state (no derivations)
    return (

      <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Derivation Trace</h2>
        <p className="text-gray-500 italic text-sm sm:text-base">
          Enter at least 2 independent parameters to see calculations.
        </p>
      </div>

    )

  }

  // Junky HTML/JSX code for the Derivation Trace Panel (with Tailwind CSS classes)
  return (
    
    <div className="bg-blue-50 p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-blue-200">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Derivation Trace</h2>
      <div className="space-y-1.5 sm:space-y-2">
        {derivations.map((formula, index) => (
          <div key={index} className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-primary-600 font-bold text-xs sm:text-sm flex-shrink-0">{index + 1}.</span>
            <code className="text-xs sm:text-sm font-mono text-gray-800 bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded break-all">
              {formula}
            </code>
          </div>
        ))}
      </div>
    </div>

  )

}
