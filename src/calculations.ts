/**
 * calculations.ts
 * Pure functions for computing isotropic linear elastic material parameters.
 * All calculations use standard formulas from linear elasticity theory.
 *
 * Core relationships:
 * - E = μ(3λ + 2μ) / (λ + μ)
 * - K = λ + (2/3)μ
 * - ν = λ / (2(λ + μ))
 * - μ = E / (2(1 + ν))
 * - λ = Eν / ((1 + ν)(1 - 2ν))
 * - K = E / (3(1 - 2ν))
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

const EPSILON = 1e-12 // Tolerance for numerical comparisons

export interface MaterialParameters {
  lambda?: number // Lamé's first parameter (Pa)
  mu?: number // Shear modulus (Pa), also called G
  E?: number // Young's modulus (Pa)
  K?: number // Bulk modulus (Pa)
  nu?: number // Poisson's ratio (dimensionless)
  rho?: number // Density (kg/m³) - optional, not involved in elastic calculations
}

export interface CalculationResult {
  parameters: MaterialParameters
  derivations: string[] // Formulas used in calculation
  warnings: string[]
}

/**
 * Calculate Young's modulus from λ and μ.
 * Formula: E = μ(3λ + 2μ) / (λ + μ)
 */
export function calculateE_from_lambda_mu(lambda: number, mu: number): number {
  if (Math.abs(lambda + mu) < EPSILON) {
    throw new Error('Division by zero: λ + μ ≈ 0')
  }
  return (mu * (3 * lambda + 2 * mu)) / (lambda + mu)
}

/**
 * Calculate Poisson's ratio from λ and μ.
 * Formula: ν = λ / (2(λ + μ))
 */
export function calculateNu_from_lambda_mu(lambda: number, mu: number): number {
  if (Math.abs(2 * (lambda + mu)) < EPSILON) {
    throw new Error('Division by zero: 2(λ + μ) ≈ 0')
  }
  return lambda / (2 * (lambda + mu))
}

/**
 * Calculate bulk modulus from λ and μ.
 * Formula: K = λ + (2/3)μ
 */
export function calculateK_from_lambda_mu(lambda: number, mu: number): number {
  return lambda + (2 / 3) * mu
}

/**
 * Calculate shear modulus from E and ν.
 * Formula: μ = E / (2(1 + ν))
 */
export function calculateMu_from_E_nu(E: number, nu: number): number {
  if (Math.abs(2 * (1 + nu)) < EPSILON) {
    throw new Error('Division by zero: 2(1 + ν) ≈ 0')
  }
  return E / (2 * (1 + nu))
}

/**
 * Calculate λ from E and ν.
 * Formula: λ = Eν / ((1 + ν)(1 - 2ν))
 */
export function calculateLambda_from_E_nu(E: number, nu: number): number {
  const denom = (1 + nu) * (1 - 2 * nu)
  if (Math.abs(denom) < EPSILON) {
    throw new Error('Division by zero: (1 + ν)(1 - 2ν) ≈ 0')
  }
  return (E * nu) / denom
}

/**
 * Calculate bulk modulus from E and ν.
 * Formula: K = E / (3(1 - 2ν))
 */
export function calculateK_from_E_nu(E: number, nu: number): number {
  if (Math.abs(3 * (1 - 2 * nu)) < EPSILON) {
    throw new Error('Division by zero: 3(1 - 2ν) ≈ 0')
  }
  return E / (3 * (1 - 2 * nu))
}

/**
 * Calculate Young's modulus from μ and ν.
 * Formula: E = 2μ(1 + ν)
 */
export function calculateE_from_mu_nu(mu: number, nu: number): number {
  return 2 * mu * (1 + nu)
}

/**
 * Calculate λ from μ and ν.
 * Formula: λ = 2μν / (1 - 2ν)
 */
export function calculateLambda_from_mu_nu(mu: number, nu: number): number {
  if (Math.abs(1 - 2 * nu) < EPSILON) {
    throw new Error('Division by zero: 1 - 2ν ≈ 0')
  }
  return (2 * mu * nu) / (1 - 2 * nu)
}

/**
 * Calculate bulk modulus from μ and ν.
 * Formula: K = 2μ(1 + ν) / (3(1 - 2ν))
 */
