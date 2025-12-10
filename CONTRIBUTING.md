# Contributing to Smart Lamé Parameters

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Contents

- [Contributing to Smart Lamé Parameters](#contributing-to-smart-lamé-parameters)
  - [Contents](#contents)
  - [Code of Conduct](#code-of-conduct)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Pull Requests](#pull-requests)
    - [Code Style](#code-style)
    - [Testing](#testing)
    - [Documentation](#documentation)
  - [Development Setup](#development-setup)
  - [Project Structure](#project-structure)
  - [Questions?](#questions)

---

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:
- Clear description of the feature
- Use case and motivation
- Example implementation (if applicable)
- Any potential drawbacks

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**:
   - Follow existing code style
   - Add tests for new features
   - Update documentation
4. **Run tests**: `npm test`
5. **Run linter**: `npm run lint`
6. **Commit with clear messages**:
   ```
   feat: Add wave velocity calculations
   fix: Correct Poisson ratio validation
   docs: Update README with new examples
   ```
7. **Push to your fork** and submit a pull request

### Code Style

- Use TypeScript with strict mode
- Follow ESLint rules (`.eslintrc.cjs`)
- Format with Prettier (`.prettierrc`)
- Write descriptive variable names
- Add JSDoc comments for exported functions
- Keep functions pure when possible

### Testing

- Write unit tests for all new features
- Aim for 80%+ coverage
- Test edge cases and error conditions
- Use descriptive test names

Example:
```typescript
test('calculates E from lambda and mu for steel-like values', () => {
  const result = calculateE_from_lambda_mu(121e9, 80e9)
  expect(result).toBeCloseTo(209e9, -7)
})
```

### Documentation

- Update README.md for significant changes
- Add JSDoc comments to new functions
- Include examples in documentation
- Update CHANGELOG.md

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/SmartLameParameters.git
cd SmartLameParameters

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build
npm run build
```

## Project Structure

- `src/calculations.ts` - Pure calculation functions
- `src/validators.ts` - Input validation
- `src/useMaterialCalculator.ts` - React hook
- `src/components/` - UI components
- `src/*.test.ts` - Unit tests

## Questions?

Feel free to open an issue with your question or reach out to [@paulnamalomba](https://github.com/paulnamalomba).

Thank you for contributing! 🙏
