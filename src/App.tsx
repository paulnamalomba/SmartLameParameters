/**
 * App.tsx
 * Main application component.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import { useMaterialCalculator } from './useMaterialCalculator'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { InputField } from './components/InputField'
import { ResultsPanel } from './components/ResultsPanel'
import { DerivationTrace } from './components/DerivationTrace'
import { ValidationPanel } from './components/ValidationPanel'
import { ParameterKey, Unit } from './types'

const parameterInfo: Record<
  ParameterKey,
  { label: string; tooltip: string; unitOptions?: Unit[] }
> = {
  lambda: {
    label: 'λ (Lamé Parameter)',
    tooltip:
      "Lamé's first parameter. Related to material resistance to volumetric deformation. Can be negative for auxetic materials (ν < 0).",
    unitOptions: ['Pa', 'kPa', 'MPa', 'GPa'],
  },
  mu: {
    label: 'μ (Shear Modulus)',
    tooltip:
      'Shear modulus (also called G). Resistance to shear deformation. Must be positive. Typical: 1-100 GPa for common materials.',
    unitOptions: ['Pa', 'kPa', 'MPa', 'GPa'],
  },
  E: {
    label: "E (Young's Modulus)",
    tooltip:
      "Young's modulus. Resistance to uniaxial tension/compression. Must be positive. Typical: 0.01 GPa (rubber) to 1000 GPa (diamond).",
    unitOptions: ['Pa', 'kPa', 'MPa', 'GPa'],
  },
  K: {
    label: 'K (Bulk Modulus)',
    tooltip:
      'Bulk modulus. Resistance to uniform compression. Must be positive. Typical: 1-400 GPa.',
    unitOptions: ['Pa', 'kPa', 'MPa', 'GPa'],
  },
  nu: {
    label: 'ν (Poisson Ratio)',
    tooltip:
      "Poisson's ratio. Ratio of transverse to axial strain. Must be between -1 and 0.5 for stable materials. Common: 0-0.5. Steel ≈ 0.3, Rubber ≈ 0.48.",
    unitOptions: [],
  },
  rho: {
    label: 'ρ (Density)',
    tooltip:
      'Material density in kg/m³. Optional parameter, not used in elastic calculations. Typical: 100 (foam) to 20000 (heavy metals).',
    unitOptions: [],
  },
}

function App() {
  const {
    state,
    updateParameter,
    toggleLock,
    changeUnit,
    setPrecision,
    clearAll,
    exportJSON,
    exportCSV,
    generatePermalink,
  } = useMaterialCalculator()

  const handleExportJSON = () => {
    const json = exportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'material-parameters.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const csv = exportCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'material-parameters.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyPermalink = async () => {
    const link = generatePermalink()
    try {
      await navigator.clipboard.writeText(link)
      alert('Permalink copied to clipboard!')
    } catch (err) {
      prompt('Copy this link:', link)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Input Parameters</h2>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
                  aria-label="Clear all inputs"
                >
                  Clear All
                </button>
              </div>

              {(Object.keys(parameterInfo) as ParameterKey[]).map((key) => (
                <InputField
                  key={key}
                  paramKey={key}
                  label={parameterInfo[key].label}
                  tooltip={parameterInfo[key].tooltip}
                  value={state[key].value}
                  unit={state[key].unit}
                  locked={state[key].locked}
                  userProvided={state[key].userProvided}
                  unitOptions={parameterInfo[key].unitOptions}
                  onValueChange={(value) => updateParameter(key, value)}
                  onUnitChange={(unit) => changeUnit(key, unit)}
                  onLockToggle={() => toggleLock(key)}
                />
              ))}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <label htmlFor="precision" className="block font-medium text-gray-700 mb-2">
                  Display Precision (significant digits)
                </label>
                <input
                  id="precision"
                  type="range"
                  min="3"
                  max="15"
                  value={state.precision}
                  onChange={(e) => setPrecision(parseInt(e.target.value))}
                  className="w-full"
                  aria-label="Set precision for displayed values"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>3</span>
                  <span className="font-medium">{state.precision}</span>
                  <span>15</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Export & Share</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors shadow-sm"
                >
                  Download JSON
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors shadow-sm"
                >
                  Download CSV
                </button>
                <button
                  onClick={handleCopyPermalink}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
                >
                  Copy Permalink
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            <ResultsPanel parameters={state} precision={state.precision} />
            <DerivationTrace derivations={state.derivations} />
            <ValidationPanel errors={state.errors} warnings={state.warnings} />
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Tool</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              This tool computes all isotropic linear elastic material parameters from any two
              independent inputs. It uses standard relationships from continuum mechanics.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Real-time calculation:</strong> Enter any 2 parameters and see all others
                computed instantly
              </li>
              <li>
                <strong>Unit conversion:</strong> Toggle between Pa and GPa for moduli
              </li>
              <li>
                <strong>Locking:</strong> Lock parameters to prevent recalculation
              </li>
              <li>
                <strong>Consistency checking:</strong> Detects contradictory inputs
              </li>
              <li>
                <strong>Export:</strong> Download results as JSON/CSV or share via permalink
              </li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Usage Tips</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Enter values for at least 2 elastic parameters (λ, μ, E, K, or ν)</li>
              <li>
                Hover over the ℹ️ icon next to each parameter for physical meaning and typical
                ranges
              </li>
              <li>Use the lock 🔒 to fix a parameter value during recalculation</li>
              <li>Adjust precision slider to show more or fewer significant digits</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