export function calculateK_from_mu_nu(mu: number, nu: number): number {
  if (Math.abs(3 * (1 - 2 * nu)) < EPSILON) {
    throw new Error('Division by zero: 3(1 - 2ν) ≈ 0')
  }
  return (2 * mu * (1 + nu)) / (3 * (1 - 2 * nu))
}

/**
 * Calculate Young's modulus from K and ν.
 * Formula: E = 3K(1 - 2ν)
 */
export function calculateE_from_K_nu(K: number, nu: number): number {
  return 3 * K * (1 - 2 * nu)
}

/**
 * Calculate μ from K and ν.
 * Formula: μ = 3K(1 - 2ν) / (2(1 + ν))
 */
export function calculateMu_from_K_nu(K: number, nu: number): number {
  if (Math.abs(2 * (1 + nu)) < EPSILON) {
    throw new Error('Division by zero: 2(1 + ν) ≈ 0')
  }
  return (3 * K * (1 - 2 * nu)) / (2 * (1 + nu))
}

/**
 * Calculate λ from K and ν.
 * Formula: λ = 3Kν / (1 + ν)
 */
export function calculateLambda_from_K_nu(K: number, nu: number): number {
  if (Math.abs(1 + nu) < EPSILON) {
    throw new Error('Division by zero: 1 + ν ≈ 0')
  }
  return (3 * K * nu) / (1 + nu)
}

/**
 * Calculate Young's modulus from K and μ.
 * Formula: E = 9Kμ / (3K + μ)
 */
export function calculateE_from_K_mu(K: number, mu: number): number {
  if (Math.abs(3 * K + mu) < EPSILON) {
    throw new Error('Division by zero: 3K + μ ≈ 0')
  }
  return (9 * K * mu) / (3 * K + mu)
}

/**
 * Calculate ν from K and μ.
 * Formula: ν = (3K - 2μ) / (6K + 2μ)
 */
export function calculateNu_from_K_mu(K: number, mu: number): number {
  if (Math.abs(6 * K + 2 * mu) < EPSILON) {
    throw new Error('Division by zero: 6K + 2μ ≈ 0')
  }
  return (3 * K - 2 * mu) / (6 * K + 2 * mu)
}

/**
 * Calculate λ from K and μ.
 * Formula: λ = K - (2/3)μ
 */
export function calculateLambda_from_K_mu(K: number, mu: number): number {
  return K - (2 / 3) * mu
}

/**
 * Calculate ν from E and μ.
 * Formula: ν = E/(2μ) - 1
 */
export function calculateNu_from_E_mu(E: number, mu: number): number {
  if (Math.abs(2 * mu) < EPSILON) {
    throw new Error('Division by zero: 2μ ≈ 0')
  }
  return E / (2 * mu) - 1
}

/**
 * Calculate K from E and μ.
 * Formula: K = Eμ / (3(3μ - E))
 */
export function calculateK_from_E_mu(E: number, mu: number): number {
  if (Math.abs(3 * (3 * mu - E)) < EPSILON) {
    throw new Error('Division by zero: 3(3μ - E) ≈ 0')
  }
  return (E * mu) / (3 * (3 * mu - E))
}

/**
 * Calculate λ from E and μ.
 * Formula: λ = μ(E - 2μ) / (3μ - E)
 */
export function calculateLambda_from_E_mu(E: number, mu: number): number {
  if (Math.abs(3 * mu - E) < EPSILON) {
    throw new Error('Division by zero: 3μ - E ≈ 0')
  }
  return (mu * (E - 2 * mu)) / (3 * mu - E)
}

/**
 * Calculate μ from E and K.
 * Formula: μ = 3KE / (9K - E)
 */
export function calculateMu_from_E_K(E: number, K: number): number {
  if (Math.abs(9 * K - E) < EPSILON) {
    throw new Error('Division by zero: 9K - E ≈ 0')
  }
  return (3 * K * E) / (9 * K - E)
}

/**
 * Calculate ν from E and K.
 * Formula: ν = (3K - E) / (6K)
 */
