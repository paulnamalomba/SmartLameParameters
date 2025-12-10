/**
 * types.ts
 * Type definitions for the material calculator.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */

// Define supported units as a union type
export type Unit = 'Pa' | 'kPa' | 'MPa' | 'GPa'

// Define parameter keys as a union type
export type ParameterKey = 'lambda' | 'mu' | 'E' | 'K' | 'nu' | 'rho'

// Define structure for parameter values as interface
// This interface includes the value, unit, lock status, and whether it was user-provided
export interface ParameterValue {

  value: number | null
  unit: Unit
  locked: boolean
  userProvided: boolean

}

// Define structure for parameter states as interface
// This interface maps each parameter key to its corresponding ParameterValue
export interface ParameterState {

  lambda: ParameterValue
  mu: ParameterValue
  E: ParameterValue
  K: ParameterValue
  nu: ParameterValue
  rho: ParameterValue

}

export interface CalculatorState extends ParameterState {

  derivations: string[]
  warnings: string[]
  errors: string[]
  precision: number

}
