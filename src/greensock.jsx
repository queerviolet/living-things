import React, { useEffect, useRef } from 'react'
import {TweenLite} from 'gsap'
import MorphSVG from './gsap-plugins/MorphSVGPlugin'
import {Power3, Power2} from 'gsap/TweenLite';
console.log('Loaded', MorphSVG)

import {useAnimator} from './anim'

export const MorphPath = props => {
  const {
    d,
    className,
    ease=Power2.easeInOut,
    style,
    duration=1
  } = props
  const pathData = useAnimator(d)
  const initialPath = useRef()
  initialPath.current = initialPath.current || pathData
  const pathRef = useRef()
  useEffect(() => {
    TweenLite.to(pathRef.current,
      duration,
      {morphSVG: pathData, ease})
  }, [pathData])
  return <path
    ref={pathRef} d={initialPath.current}
    className={className} style={style} />
}