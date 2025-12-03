/**
 * Header.tsx
 * Application header component.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

export function Header() {
  return (
    <header className="bg-primary-700 text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Smart Lamé Parameters</h1>
        <p className="text-primary-100 text-lg">
          Cross-calculate linear isotropic material parameters from any two independent inputs
        </p>
        <p className="text-primary-200 text-sm mt-2">
          by{' '}
          <a
            href="https://github.com/paulnamalomba"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Paul Namalomba
          </a>
        </p>
      </div>
    </header>
  )
}
