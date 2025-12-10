/**
 * Header.tsx
 * Application header component.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

// This is the page header component for the Smart Lamé Parameters application.
export function Header() {

  // Junky HTML/JSX code for the Header (with Tailwind CSS classes)
  return (

    <header className="bg-primary-700 text-white py-4 sm:py-6 px-3 sm:px-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Smart Lamé Parameters</h1>
        <p className="text-primary-100 text-sm sm:text-base md:text-lg">
          Cross-calculate linear isotropic material parameters from any two independent inputs
        </p>
        <p className="text-primary-200 text-sm mt-2">
          by{' '}
          <a
            href="https://paulnamalomba.github.io"
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
