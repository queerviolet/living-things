import React, { useEffect, useRef } from 'react'
import {TweenLite} from 'gsap'
import MorphSVG from './gsap-plugins/MorphSVGPlugin'
console.log(MorphSVG)

export const MorphPath = ({d: morphSVG, className, style}) => {
  const initialPath = useRef()
  initialPath.current = initialPath.current || morphSVG
  const pathRef = useRef()
  useEffect(() => {
    TweenLite.to(pathRef.current, 1, {morphSVG})
  }, [morphSVG])
  return <path ref={pathRef} d={initialPath.current} className={className} style={style} />
}