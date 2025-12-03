/**
 * types.ts
 * Type definitions for the material calculator.
 *
 * @author Paul Namalomba (https://github.com/paulnamalomba)
 */

export type Unit = 'Pa' | 'GPa'

export type ParameterKey = 'lambda' | 'mu' | 'E' | 'K' | 'nu' | 'rho'

export interface ParameterValue {
  value: number | null
  unit: Unit
  locked: boolean
  userProvided: boolean
}

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
