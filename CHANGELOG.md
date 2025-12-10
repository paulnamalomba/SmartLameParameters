# Smart Lamé Parameters - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [Smart Lamé Parameters - Changelog](#smart-lamé-parameters---changelog)
  - [Contents](#contents)
  - [\[1.0.0\] - 2025-12-03](#100---2025-12-03)
    - [Added](#added)
    - [Technical Details](#technical-details)
    - [Documentation](#documentation)
  - [\[1.0.1\] - 2025-12-03](#101---2025-12-03)
    - [Fixed](#fixed)
  - [\[1.0.2\] - 2025-12-03](#102---2025-12-03)
    - [Fixed](#fixed-1)
    - [Added](#added-1)
    - [Improved](#improved)
    - [Documentation](#documentation-1)
    - [Deployment](#deployment)
  - [\[1.0.3\] - 2025-12-10](#103---2025-12-10)
    - [Improved](#improved-1)
  - [Future Releases](#future-releases)
    - [\[1.1.0\] - Planned](#110---planned)

---

## [1.0.0] - 2025-12-03

### Added
- Initial release of Smart Lamé Parameters Calculator
- Real-time calculation of all isotropic elastic parameters from any 2 inputs
- Support for λ, μ, E, K, ν, and ρ parameters
- Unit conversion between Pa and GPa
- Parameter locking mechanism
- Consistency checking for contradictory inputs
- Derivation trace showing formulas used
- Export functionality (JSON, CSV, permalink)
- Comprehensive unit tests (80%+ coverage)
- Full TypeScript implementation
- Accessible UI with ARIA attributes
- Responsive design with Tailwind CSS
- CI/CD pipeline with GitHub Actions
- Deployment configurations for Netlify and Vercel
- Complete documentation with LaTeX formulas
- Real material examples (steel, aluminum, rubber)

### Technical Details
- React 18 with hooks
- TypeScript 5.2 with strict mode
- Vite 5 for build tooling
- Jest + React Testing Library for testing
- Tailwind CSS for styling
- ESLint + Prettier for code quality

### Documentation
- Comprehensive README with mathematical background
- API documentation for reusable calculation functions
- Deployment instructions for multiple platforms
- Usage examples and user stories
- Development guidelines

## [1.0.1] - 2025-12-03

### Fixed
- Bug in unit conversion when switching units with locked parameters
- Bugs with types and names in calculations.ts and useMaterialCalculator.ts causing ESLint errors

## [1.0.2] - 2025-12-03

### Fixed
- **Critical:** Fixed white screen issue on production deployments (Netlify & Vercel)
- **Critical:** Fixed decimal input handling - users can now enter values like 50.2, 0.45, 210.5
- Fixed `TypeError: Cannot read properties of undefined (reading 'toExponential')` in ResultsPanel component
- Fixed input field preventing decimal/fractional value entry during typing
- Added proper null/undefined/non-finite value handling in formatValue function
- Fixed timer type compatibility issue (NodeJS.Timeout → number) for browser environments
- Implemented local state management in InputField to preserve typing intermediate states

### Added
- Error boundary component for graceful error handling in production
- Comprehensive error display with reload functionality
- PWA manifest.json for progressive web app support
- Explicit base path configuration in vite.config.ts
- Support for kPa and MPa units in addition to Pa and GPa

### Improved
- Enhanced production build configuration with optimized rollup options
- Better error visibility and debugging in production environments
- Improved user experience with informative error messages instead of blank screens
- View screen scaling and responsiveness enhancements

### Documentation
- Added FIXES.md with detailed bug fix analysis and resolution steps
- Documented all deployment issues and their solutions
- Added lessons learned and future recommendations

### Deployment
- Successfully deployed to Netlify: https://rainbow-daifuku-6c9b01.netlify.app
- Successfully deployed to Vercel
- All production deployments verified and operational

## [1.0.3] - 2025-12-10

### Improved
- **Mobile Responsiveness:** Optimized layout and typography for mobile devices
- Adjusted padding and margins for better use of screen space on small screens
- Scaled down font sizes for headers and inputs on mobile
- Improved touch targets for buttons and inputs
- Refined grid layouts to stack gracefully on narrower viewports
- Code structure improved to fit readibility and scalability standards. Efficient use of components and hooks

---

## Future Releases

### [1.1.0] - Planned
<!-- - Least-squares solver for overdetermined systems
- Material database with common material presets
- Improved error messages with suggestions -->
- Dark mode support
- Keyboard shortcuts
- Internationalization (i18n) support

<!-- ### [1.2.0] - Planned
- Wave velocity calculations (P-wave, S-wave)
- 3D visualization of stress-strain relationships
- Export to PDF with full derivations
- History/undo functionality
- Comparison mode for multiple materials

### [2.0.0] - Future
- Support for anisotropic materials
- Temperature-dependent properties
- Plasticity and viscoelasticity models
- Integration with FEA software
- API for programmatic access -->
