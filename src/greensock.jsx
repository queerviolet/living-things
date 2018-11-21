import React, { useEffect, useRef } from 'react'
import {TweenLite, TimelineMax} from 'gsap'
import MorphSVG from './gsap-plugins/MorphSVGPlugin'
import {Power3, Power2} from 'gsap/TweenLite';
console.log('Loaded', MorphSVG)

const useRafEffect = (effect, deps) => {
  const rafRef = useRef()
  const destructor = useRef()
  useEffect(() => {
    rafRef.current = requestAnimationFrame(performEffect)
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (destructor.current) destructor.current()
    }
    function performEffect() {
      if (destructor.current) { destructor.current() }
      destructor.current = effect()
      rafRef.current = null
    }  
  }, deps)
}

export const MorphPath = props => {
  const {
    d,
    className,
    ease=Power2.easeInOut,
    style,
    duration=1
  } = props
  const pathData = d
  const initialPath = useRef()
  initialPath.current = initialPath.current ||
    (Array.isArray(pathData)
      ? pathData[0].d      
      : pathData)
  
  const pathRef = useRef()
  useEffect(() => {
    TweenLite.to(pathRef.current,
      duration,
      Object.assign({morphSVG: pathData, ease}, style))
  }, [pathData])
  return <path
    ref={pathRef} d={initialPath.current}
    className={className} />
}