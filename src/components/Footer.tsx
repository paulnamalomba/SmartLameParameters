/**
 * Footer.tsx
 * Application footer component.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

// This is the page footer component for the Smart Lamé Parameters application.
export function Footer() {

  // Junky HTML/JSX code for the Footer (with Tailwind CSS classes)
  return (

    <footer className="bg-gray-100 py-6 px-4 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
        <p>
          © 2025 Paul Namalomba. Released under{' '}
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            MIT License
          </a>
          .
        </p>
        <p className="mt-2">
          Source code available on{' '}
          <a
            href="https://github.com/paulnamalomba/SmartLameParameters"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
    
  )

}
