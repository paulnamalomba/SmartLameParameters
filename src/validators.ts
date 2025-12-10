/**
 * validators.ts
 * Input validation and physical bounds checking for material parameters.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

export interface ValidationError {
  field: string
  message: string
  suggestion?: string
}

/**
 * Validate Poisson's ratio.
 * For stable isotropic materials: -1 < ν < 0.5
 * Most common materials: 0 < ν < 0.5
 */
export function validatePoissonsRatio(nu: number): ValidationError | null {
  if (isNaN(nu) || !isFinite(nu)) {
    return {
      field: 'nu',
      message: 'Poisson\'s ratio must be a finite number',
    }
  }

  if (nu <= -1 || nu >= 0.5) {
    return {
      field: 'nu',
      message: 'Poisson\'s ratio must be between -1 and 0.5 for stable isotropic materials',
      suggestion: 'Common materials have 0 < ν < 0.5. Steel ≈ 0.3, Rubber ≈ 0.48',
    }
  }

  if (nu < 0) {
    return {
      field: 'nu',
      message: 'Warning: Negative Poisson\'s ratio (auxetic material)',
      suggestion: 'Rare but valid for certain engineered materials',
    }
  }

  return null
}

/**
 * Validate shear modulus (μ or G).
 * Must be positive for stable materials.
 */
export function validateShearModulus(mu: number): ValidationError | null {
  if (isNaN(mu) || !isFinite(mu)) {
    return {
      field: 'mu',
      message: 'Shear modulus must be a finite number',
    }
  }

  if (mu <= 0) {
    return {
      field: 'mu',
      message: 'Shear modulus must be positive',
      suggestion: 'Typical range: 1 GPa (polymers) to 100 GPa (metals)',
    }
  }

  return null
}

/**
 * Validate bulk modulus.
 * Must be positive for stable materials.
 */
export function validateBulkModulus(K: number): ValidationError | null {
  if (isNaN(K) || !isFinite(K)) {
    return {
      field: 'K',
      message: 'Bulk modulus must be a finite number',
    }
  }

  if (K <= 0) {
    return {
      field: 'K',
      message: 'Bulk modulus must be positive',
      suggestion: 'Typical range: 1 GPa to 400 GPa',
    }
  }

  return null
}

/**
 * Validate Young's modulus.
 * Must be positive for stable materials.
 */
export function validateYoungsModulus(E: number): ValidationError | null {
  if (isNaN(E) || !isFinite(E)) {
    return {
      field: 'E',
      message: 'Young\'s modulus must be a finite number',
    }
  }

  if (E <= 0) {
    return {
      field: 'E',
      message: 'Young\'s modulus must be positive',
      suggestion: 'Typical range: 0.01 GPa (rubber) to 1000 GPa (diamond)',
    }
  }

  return null
}

/**
 * Validate Lamé's first parameter.
 * Can be negative for some materials (ν < 0), but this is rare.
 */
export function validateLameParameter(lambda: number): ValidationError | null {
  if (isNaN(lambda) || !isFinite(lambda)) {
    return {
      field: 'lambda',
      message: 'Lamé parameter λ must be a finite number',
    }
  }

  if (lambda < 0) {
    return {
      field: 'lambda',
      message: 'Warning: Negative λ corresponds to negative Poisson\'s ratio',
      suggestion: 'Valid but uncommon (auxetic materials)',
    }
  }

  return null
}

/**
 * Validate density.
 * Must be positive.
 */
export function validateDensity(rho: number): ValidationError | null {
  if (isNaN(rho) || !isFinite(rho)) {
    return {
      field: 'rho',
      message: 'Density must be a finite number',
    }
  }

  if (rho <= 0) {
    return {
      field: 'rho',
      message: 'Density must be positive',
      suggestion: 'Typical range: 100 kg/m³ (foam) to 20000 kg/m³ (heavy metals)',
    }
  }

  return null
}

/**
 * Validate a numeric input string.
 * Returns parsed number or null if invalid.
 */
export function parseNumericInput(value: string): number | null {
  if (!value || value.trim() === '') return null

  const parsed = parseFloat(value)
  if (isNaN(parsed) || !isFinite(parsed)) return null

  return parsed
}

/**
 * Validate all provided parameters and return array of errors.
 */
export function validateAllParameters(params: {
  lambda?: number
  mu?: number
  E?: number
  K?: number
  nu?: number
  rho?: number
}): ValidationError[] {
  const errors: ValidationError[] = []

  if (params.lambda !== undefined) {
    const error = validateLameParameter(params.lambda)
    if (error) errors.push(error)
  }

  if (params.mu !== undefined) {
    const error = validateShearModulus(params.mu)
    if (error) errors.push(error)
  }

  if (params.E !== undefined) {
    const error = validateYoungsModulus(params.E)
    if (error) errors.push(error)
  }

  if (params.K !== undefined) {
    const error = validateBulkModulus(params.K)
    if (error) errors.push(error)
  }

  if (params.nu !== undefined) {
    const error = validatePoissonsRatio(params.nu)
    if (error) errors.push(error)
  }

  if (params.rho !== undefined) {
    const error = validateDensity(params.rho)
    if (error) errors.push(error)
  }

  return errors
}

/**
 * Check if two values are approximately equal within a tolerance.
 */
export function approximatelyEqual(
  a: number,
  b: number,
  relativeTolerance = 1e-6,
  absoluteTolerance = 1e-12
): boolean {
  if (a === b) return true

  const diff = Math.abs(a - b)
  if (diff < absoluteTolerance) return true

  const avg = (Math.abs(a) + Math.abs(b)) / 2
  return diff / avg < relativeTolerance
}

/**
 * Format validation errors for display.
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return ''

  return errors
    .map((err) => {
      let msg = `${err.field}: ${err.message}`
      if (err.suggestion) {
        msg += `\n  → ${err.suggestion}`
      }
      return msg
    })
    .join('\n\n')
}
