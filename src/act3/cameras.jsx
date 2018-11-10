import {forwardRef} from 'react'
import {OrthoCamera as OrthoCam, PerspectiveCamera as PerspectiveCam} from 'three'
import {useResource} from './hooks'
import {useSelf, useChild, useAsSceneObject} from './objects'

export const OrthoCamera = forwardRef((props, ref) => {
  const {left, right, top, bottom, near, far, children} = props
  const camera = useResource(OrthoCam, [left, right, top, bottom, near, far])
  useChild(camera)
  useSelf(ref, camera)
  useAsSceneObject(camera, props)
  return children
})

export const PerspectiveCamera = forwardRef((props, ref) => {
  const {fov, aspect, near, far, children} = props
  const camera = useResource(PerspectiveCam, [fov, aspect, near, far])
  useChild(camera)
  useSelf(ref, camera)
  useAsSceneObject(camera, props)
  return children
})
