import React, {createContext} from 'react'
import {
  PlaneBufferGeometry as PlaneBuffer,
  SphereBufferGeometry as SphereBuffer,
} from 'three'

import {useResource} from './hooks'

export const GeometryContext = createContext(null)
export default GeometryContext

const {PI} = Math

export const PlaneBufferGeometry = ({
  width=1, height=1,
  widthSegments=1, heightSegments=1,
  children
}) => {
  const plane = useResource(PlaneBuffer,
    [width, height, widthSegments, heightSegments])
  return <GeometryContext.Provider value={plane}>{children}</GeometryContext.Provider>
}

export const SphereBufferGeometry = ({
  radius=1,
  widthSegments=8, heightSegments=6,
  phiStart=0, phiLength=PI * 2,
  thetaStart=0, thetaLength=PI,
  children
}) => {
  const sphere = useResource(SphereBuffer,
    [radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength])
  return <GeometryContext.Provider value={sphere}>{children}</GeometryContext.Provider>
}