export function calculateNu_from_E_K(E: number, K: number): number {
  if (Math.abs(6 * K) < EPSILON) {
    throw new Error('Division by zero: 6K ≈ 0')
  }
  return (3 * K - E) / (6 * K)
}

/**
 * Calculate λ from E and K.
 * Formula: λ = 3K(3K - E) / (9K - E)
 */
export function calculateLambda_from_E_K(E: number, K: number): number {
  if (Math.abs(9 * K - E) < EPSILON) {
    throw new Error('Division by zero: 9K - E ≈ 0')
  }
  return (3 * K * (3 * K - E)) / (9 * K - E)
}

/**
 * Calculate E from λ and ν.
 * Formula: E = λ(1 + ν)(1 - 2ν) / ν
 */
export function calculateE_from_lambda_nu(lambda: number, nu: number): number {
  if (Math.abs(nu) < EPSILON) {
    throw new Error('Division by zero: ν ≈ 0')
  }
  return (lambda * (1 + nu) * (1 - 2 * nu)) / nu
}

/**
 * Calculate μ from λ and ν.
 * Formula: μ = λ(1 - 2ν) / (2ν)
 */
export function calculateMu_from_lambda_nu(lambda: number, nu: number): number {
  if (Math.abs(2 * nu) < EPSILON) {
    throw new Error('Division by zero: 2ν ≈ 0')
  }
  return (lambda * (1 - 2 * nu)) / (2 * nu)
}

/**
 * Calculate K from λ and ν.
 * Formula: K = λ(1 + ν) / (3ν)
 */
export function calculateK_from_lambda_nu(lambda: number, nu: number): number {
  if (Math.abs(3 * nu) < EPSILON) {
    throw new Error('Division by zero: 3ν ≈ 0')
  }
  return (lambda * (1 + nu)) / (3 * nu)
}

/**
 * Calculate E from λ and K.
 * Formula: E = 9K(K - λ) / (3K - λ)
 */
export function calculateE_from_lambda_K(lambda: number, K: number): number {
  if (Math.abs(3 * K - lambda) < EPSILON) {
    throw new Error('Division by zero: 3K - λ ≈ 0')
  }
  return (9 * K * (K - lambda)) / (3 * K - lambda)
}

/**
 * Calculate μ from λ and K.
 * Formula: μ = (3/2)(K - λ)
 */
export function calculateMu_from_lambda_K(lambda: number, K: number): number {
  return (3 / 2) * (K - lambda)
}

/**
 * Calculate ν from λ and K.
 * Formula: ν = λ / (3K - λ)
 */
export function calculateNu_from_lambda_K(lambda: number, K: number): number {
  if (Math.abs(3 * K - lambda) < EPSILON) {
    throw new Error('Division by zero: 3K - λ ≈ 0')
  }
  return lambda / (3 * K - lambda)
}

/**
 * Main calculation function that computes all parameters from any two independent inputs.
 * Returns the complete set of material parameters with derivation trace.
 */
