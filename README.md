# Smart Lamé Parameters Calculator

**Last updated**: December 04, 2025<br>
**Author**: [Paul Namalomba](https://github.com/paulnamalomba)<br>
  - SESKA Computational Engineer<br>
  - Software Developer<br>
  - PhD Candidate (Civil Engineering Spec. Computational and Applied Mechanics)<br>
**Version**: 1.0.2 (Dec 2025)<br>
**Contact**: [kabwenzenamalomba@gmail.com](kabwenzenamalomba@gmail.com)

[![CI/CD Pipeline](https://github.com/paulnamalomba/SmartLameParameters/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/paulnamalomba/SmartLameParameters/actions)
[![Coverage Status](https://coveralls.io/repos/github/paulnamalomba/SmartLameParameters/badge.svg?branch=main)](https://coveralls.io/github/paulnamalomba/SmartLameParameters?branch=main)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-brightgreen.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready React (TypeScript, React, Vite and Tailwind CSS) web application that **smartly cross-calculates linear isotropic material parameters** from any two independent inputs. Deployed at [www.smartlameparameters.space](https://www.smartlameparameters.space).

---

## Features

- [x] **Real-time calculation** from any 2 independent elastic parameters (λ, μ, E, K, ν)
- [x] **Unit conversion** between Pa, kPa, MPa, and GPa
- [x] **Parameter locking** to fix values during recalculation
- [x] **Consistency checking** for contradictory inputs
- [x] **Derivation trace** showing which formulas were used
- [x] **Export** results as JSON or CSV
- [x] **Permalink generation** for sharing calculations
- [x] **Fully accessible** with ARIA attributes and keyboard navigation
- [x] **Responsive design** with Tailwind CSS
- [x] **100% TypeScript** with comprehensive type safety
- [x] **80%+ test coverage** with Jest and React Testing Library
- [x] **CI/CD pipeline** with GitHub Actions
- [x] **Multiple deployment options**: Netlify, Vercel

---

## Mathematical Background

This tool implements standard relationships from **linear isotropic elasticity theory**. For an isotropic material, only **2 independent elastic constants** are needed to determine all others.

### Core Parameters

- **λ (lambda)**: Lamé's first parameter
- **μ (mu) or G**: Shear modulus
- **E**: Young's modulus
- **K**: Bulk modulus
- **ν (nu)**: Poisson's ratio
- **ρ (rho)**: Density (optional, not involved in elastic calculations)

### Key Relationships

The following formulas are implemented in `src/calculations.ts`:

#### From λ and μ:

$$
E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}
$$

$$
\nu = \frac{\lambda}{2(\lambda + \mu)}
$$

$$
K = \lambda + \frac{2}{3}\mu
$$

#### From E and ν:

$$
\mu = \frac{E}{2(1 + \nu)}
$$

$$
\lambda = \frac{E\nu}{(1 + \nu)(1 - 2\nu)}
$$

$$
K = \frac{E}{3(1 - 2\nu)}
$$

#### From μ and ν:

$$
E = 2\mu(1 + \nu)
$$

$$
\lambda = \frac{2\mu\nu}{1 - 2\nu}
$$

$$
K = \frac{2\mu(1 + \nu)}{3(1 - 2\nu)}
$$

#### From K and ν:

$$
E = 3K(1 - 2\nu)
$$

$$
\mu = \frac{3K(1 - 2\nu)}{2(1 + \nu)}
$$

$$
\lambda = \frac{3K\nu}{1 + \nu}
$$

#### From K and μ:

$$
E = \frac{9K\mu}{3K + \mu}
$$

$$
\nu = \frac{3K - 2\mu}{6K + 2\mu}
$$

$$
\lambda = K - \frac{2}{3}\mu
$$

#### From E and μ:

$$
\nu = \frac{E}{2\mu} - 1
$$

$$
K = \frac{E\mu}{3(3\mu - E)}
$$

$$
\lambda = \frac{\mu(E - 2\mu)}{3\mu - E}
$$

#### From E and K:

$$
\mu = \frac{3KE}{9K - E}
$$

$$
\nu = \frac{3K - E}{6K}
$$

$$
\lambda = \frac{3K(3K - E)}{9K - E}
$$

### Physical Constraints

For stable isotropic materials:
- **μ > 0** (shear modulus must be positive)
- **K > 0** (bulk modulus must be positive)
- **E > 0** (Young's modulus must be positive)
- **-1 < ν < 0.5** (Poisson's ratio bounds)
- Most common materials: **0 < ν < 0.5**
- Auxetic materials (rare): **ν < 0**
- Incompressible materials: **ν → 0.5**, **K → ∞**

---

## Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/paulnamalomba/SmartLameParameters.git
cd SmartLameParameters

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Type-check without building
npm run type-check
```

---

## Project Structure

```
SmartLameParameters/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── Header.tsx             # App header
│   │   ├── Footer.tsx             # App footer
│   │   ├── InputField.tsx         # Reusable input with unit selector & lock
│   │   ├── ResultsPanel.tsx       # Display computed results
│   │   ├── DerivationTrace.tsx    # Show formulas used
│   │   └── ValidationPanel.tsx    # Display errors/warnings
│   ├── calculations.ts            # Pure calculation functions
│   ├── calculations.test.ts       # Calculation unit tests
│   ├── validators.ts              # Input validation & bounds checking
│   ├── validators.test.ts         # Validator unit tests
│   ├── useMaterialCalculator.ts   # Custom React hook for state management
│   ├── types.ts                   # TypeScript type definitions
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles (Tailwind)
│   ├── setupTests.ts              # Jest setup
│   └── vite-env.d.ts              # Vite type declarations
├── index.html                     # HTML template
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── jest.config.js                 # Jest configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── netlify.toml                   # Netlify deployment config
├── vercel.json                    # Vercel deployment config
├── LICENSE                        # MIT License
└── README.md                      # This file
```

---

## API Documentation

The core calculation functions in `src/calculations.ts` are **pure functions** that can be reused in other projects (Node.js, Python via WASM, etc.).

### Main Functions

#### `calculateAllParameters(input: MaterialParameters): CalculationResult`

Computes all material parameters from any two independent inputs.

**Input:**
```typescript
interface MaterialParameters {
  lambda?: number  // Lamé's first parameter (Pa)
  mu?: number      // Shear modulus (Pa), also called G
  E?: number       // Young's modulus (Pa)
  K?: number       // Bulk modulus (Pa)
  nu?: number      // Poisson's ratio (dimensionless)
  rho?: number     // Density (kg/m³) - optional
}
```

**Output:**
```typescript
interface CalculationResult {
  parameters: MaterialParameters  // All computed parameters
  derivations: string[]            // Formulas used
  warnings: string[]               // Any warnings
}
```

**Example:**
```typescript
import { calculateAllParameters } from './calculations'

const result = calculateAllParameters({ E: 210e9, nu: 0.3 })
console.log(result.parameters.mu)  // 80769230769.23077
console.log(result.derivations)    // ['μ = E / (2(1 + ν))', ...]
```

#### `checkConsistency(params: MaterialParameters, tolerance?: number): string[]`

Checks if provided parameters are mathematically consistent.

**Example:**
```typescript
import { checkConsistency } from './calculations'

const inconsistencies = checkConsistency({
  lambda: 1e9,
  mu: 1e9,
  E: 10e9  // Wrong!
})
console.log(inconsistencies)  // ['E inconsistent with λ and μ: ...']
```

### Individual Calculation Functions

All pairwise combinations are implemented:

```typescript
// From lambda and mu
calculateE_from_lambda_mu(lambda: number, mu: number): number
calculateNu_from_lambda_mu(lambda: number, mu: number): number
calculateK_from_lambda_mu(lambda: number, mu: number): number

// From E and nu
calculateMu_from_E_nu(E: number, nu: number): number
calculateLambda_from_E_nu(E: number, nu: number): number
calculateK_from_E_nu(E: number, nu: number): number

// ... and 15+ more combinations
```

See `src/calculations.ts` for the complete API.

---

## Deployment

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure custom domain:**
   - In Netlify dashboard, go to Domain settings
   - Add custom domain: `www.smartlameparameters.space`
   - Configure DNS records as instructed

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure custom domain:**
   - In Vercel dashboard, add domain `www.smartlameparameters.space`
   - Update DNS records

### Deploy to AWS S3 + CloudFront

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync dist/ s3://www.smartlameparameters.space --delete
   ```

3. **Configure CloudFront:**
   - Create CloudFront distribution pointing to S3 bucket
   - Set default root object to `index.html`
   - Configure custom error responses for SPA routing
   - Add custom domain and SSL certificate

4. **Update DNS:**
   - Point `www.smartlameparameters.space` to CloudFront distribution

---

## Testing

### Unit Tests

Comprehensive unit tests cover:
- ✅ All pairwise input combinations (λ+μ, E+ν, E+K, μ+ν, K+ν, K+μ, etc.)
- ✅ Edge cases (ν near 0.5, negative ν, zero moduli)
- ✅ Consistency conflict detection
- ✅ Input validation and bounds checking
- ✅ Real material examples (steel, aluminum, rubber)

Run tests:
```bash
npm test
```

View coverage:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

### Example Test

```typescript
test('Steel: E=210GPa, nu=0.3', () => {
  const result = calculateAllParameters({ E: 210e9, nu: 0.3 })
  expect(result.parameters.mu).toBeCloseTo(80.769e9, -7)
  expect(result.parameters.lambda).toBeCloseTo(121.154e9, -7)
  expect(result.warnings.length).toBe(0)
})
```

---

## Usage Examples

### Story A: Enter λ and ν

**Input:**
- λ = 1e9 Pa (1 GPa)
- ν = 0.3

**Expected Output:**
- μ ≈ 1.154e9 Pa
- E ≈ 3.000e9 Pa
- K ≈ 1.769e9 Pa

### Story B: Enter E and ν

**Input:**
- E = 210 GPa
- ν = 0.3

**Expected Output:**
- λ ≈ 121.154 GPa
- μ ≈ 80.769 GPa
- K ≈ 175 GPa

### Story C: Inconsistent Inputs

**Input:**
- λ = 1e9 Pa
- μ = 1e9 Pa
- ν = 0.45 (inconsistent!)

**Expected Output:**
- Error: "ν inconsistent with λ and μ: expected 0.25, got 0.45"
- Suggestion to use least-squares resolution (future feature)

---

## Development Notes

### Numerical Stability

- All calculations use **double precision** (Float64)
- Division-by-zero guards with tolerance `ε = 1e-12`
- Relative error tolerance for consistency checks: `1e-6`

### Algebraic Inversion Strategy

For each pair of inputs, we:
1. Use **direct algebraic formulas** when available
2. Solve **quadratic equations** when necessary (e.g., λ + E → μ)
3. Check for **negative discriminants** and **singular denominators**
4. Return errors with actionable messages

### Future Enhancements

- [ ] Least-squares solver for overdetermined systems
- [ ] Support for anisotropic materials
- [ ] Wave velocity calculations (P-wave, S-wave)
- [ ] Material database with presets
- [ ] 3D visualization of stress-strain relationships
- [ ] Export to PDF with derivations

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

```
MIT License

Copyright (c) 2025 Paul Namalomba

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Paul Namalomba**
- GitHub: [@paulnamalomba](https://github.com/paulnamalomba)
- Website: [www.smartlameparameters.space](https://www.smartlameparameters.space)

---

## Acknowledgments

- Mathematical formulas based on standard continuum mechanics references
- Built with React, TypeScript, Vite, and Tailwind CSS
- Testing with Jest and React Testing Library
- CI/CD with GitHub Actions
- Hosted on Netlify/Vercel

---

## Deployment Checklist

- ✅ `npm run build` produces static site in `dist/`
- ✅ All unit tests pass (`npm test`)
- ✅ CI/CD pipeline configured (`.github/workflows/ci.yml`)
- ✅ Netlify configuration (`netlify.toml`)
- ✅ Vercel configuration (`vercel.json`)
- ✅ Custom domain instructions provided
- ✅ README with complete documentation
- ✅ LICENSE file (MIT)
- ✅ TypeScript strict mode enabled
- ✅ ESLint and Prettier configured
- ✅ 80%+ test coverage achieved
- ✅ Accessibility features (ARIA, keyboard navigation)
- ✅ Responsive design (mobile-first)
- ✅ Export functionality (JSON, CSV, permalink)

---

**Ready for production deployment at www.smartlameparameters.space! 🚀**
