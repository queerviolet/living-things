import React from 'react'
import {Mesh} from 'three'

import {SceneObject} from './objects'
import {PlaneBufferGeometry, SphereBufferGeometry} from './geometries'
import {pipe} from './pipe'

export const Thing = props => {
  const {
    type=Mesh,
    geometry,
    material,
  } = props
  // console.log('---')
  const output = pipe(geometry, material, <SceneObject type={type} {...props} />)
  // console.log(props)
  // console.log(output)
  // console.log('type', type.name, 'geometry', geometry, 'material', material)
  // console.log('---')
  return output
}

export const Plane = props =>
  <Thing geometry={<PlaneBufferGeometry {...props} />}
    {...props}
  />

export const Sphere = props =>
  <Thing geometry={<SphereBufferGeometry {...props} />}
    {...props}
  />