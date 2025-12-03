/**
 * calculations.test.ts
 * Unit tests for calculation functions.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import {
  calculateE_from_lambda_mu,
  calculateNu_from_lambda_mu,
  calculateK_from_lambda_mu,
  calculateMu_from_E_nu,
  calculateLambda_from_E_nu,
  calculateK_from_E_nu,
  calculateE_from_mu_nu,
  calculateLambda_from_mu_nu,
  calculateK_from_mu_nu,
  calculateE_from_K_nu,
  calculateMu_from_K_nu,
  calculateLambda_from_K_nu,
  calculateE_from_K_mu,
  calculateNu_from_K_mu,
  calculateLambda_from_K_mu,
  calculateMu_from_E_K,
  calculateNu_from_E_K,
  calculateLambda_from_E_K,
  calculateNu_from_E_mu,
  calculateK_from_E_mu,
  calculateLambda_from_E_mu,
  calculateE_from_lambda_nu,
  calculateMu_from_lambda_nu,
  calculateK_from_lambda_nu,
  calculateE_from_lambda_K,
  calculateMu_from_lambda_K,
  calculateNu_from_lambda_K,
  calculateAllParameters,
  checkConsistency,
} from './calculations'

describe('Material Parameter Calculations', () => {
  describe('Lambda and Mu pairs', () => {
    test('calculates E from lambda and mu', () => {
      const lambda = 1e9 // 1 GPa
      const mu = 1e9 // 1 GPa
      const E = calculateE_from_lambda_mu(lambda, mu)
      expect(E).toBeCloseTo(2.5e9, -7)
    })

    test('calculates nu from lambda and mu', () => {
      const lambda = 1e9
      const mu = 1e9
      const nu = calculateNu_from_lambda_mu(lambda, mu)
      expect(nu).toBeCloseTo(0.25, 6)
    })

    test('calculates K from lambda and mu', () => {
      const lambda = 1e9
      const mu = 1e9
      const K = calculateK_from_lambda_mu(lambda, mu)
      expect(K).toBeCloseTo(1.6667e9, -7)
    })
  })

  describe('E and Nu pairs', () => {
    test('calculates mu from E and nu', () => {
      const E = 210e9 // 210 GPa (steel)
      const nu = 0.3
      const mu = calculateMu_from_E_nu(E, nu)
      expect(mu).toBeCloseTo(80.769e9, -7)
    })

    test('calculates lambda from E and nu', () => {
      const E = 210e9
      const nu = 0.3
      const lambda = calculateLambda_from_E_nu(E, nu)
      expect(lambda).toBeCloseTo(121.154e9, -7)
    })

    test('calculates K from E and nu', () => {
      const E = 210e9
      const nu = 0.3
      const K = calculateK_from_E_nu(E, nu)
      expect(K).toBeCloseTo(175e9, -7)
    })
  })

  describe('Mu and Nu pairs', () => {
    test('calculates E from mu and nu', () => {
      const mu = 80e9
      const nu = 0.3
      const E = calculateE_from_mu_nu(mu, nu)
      expect(E).toBeCloseTo(208e9, -7)
    })

    test('calculates lambda from mu and nu', () => {
      const mu = 80e9
      const nu = 0.3
      const lambda = calculateLambda_from_mu_nu(mu, nu)
      expect(lambda).toBeCloseTo(120e9, -7)
    })

    test('calculates K from mu and nu', () => {
      const mu = 80e9
      const nu = 0.3
      const K = calculateK_from_mu_nu(mu, nu)
      expect(K).toBeCloseTo(173.333e9, -7)
    })
  })

  describe('K and Nu pairs', () => {
    test('calculates E from K and nu', () => {
      const K = 175e9
      const nu = 0.3
      const E = calculateE_from_K_nu(K, nu)
      expect(E).toBeCloseTo(210e9, -7)
    })

    test('calculates mu from K and nu', () => {
      const K = 175e9
      const nu = 0.3
      const mu = calculateMu_from_K_nu(K, nu)
      expect(mu).toBeCloseTo(80.769e9, -7)
    })

    test('calculates lambda from K and nu', () => {
      const K = 175e9
      const nu = 0.3
      const lambda = calculateLambda_from_K_nu(K, nu)
      expect(lambda).toBeCloseTo(121.154e9, -7)
    })
  })

  describe('K and Mu pairs', () => {
    test('calculates E from K and mu', () => {
      const K = 175e9
      const mu = 80e9
      const E = calculateE_from_K_mu(K, mu)
      expect(E).toBeCloseTo(208.264e9, -7)
    })

    test('calculates nu from K and mu', () => {
      const K = 175e9
      const mu = 80e9
      const nu = calculateNu_from_K_mu(K, mu)
      expect(nu).toBeCloseTo(0.30165, 4)
    })

    test('calculates lambda from K and mu', () => {
      const K = 175e9
      const mu = 80e9
      const lambda = calculateLambda_from_K_mu(K, mu)
      expect(lambda).toBeCloseTo(121.667e9, -7)
    })
  })

  describe('Edge cases', () => {
    test('handles nu near 0.5 (incompressible)', () => {
      const E = 1e6
      const nu = 0.49999
      const K = calculateK_from_E_nu(E, nu)
      expect(K).toBeGreaterThan(1e10) // Should be very large
    })

    test('handles negative nu (auxetic material)', () => {
      const E = 100e9
      const nu = -0.2
      const mu = calculateMu_from_E_nu(E, nu)
      expect(mu).toBeCloseTo(62.5e9, -7)
      expect(mu).toBeGreaterThan(0)
    })

    test('throws on division by zero', () => {
      expect(() => calculateE_from_lambda_mu(-1e9, 1e9)).toThrow()
    })
  })

  describe('calculateAllParameters', () => {
    test('computes all from lambda and mu', () => {
      const result = calculateAllParameters({ lambda: 1e9, mu: 1e9 })
      expect(result.parameters.E).toBeCloseTo(2.5e9, -7)
      expect(result.parameters.nu).toBeCloseTo(0.25, 6)
      expect(result.parameters.K).toBeCloseTo(1.6667e9, -7)
      expect(result.derivations.length).toBeGreaterThan(0)
    })

    test('computes all from E and nu', () => {
      const result = calculateAllParameters({ E: 210e9, nu: 0.3 })
      expect(result.parameters.mu).toBeCloseTo(80.769e9, -7)
      expect(result.parameters.lambda).toBeCloseTo(121.154e9, -7)
      expect(result.parameters.K).toBeCloseTo(175e9, -7)
    })

    test('computes all from mu and nu', () => {
      const result = calculateAllParameters({ mu: 80e9, nu: 0.3 })
      expect(result.parameters.E).toBeCloseTo(208e9, -7)
      expect(result.parameters.lambda).toBeCloseTo(120e9, -7)
      expect(result.parameters.K).toBeCloseTo(173.333e9, -7)
    })

    test('computes all from K and nu', () => {
      const result = calculateAllParameters({ K: 175e9, nu: 0.3 })
      expect(result.parameters.E).toBeCloseTo(210e9, -7)
      expect(result.parameters.mu).toBeCloseTo(80.769e9, -7)
    })

    test('computes all from K and mu', () => {
      const result = calculateAllParameters({ K: 175e9, mu: 80e9 })
      expect(result.parameters.E).toBeCloseTo(208.264e9, -7)
      expect(result.parameters.nu).toBeCloseTo(0.30165, 4)
    })

    test('warns when less than 2 parameters', () => {
      const result = calculateAllParameters({ E: 210e9 })
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    test('preserves rho (density) without computing', () => {
      const result = calculateAllParameters({ E: 210e9, nu: 0.3, rho: 7850 })
      expect(result.parameters.rho).toBe(7850)
    })
  })

  describe('checkConsistency', () => {
    test('detects consistent parameters', () => {
      const params = {
        lambda: 121.154e9,
        mu: 80.769e9,
        E: 210e9,
        nu: 0.3,
        K: 175e9,
      }
      const inconsistencies = checkConsistency(params, 1e-3)
      expect(inconsistencies.length).toBe(0)
    })

    test('detects inconsistent E with lambda and mu', () => {
      const params = {
        lambda: 1e9,
        mu: 1e9,
        E: 10e9, // Wrong value
      }
      const inconsistencies = checkConsistency(params)
      expect(inconsistencies.length).toBeGreaterThan(0)
      expect(inconsistencies[0]).toContain('inconsistent')
    })

    test('detects inconsistent nu with lambda and mu', () => {
      const params = {
        lambda: 1e9,
        mu: 1e9,
        nu: 0.45, // Wrong value
      }
      const inconsistencies = checkConsistency(params)
      expect(inconsistencies.length).toBeGreaterThan(0)
    })
  })

  describe('E and K pairs', () => {
    test('calculates mu from E and K', () => {
      const E = 210e9
      const K = 175e9
      const mu = calculateMu_from_E_K(E, K)
      expect(mu).toBeCloseTo(80.769e9, -7)
    })

    test('calculates nu from E and K', () => {
      const E = 210e9
      const K = 175e9
      const nu = calculateNu_from_E_K(E, K)
      expect(nu).toBeCloseTo(0.3, 6)
    })

    test('calculates lambda from E and K', () => {
      const E = 210e9
      const K = 175e9
      const lambda = calculateLambda_from_E_K(E, K)
      expect(lambda).toBeCloseTo(121.154e9, -7)
    })
  })

  describe('E and Mu pairs', () => {
    test('calculates nu from E and mu', () => {
      const E = 210e9
      const mu = 80e9
      const nu = calculateNu_from_E_mu(E, mu)
      expect(nu).toBeCloseTo(0.3125, 4)
    })

    test('calculates K from E and mu', () => {
      const E = 210e9
      const mu = 80e9
      const K = calculateK_from_E_mu(E, mu)
      expect(K).toBeCloseTo(186.667e9, -7)
    })

    test('calculates lambda from E and mu', () => {
      const E = 210e9
      const mu = 80e9
      const lambda = calculateLambda_from_E_mu(E, mu)
      expect(lambda).toBeCloseTo(133.333e9, -7)
    })
  })

  describe('Lambda and Nu pairs', () => {
    test('calculates E from lambda and nu', () => {
      const lambda = 121e9
      const nu = 0.3
      const E = calculateE_from_lambda_nu(lambda, nu)
      expect(E).toBeCloseTo(209.733e9, -7)
    })

    test('calculates mu from lambda and nu', () => {
      const lambda = 121e9
      const nu = 0.3
      const mu = calculateMu_from_lambda_nu(lambda, nu)
      expect(mu).toBeCloseTo(80.67e9, -7)
    })

    test('calculates K from lambda and nu', () => {
      const lambda = 121e9
      const nu = 0.3
      const K = calculateK_from_lambda_nu(lambda, nu)
      expect(K).toBeCloseTo(174.778e9, -7)
    })
  })

  describe('Lambda and K pairs', () => {
    test('calculates E from lambda and K', () => {
      const lambda = 121e9
      const K = 175e9
      const E = calculateE_from_lambda_K(lambda, K)
      expect(E).toBeCloseTo(210.52e9, -7)
    })

    test('calculates mu from lambda and K', () => {
      const lambda = 121e9
      const K = 175e9
      const mu = calculateMu_from_lambda_K(lambda, K)
      expect(mu).toBeCloseTo(81e9, -7)
    })

    test('calculates nu from lambda and K', () => {
      const lambda = 121e9
      const K = 175e9
      const nu = calculateNu_from_lambda_K(lambda, K)
      expect(nu).toBeCloseTo(0.2995, 4)
    })
  })

  describe('Real material examples', () => {
    test('Steel: E=210GPa, nu=0.3', () => {
      const result = calculateAllParameters({ E: 210e9, nu: 0.3 })
      expect(result.parameters.mu).toBeCloseTo(80.769e9, -7)
      expect(result.warnings.length).toBe(0)
    })

    test('Aluminum: E=70GPa, nu=0.33', () => {
      const result = calculateAllParameters({ E: 70e9, nu: 0.33 })
      expect(result.parameters.mu).toBeCloseTo(26.316e9, -7)
      expect(result.parameters.K).toBeCloseTo(68.627e9, -7)
    })

    test('Rubber: E=0.01GPa, nu=0.48', () => {
      const result = calculateAllParameters({ E: 0.01e9, nu: 0.48 })
      expect(result.parameters.mu).toBeCloseTo(3.378e6, -4)
      expect(result.parameters.K).toBeCloseTo(83.333e6, -4)
    })
  })

  describe('Additional calculateAllParameters cases', () => {
    test('computes all from E and K', () => {
      const result = calculateAllParameters({ E: 210e9, K: 175e9 })
      expect(result.parameters.mu).toBeCloseTo(80.769e9, -7)
      expect(result.parameters.nu).toBeCloseTo(0.3, 6)
      expect(result.parameters.lambda).toBeCloseTo(121.154e9, -7)
    })

    test('computes all from E and mu', () => {
      const result = calculateAllParameters({ E: 210e9, mu: 80e9 })
      expect(result.parameters.nu).toBeCloseTo(0.3125, 4)
      expect(result.parameters.K).toBeCloseTo(186.667e9, -7)
      expect(result.parameters.lambda).toBeCloseTo(133.333e9, -7)
    })

    test('computes all from lambda and nu', () => {
      const result = calculateAllParameters({ lambda: 121e9, nu: 0.3 })
      expect(result.parameters.E).toBeCloseTo(209.733e9, -7)
      expect(result.parameters.mu).toBeCloseTo(80.67e9, -7)
      expect(result.parameters.K).toBeCloseTo(174.778e9, -7)
    })

    test('computes all from lambda and K', () => {
      const result = calculateAllParameters({ lambda: 121e9, K: 175e9 })
      expect(result.parameters.E).toBeCloseTo(210.52e9, -7)
      expect(result.parameters.mu).toBeCloseTo(81e9, -7)
      expect(result.parameters.nu).toBeCloseTo(0.2995, 4)
    })

    test('computes all from lambda and E', () => {
      const result = calculateAllParameters({ lambda: 121e9, E: 210e9 })
      expect(result.parameters.mu).toBeDefined()
      expect(result.parameters.nu).toBeDefined()
      expect(result.parameters.K).toBeDefined()
      expect(result.derivations.length).toBeGreaterThan(0)
    })
  })
})
