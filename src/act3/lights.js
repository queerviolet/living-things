import {useResource, useGuardedEffect} from './hooks'
import {useColor, useGroundColor, useIntensity} from './props'
import {useChild, useAsSceneObject} from './objects'

import {
  AmbientLight as Ambient,
  HemisphereLight as Hemisphere,
  DirectionalLight as Directional,
  DirectionalLightHelper,
  HemisphereLightHelper,
} from 'three'

export const AmbientLight = props => {
  const light = useResource(Ambient)
  useColor(light, props)
  useIntensity(light, props)
  useAsSceneObject(light, props)
  return props.children || null
}

export const HemisphereLight = props => {
  const light = useResource(Hemisphere)
  useColor(light, props)
  useGroundColor(light, props)
  useIntensity(light, props)
  useAsSceneObject(light, props)
  useChild(useHelper(HemisphereLightHelper, props.helper && light))
  return props.children || null
}

export const DirectionalLight = props => {
  const light = useResource(Directional)
  useColor(light, props)
  useIntensity(light, props)
  useAsSceneObject(light, props)
  useChild(useHelper(DirectionalLightHelper, props.helper && light))
  return props.children || null
}

const useHelper = (type, light) => useResource(type, [light])