import {forwardRef} from 'react'
import {OrthoCamera as OrthoCam, PerspectiveCamera as PerspectiveCam} from 'three'
import {useResource} from './hooks'
import {useSelf, useChild} from './objects'

export const OrthoCamera = forwardRef(({left, right, top, bottom, near, far, children}, ref) => {
  const camera = useResource(OrthoCam, [left, right, top, bottom, near, far])
  useChild(camera)
  useSelf(ref, camera)
  return children
})

export const PerspectiveCamera = forwardRef(({fov, aspect, near, far, children}, ref) => {
  const camera = useResource(PerspectiveCam, [fov, aspect, near, far])
  useChild(camera)
  useSelf(ref, camera)
  return children
})
