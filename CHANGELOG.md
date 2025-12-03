# Smart Lamé Parameters - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

---

## Future Releases

### [1.1.0] - Planned
- Least-squares solver for overdetermined systems
- Material database with common material presets
- Improved error messages with suggestions
- Dark mode support
- Keyboard shortcuts
- Internationalization (i18n) support

### [1.2.0] - Planned
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
- API for programmatic access
