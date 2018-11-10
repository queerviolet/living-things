import { Color } from 'three'
import { createPropertyHook } from './hooks'

export const useColor = createPropertyHook('color', c => new Color(c))
export const useWireframe = createPropertyHook('wireframe')
export const useIntensity = createPropertyHook('intensity')
export const useSide = createPropertyHook('side')
export const useGroundColor = createPropertyHook('groundColor')
export const useRoughness = createPropertyHook('roughness')
export const useMetalness = createPropertyHook('metalness')
