/**
 * DerivationTrace.tsx
 * Show which formulas were used in calculation.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

interface DerivationTraceProps {
  derivations: string[]
}

export function DerivationTrace({ derivations }: DerivationTraceProps) {
  if (derivations.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Derivation Trace</h2>
        <p className="text-gray-500 italic">
          Enter at least 2 independent parameters to see calculations.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Derivation Trace</h2>
      <div className="space-y-2">
        {derivations.map((formula, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">{index + 1}.</span>
            <code className="text-sm font-mono text-gray-800 bg-white px-2 py-1 rounded">
              {formula}
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}