export function calculateAllParameters(
  input: MaterialParameters
): CalculationResult {
  const derivations: string[] = []
  const warnings: string[] = []
  const result: MaterialParameters = { ...input }

  // Normalize G to mu
  const inputWithG = input as MaterialParameters & { G?: number }
  if (input.mu === undefined && inputWithG.G !== undefined) {
    result.mu = inputWithG.G
  }

  // Count independent parameters
  const hasLambda = result.lambda !== undefined
  const hasMu = result.mu !== undefined
  const hasE = result.E !== undefined
  const hasK = result.K !== undefined
  const hasNu = result.nu !== undefined

  const count = [hasLambda, hasMu, hasE, hasK, hasNu].filter(Boolean).length

  if (count < 2) {
    warnings.push('Need at least 2 independent elastic parameters')
    return { parameters: result, derivations, warnings }
  }

  try {
    // λ and μ provided
    if (hasLambda && hasMu) {
      if (result.E === undefined) {
        result.E = calculateE_from_lambda_mu(result.lambda!, result.mu!)
        derivations.push('E = μ(3λ + 2μ) / (λ + μ)')
      }
      if (result.nu === undefined) {
        result.nu = calculateNu_from_lambda_mu(result.lambda!, result.mu!)
        derivations.push('ν = λ / (2(λ + μ))')
      }
      if (result.K === undefined) {
        result.K = calculateK_from_lambda_mu(result.lambda!, result.mu!)
        derivations.push('K = λ + (2/3)μ')
      }
    }
    // E and ν provided
    else if (hasE && hasNu) {
      if (result.mu === undefined) {
        result.mu = calculateMu_from_E_nu(result.E!, result.nu!)
        derivations.push('μ = E / (2(1 + ν))')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_E_nu(result.E!, result.nu!)
        derivations.push('λ = Eν / ((1 + ν)(1 - 2ν))')
      }
      if (result.K === undefined) {
        result.K = calculateK_from_E_nu(result.E!, result.nu!)
        derivations.push('K = E / (3(1 - 2ν))')
      }
    }
    // μ and ν provided
    else if (hasMu && hasNu) {
      if (result.E === undefined) {
        result.E = calculateE_from_mu_nu(result.mu!, result.nu!)
        derivations.push('E = 2μ(1 + ν)')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_mu_nu(result.mu!, result.nu!)
        derivations.push('λ = 2μν / (1 - 2ν)')
      }
      if (result.K === undefined) {
        result.K = calculateK_from_mu_nu(result.mu!, result.nu!)
        derivations.push('K = 2μ(1 + ν) / (3(1 - 2ν))')
      }
    }
    // K and ν provided
    else if (hasK && hasNu) {
      if (result.E === undefined) {
        result.E = calculateE_from_K_nu(result.K!, result.nu!)
        derivations.push('E = 3K(1 - 2ν)')
      }
      if (result.mu === undefined) {
        result.mu = calculateMu_from_K_nu(result.K!, result.nu!)
        derivations.push('μ = 3K(1 - 2ν) / (2(1 + ν))')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_K_nu(result.K!, result.nu!)
        derivations.push('λ = 3Kν / (1 + ν)')
      }
    }
    // K and μ provided
    else if (hasK && hasMu) {
      if (result.E === undefined) {
        result.E = calculateE_from_K_mu(result.K!, result.mu!)
        derivations.push('E = 9Kμ / (3K + μ)')
      }
      if (result.nu === undefined) {
        result.nu = calculateNu_from_K_mu(result.K!, result.mu!)
        derivations.push('ν = (3K - 2μ) / (6K + 2μ)')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_K_mu(result.K!, result.mu!)
        derivations.push('λ = K - (2/3)μ')
      }
    }
    // E and μ provided
    else if (hasE && hasMu) {
      if (result.nu === undefined) {
        result.nu = calculateNu_from_E_mu(result.E!, result.mu!)
        derivations.push('ν = E/(2μ) - 1')
      }
      if (result.K === undefined) {
        result.K = calculateK_from_E_mu(result.E!, result.mu!)
        derivations.push('K = Eμ / (3(3μ - E))')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_E_mu(result.E!, result.mu!)
        derivations.push('λ = μ(E - 2μ) / (3μ - E)')
      }
    }
    // E and K provided
    else if (hasE && hasK) {
      if (result.mu === undefined) {
        result.mu = calculateMu_from_E_K(result.E!, result.K!)
        derivations.push('μ = 3KE / (9K - E)')
      }
      if (result.nu === undefined) {
        result.nu = calculateNu_from_E_K(result.E!, result.K!)
        derivations.push('ν = (3K - E) / (6K)')
      }
      if (result.lambda === undefined) {
        result.lambda = calculateLambda_from_E_K(result.E!, result.K!)
        derivations.push('λ = 3K(3K - E) / (9K - E)')
      }
    }
    // λ and ν provided
    else if (hasLambda && hasNu) {
      if (result.E === undefined) {
        result.E = calculateE_from_lambda_nu(result.lambda!, result.nu!)
        derivations.push('E = λ(1 + ν)(1 - 2ν) / ν')
      }
      if (result.mu === undefined) {
        result.mu = calculateMu_from_lambda_nu(result.lambda!, result.nu!)
        derivations.push('μ = λ(1 - 2ν) / (2ν)')
      }
      if (result.K === undefined) {
        result.K = calculateK_from_lambda_nu(result.lambda!, result.nu!)
        derivations.push('K = λ(1 + ν) / (3ν)')
      }
    }
    // λ and K provided
    else if (hasLambda && hasK) {
      if (result.E === undefined) {
        result.E = calculateE_from_lambda_K(result.lambda!, result.K!)
        derivations.push('E = 9K(K - λ) / (3K - λ)')
      }
      if (result.mu === undefined) {
        result.mu = calculateMu_from_lambda_K(result.lambda!, result.K!)
        derivations.push('μ = (3/2)(K - λ)')
      }
      if (result.nu === undefined) {
        result.nu = calculateNu_from_lambda_K(result.lambda!, result.K!)
        derivations.push('ν = λ / (3K - λ)')
      }
    }
    // λ and E provided
    else if (hasLambda && hasE) {
      // Need to solve quadratic: E = μ(3λ + 2μ)/(λ + μ)
      // Rearrange: Eλ + Eμ = 3λμ + 2μ²
      // 2μ² + μ(3λ - E) - Eλ = 0
      const a = 2
      const b = 3 * result.lambda! - result.E!
      const c = -result.E! * result.lambda!
      const discriminant = b * b - 4 * a * c
      if (discriminant < 0) {
        warnings.push('No real solution for μ from λ and E (negative discriminant)')
      } else {
        const mu1 = (-b + Math.sqrt(discriminant)) / (2 * a)
        const mu2 = (-b - Math.sqrt(discriminant)) / (2 * a)
        result.mu = mu1 > 0 ? mu1 : mu2
        derivations.push('μ from quadratic: 2μ² + μ(3λ - E) - Eλ = 0')

        if (result.mu > 0) {
          if (result.nu === undefined) {
            result.nu = calculateNu_from_lambda_mu(result.lambda!, result.mu)
            derivations.push('ν = λ / (2(λ + μ))')
          }
          if (result.K === undefined) {
            result.K = calculateK_from_lambda_mu(result.lambda!, result.mu)
            derivations.push('K = λ + (2/3)μ')
          }
        }
      }
    }
  } catch (error) {
    warnings.push(`Calculation error: ${(error as Error).message}`)
  }

  return { parameters: result, derivations, warnings }
}

