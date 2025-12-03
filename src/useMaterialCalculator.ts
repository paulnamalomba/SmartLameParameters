/**
 * useMaterialCalculator.ts
 * Custom hook for managing material parameter calculations.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import { calculateAllParameters, checkConsistency } from './calculations'
import { validateAllParameters, ValidationError } from './validators'
import { CalculatorState, ParameterKey, Unit } from './types'

const DEBOUNCE_MS = 300

const initialState: CalculatorState = {
  lambda: { value: null, unit: 'Pa', locked: false, userProvided: false },
  mu: { value: null, unit: 'Pa', locked: false, userProvided: false },
  E: { value: null, unit: 'Pa', locked: false, userProvided: false },
  K: { value: null, unit: 'Pa', locked: false, userProvided: false },
  nu: { value: null, unit: 'Pa', locked: false, userProvided: false },
  rho: { value: null, unit: 'Pa', locked: false, userProvided: false },
  derivations: [],
  warnings: [],
  errors: [],
  precision: 4,
}

export function useMaterialCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)
  const debounceTimer = useRef<number | null>(null)

  /**
   * Convert value between units.
   */
  const convertUnit = useCallback((value: number, from: Unit, to: Unit): number => {
    if (from === to) return value
    if (from === 'Pa' && to === 'GPa') return value / 1e9
    if (from === 'GPa' && to === 'Pa') return value * 1e9
    return value
  }, [])

  /**
   * Recalculate all parameters based on current inputs.
   */
  const recalculate = useCallback(() => {
    const inputParams: Partial<Record<ParameterKey, number>> = {}
    const errors: string[] = []
    const validationErrors: ValidationError[] = []

    // Collect user-provided values in Pa
    ;(['lambda', 'mu', 'E', 'K', 'nu', 'rho'] as ParameterKey[]).forEach((key) => {
      const param = state[key]
      if (param.value !== null && param.userProvided) {
        const valueInPa = key === 'nu' || key === 'rho' 
          ? param.value 
          : convertUnit(param.value, param.unit, 'Pa')
        inputParams[key] = valueInPa
      }
    })

    // Validate inputs
    const validationResult = validateAllParameters(inputParams)
    validationErrors.push(...validationResult)

    if (validationErrors.length > 0) {
      setState((prev) => ({
        ...prev,
        errors: validationErrors.map((e) => e.message),
        warnings: validationErrors
          .filter((e) => e.message.startsWith('Warning'))
          .map((e) => e.suggestion || ''),
      }))
      return
    }

    // Check consistency if more than 2 parameters provided
    const providedCount = Object.keys(inputParams).filter(k => k !== 'rho').length
    if (providedCount > 2) {
      const inconsistencies = checkConsistency(inputParams)
      if (inconsistencies.length > 0) {
        setState((prev) => ({
          ...prev,
          errors: inconsistencies,
          warnings: ['More than 2 parameters provided. Checking consistency...'],
        }))
        return
      }
    }

    // Calculate all parameters
    const result = calculateAllParameters(inputParams)

    // Update state with calculated values
    setState((prev) => {
      const newState = { ...prev }
      ;(['lambda', 'mu', 'E', 'K', 'nu'] as ParameterKey[]).forEach((key) => {
        if (result.parameters[key] !== undefined && !newState[key].locked) {
          const valueInPa = result.parameters[key]!
          const displayValue = key === 'nu' 
            ? valueInPa 
            : convertUnit(valueInPa, 'Pa', newState[key].unit)
          
          newState[key] = {
            ...newState[key],
            value: displayValue,
          }
        }
      })

      newState.derivations = result.derivations
      newState.warnings = result.warnings
      newState.errors = errors

      return newState
    })
  }, [state, convertUnit])

  /**
   * Debounced recalculation.
   */
  const debouncedRecalculate = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(recalculate, DEBOUNCE_MS)
  }, [recalculate])

  /**
   * Update a parameter value.
   */
  const updateParameter = useCallback(
    (key: ParameterKey, value: number | null) => {
      setState((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          value,
          userProvided: value !== null,
        },
      }))
    },
    []
  )

  /**
   * Toggle parameter lock.
   */
  const toggleLock = useCallback((key: ParameterKey) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        locked: !prev[key].locked,
      },
    }))
  }, [])

  /**
   * Change unit for a parameter.
   */
  const changeUnit = useCallback(
    (key: ParameterKey, newUnit: Unit) => {
      setState((prev) => {
        const param = prev[key]
        if (param.value === null || key === 'nu' || key === 'rho') {
          return {
            ...prev,
            [key]: { ...param, unit: newUnit },
          }
        }

        const convertedValue = convertUnit(param.value, param.unit, newUnit)
        return {
          ...prev,
          [key]: {
            ...param,
            value: convertedValue,
            unit: newUnit,
          },
        }
      })
    },
    [convertUnit]
  )

  /**
   * Set precision (significant digits).
   */
  const setPrecision = useCallback((precision: number) => {
    setState((prev) => ({ ...prev, precision }))
  }, [])

  /**
   * Clear all inputs.
   */
  const clearAll = useCallback(() => {
    setState(initialState)
  }, [])

  /**
   * Export current state as JSON.
   */
  const exportJSON = useCallback(() => {
    const data: Record<string, { value: number; unit: Unit }> = {}
    ;(['lambda', 'mu', 'E', 'K', 'nu', 'rho'] as ParameterKey[]).forEach((key) => {
      if (state[key].value !== null) {
        data[key] = {
          value: state[key].value,
          unit: state[key].unit,
        }
      }
    })
    return JSON.stringify(data, null, 2)
  }, [state])

  /**
   * Export current state as CSV.
   */
  const exportCSV = useCallback(() => {
    const lines = ['Parameter,Value,Unit']
    const labels: Record<ParameterKey, string> = {
      lambda: 'Lambda (λ)',
      mu: 'Shear Modulus (μ)',
      E: "Young's Modulus (E)",
      K: 'Bulk Modulus (K)',
      nu: "Poisson's Ratio (ν)",
      rho: 'Density (ρ)',
    }
    ;(['lambda', 'mu', 'E', 'K', 'nu', 'rho'] as ParameterKey[]).forEach((key) => {
      if (state[key].value !== null) {
        lines.push(`${labels[key]},${state[key].value},${state[key].unit}`)
      }
    })
    return lines.join('\n')
  }, [state])

  /**
   * Generate permalink (base64 encoded state).
   */
  const generatePermalink = useCallback(() => {
    const data: Record<string, number | Unit> = {}
    ;(['lambda', 'mu', 'E', 'K', 'nu', 'rho'] as ParameterKey[]).forEach((key) => {
      if (state[key].value !== null) {
        data[key] = state[key].value
        data[`${key}_unit`] = state[key].unit
      }
    })
    const encoded = btoa(JSON.stringify(data))
    return `${window.location.origin}${window.location.pathname}?params=${encoded}`
  }, [state])

  /**
   * Auto-recalculate when inputs change.
   */
  useEffect(() => {
    debouncedRecalculate()
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [
    state.lambda.value,
    state.mu.value,
    state.E.value,
    state.K.value,
    state.nu.value,
    state.rho.value,
    debouncedRecalculate,
  ])

  return {
    state,
    updateParameter,
    toggleLock,
    changeUnit,
    setPrecision,
    clearAll,
    exportJSON,
    exportCSV,
    generatePermalink,
  }
}
