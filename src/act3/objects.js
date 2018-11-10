'use strict'
import {createContext, useContext, useEffect, useImperativeMethods} from 'react'
import {Euler} from 'three'
import {useResource, useGuardedEffect} from './hooks'

import MaterialContext from './materials'
import GeometryContext from './geometries'

export const ObjectContext = createContext()
export default ObjectContext

function SceneObjectFactory(Type, geometry, material) {
  console.log('CREATE')
  return new Type(geometry, material)
}

export const SceneObject = props => {
  const {type, children} = props
  const material = useContext(MaterialContext)
  const geometry = useContext(GeometryContext)
  const object = useResource(SceneObjectFactory, [type, geometry, material])
  console.log('in SceneObject', object, 'type=', type, 'material=', material, 'geometry=', geometry)
  useAsSceneObject(object, props)
  return children || `Material: ${material && material.name}`
}

export const useAsSceneObject = (object, props) => {
  useChild(object)
  usePosition(object, props)
  useRotation(object, props)
}

export const useChild = child => {
  const ctx = useContext(ObjectContext)
  useEffect(() => {
    if (!ctx || !child) return
    console.log(
      'add', ctx, child)
    ctx.add(child)
    return () => ctx && child && ctx.remove(child)
  }, [ctx, child])
  return child
}

export const useSelf = (ref, self, inputs=[]) =>
  useImperativeMethods(ref, () => ({
    val() { return self },
  }), [self, ...inputs])

const usePosition = (object, {position}) =>
  useGuardedEffect(() => {
    const {x=0, y=0, z=0} = position
    object.position.set(x, y, z)
  }, [object, position])

const useRotation = (object, {rotation}) =>
  useGuardedEffect(() => {
    const {x=0, y=0, z=0} = rotation
    object.setRotationFromEuler(new Euler(x, y, z, 'XYZ'))
  }, [object, rotation])
