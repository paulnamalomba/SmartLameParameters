/**
 * validators.test.ts
 * Unit tests for validation functions.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import {
  validatePoissonsRatio,
  validateShearModulus,
  validateBulkModulus,
  validateYoungsModulus,
  validateLameParameter,
  validateDensity,
  validateAllParameters,
  parseNumericInput,
  approximatelyEqual,
} from './validators'

describe('Validators', () => {
  describe('validatePoissonsRatio', () => {
    test('accepts valid positive nu', () => {
      expect(validatePoissonsRatio(0.3)).toBeNull()
      expect(validatePoissonsRatio(0.0)).toBeNull()
      expect(validatePoissonsRatio(0.49)).toBeNull()
    })

    test('warns on negative nu (auxetic)', () => {
      const result = validatePoissonsRatio(-0.2)
      expect(result).not.toBeNull()
      expect(result?.message).toContain('Warning')
    })

    test('rejects nu >= 0.5', () => {
      const result = validatePoissonsRatio(0.5)
      expect(result).not.toBeNull()
      expect(result?.message).toContain('between -1 and 0.5')
    })

    test('rejects nu <= -1', () => {
      const result = validatePoissonsRatio(-1.1)
      expect(result).not.toBeNull()
    })

    test('rejects NaN and Infinity', () => {
      expect(validatePoissonsRatio(NaN)).not.toBeNull()
      expect(validatePoissonsRatio(Infinity)).not.toBeNull()
    })
  })

  describe('validateShearModulus', () => {
    test('accepts positive mu', () => {
      expect(validateShearModulus(1e9)).toBeNull()
      expect(validateShearModulus(100e9)).toBeNull()
    })

    test('rejects zero or negative mu', () => {
      expect(validateShearModulus(0)).not.toBeNull()
      expect(validateShearModulus(-1e9)).not.toBeNull()
    })

    test('rejects NaN and Infinity', () => {
      expect(validateShearModulus(NaN)).not.toBeNull()
      expect(validateShearModulus(Infinity)).not.toBeNull()
    })
  })

  describe('validateBulkModulus', () => {
    test('accepts positive K', () => {
      expect(validateBulkModulus(1e9)).toBeNull()
      expect(validateBulkModulus(400e9)).toBeNull()
    })

    test('rejects zero or negative K', () => {
      expect(validateBulkModulus(0)).not.toBeNull()
      expect(validateBulkModulus(-1e9)).not.toBeNull()
    })
  })

  describe('validateYoungsModulus', () => {
    test('accepts positive E', () => {
      expect(validateYoungsModulus(0.01e9)).toBeNull()
      expect(validateYoungsModulus(1000e9)).toBeNull()
    })

    test('rejects zero or negative E', () => {
      expect(validateYoungsModulus(0)).not.toBeNull()
      expect(validateYoungsModulus(-1e9)).not.toBeNull()
    })
  })

  describe('validateLameParameter', () => {
    test('accepts positive lambda', () => {
      expect(validateLameParameter(1e9)).toBeNull()
    })

    test('warns on negative lambda', () => {
      const result = validateLameParameter(-1e9)
      expect(result).not.toBeNull()
      expect(result?.message).toContain('Warning')
    })

    test('rejects NaN and Infinity', () => {
      expect(validateLameParameter(NaN)).not.toBeNull()
      expect(validateLameParameter(Infinity)).not.toBeNull()
    })
  })

  describe('validateDensity', () => {
    test('accepts positive rho', () => {
      expect(validateDensity(100)).toBeNull()
      expect(validateDensity(20000)).toBeNull()
    })

    test('rejects zero or negative rho', () => {
      expect(validateDensity(0)).not.toBeNull()
      expect(validateDensity(-1000)).not.toBeNull()
    })
  })

  describe('validateAllParameters', () => {
    test('returns empty array for valid params', () => {
      const params = {
        lambda: 1e9,
        mu: 1e9,
        E: 2.5e9,
        K: 1.67e9,
        nu: 0.25,
        rho: 7850,
      }
      const errors = validateAllParameters(params)
      expect(errors.length).toBe(0)
    })

    test('returns errors for invalid params', () => {
      const params = {
        mu: -1e9,
        nu: 0.6,
      }
      const errors = validateAllParameters(params)
      expect(errors.length).toBeGreaterThan(0)
    })

    test('returns warnings for auxetic material', () => {
      const params = {
        nu: -0.2,
        lambda: -1e9,
      }
      const errors = validateAllParameters(params)
      expect(errors.length).toBeGreaterThan(0)
      expect(errors.some((e) => e.message.includes('Warning'))).toBe(true)
    })
  })

  describe('parseNumericInput', () => {
    test('parses valid numbers', () => {
      expect(parseNumericInput('123')).toBe(123)
      expect(parseNumericInput('1.23e9')).toBe(1.23e9)
      expect(parseNumericInput('  42  ')).toBe(42)
    })

    test('returns null for empty string', () => {
      expect(parseNumericInput('')).toBeNull()
      expect(parseNumericInput('  ')).toBeNull()
    })

    test('returns null for invalid input', () => {
      expect(parseNumericInput('abc')).toBeNull()
      expect(parseNumericInput('NaN')).toBeNull()
    })

    test('returns null for Infinity', () => {
      expect(parseNumericInput('Infinity')).toBeNull()
    })
  })

  describe('approximatelyEqual', () => {
    test('returns true for equal numbers', () => {
      expect(approximatelyEqual(1.0, 1.0)).toBe(true)
    })

    test('returns true for nearly equal numbers', () => {
      expect(approximatelyEqual(1.0, 1.0000001, 1e-6)).toBe(true)
      expect(approximatelyEqual(1e9, 1.000001e9, 1e-5)).toBe(true)
    })

    test('returns false for different numbers', () => {
      expect(approximatelyEqual(1.0, 2.0)).toBe(false)
      expect(approximatelyEqual(1e9, 2e9)).toBe(false)
    })

    test('handles very small numbers', () => {
      expect(approximatelyEqual(1e-15, 2e-15, 1e-6, 1e-12)).toBe(true)
    })
  })
})
