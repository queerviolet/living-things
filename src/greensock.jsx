import React, { useEffect, useRef } from 'react'
import {TweenLite} from 'gsap'
import MorphSVG from './gsap-plugins/MorphSVGPlugin'
import {Power3} from 'gsap/TweenLite';
console.log('Loaded', MorphSVG)

export const MorphPath = props => {
  const {
    d: morphSVG,
    className,
    ease=Power3.easeInOut,
    style,
    duration=1
  } = props
  const initialPath = useRef()
  initialPath.current = initialPath.current || morphSVG
  const pathRef = useRef()
  useEffect(() => {
    TweenLite.to(pathRef.current,
      duration,
      {morphSVG, ease})
  }, [morphSVG])
  return <path
    ref={pathRef} d={initialPath.current}
    className={className} style={style} />
}