/**
 * Check consistency of provided parameters.
 * Returns array of inconsistencies found.
 */
export function checkConsistency(
  params: MaterialParameters,
  tolerance = 1e-6
): string[] {
  const inconsistencies: string[] = []

  if (
    params.lambda !== undefined &&
    params.mu !== undefined &&
    params.E !== undefined
  ) {
    const expectedE = calculateE_from_lambda_mu(params.lambda, params.mu)
    const relError = Math.abs(expectedE - params.E) / params.E
    if (relError > tolerance) {
      inconsistencies.push(
        `E inconsistent with λ and μ: expected ${expectedE.toExponential(4)}, got ${params.E.toExponential(4)}`
      )
    }
  }

  if (
    params.lambda !== undefined &&
    params.mu !== undefined &&
    params.nu !== undefined
  ) {
    const expectedNu = calculateNu_from_lambda_mu(params.lambda, params.mu)
    const absError = Math.abs(expectedNu - params.nu)
    if (absError > tolerance) {
      inconsistencies.push(
        `ν inconsistent with λ and μ: expected ${expectedNu.toFixed(6)}, got ${params.nu.toFixed(6)}`
      )
    }
  }

  if (params.E !== undefined && params.nu !== undefined && params.mu !== undefined) {
    const expectedMu = calculateMu_from_E_nu(params.E, params.nu)
    const relError = Math.abs(expectedMu - params.mu) / params.mu
    if (relError > tolerance) {
      inconsistencies.push(
        `μ inconsistent with E and ν: expected ${expectedMu.toExponential(4)}, got ${params.mu.toExponential(4)}`
      )
    }
  }

  if (params.K !== undefined && params.mu !== undefined && params.nu !== undefined) {
    const expectedK = calculateK_from_mu_nu(params.mu, params.nu)
    const relError = Math.abs(expectedK - params.K) / params.K
    if (relError > tolerance) {
      inconsistencies.push(
        `K inconsistent with μ and ν: expected ${expectedK.toExponential(4)}, got ${params.K.toExponential(4)}`
      )
    }
  }

  return inconsistencies
}
