import React, {createContext} from 'react'
import {useResource} from './hooks'
import {useColor, useWireframe, useSide, useRoughness, useMetalness} from './props'

import {
  MeshBasicMaterial as Basic,
  MeshStandardMaterial as Standard,
} from 'three'

export const MaterialContext = createContext()
export default MaterialContext

export const MeshBasicMaterial = props => {
  const material = useResource(Basic)
  useColor(material, props)
  useWireframe(material, props)
  useSide(material, props)
  return <MaterialContext.Provider value={material}>{props.children}</MaterialContext.Provider>
}

export const MeshStandardMaterial = props => {
  const material = useResource(Standard)
  useColor(material, props)
  useWireframe(material, props)
  useSide(material, props)
  useRoughness(material, props)
  useMetalness(material, props)
  return <MaterialContext.Provider value={material}>{props.children}</MaterialContext.Provider>
}
