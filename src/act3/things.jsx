import React, {forwardRef} from 'react'
import {Mesh} from 'three'

import {SceneObject} from './objects'
import {PlaneBufferGeometry, SphereBufferGeometry} from './geometries'
import {pipe} from './pipe'

export const Thing = forwardRef((props, ref) => {
  const {
    type=Mesh,
    geometry,
    material,
  } = props
  return pipe(geometry, material, <SceneObject ref={ref} type={type} {...props} />)
})

export const Plane = forwardRef((props, ref) =>
  <Thing ref={ref} geometry={<PlaneBufferGeometry {...props} />}
    {...props}
  />)

export const Sphere = forwardRef((props, ref) =>
  <Thing ref={ref} geometry={<SphereBufferGeometry {...props} />}
    {...props}
  />)