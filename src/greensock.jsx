import React, { useEffect, useRef } from 'react'
import {TweenLite, TimelineMax} from 'gsap'
import MorphSVG from './gsap-plugins/MorphSVGPlugin'
import {Power3, Power2} from 'gsap/TweenLite';
console.log('Loaded', MorphSVG)

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
    if (Array.isArray(pathData)) {
      console.log('creating timeline', pathData)
      const t = new TimelineMax
      const count = pathData.length
      for (let i = 0; i !== count; ++i) {
        t.to(pathRef.current,
          duration,
          {morphSVG: pathData[i].d, ease})
      }
      t.repeat(-1)
      t.play()
      return () => { console.log('destroying timeline') }
    }
    TweenLite.to(pathRef.current,
      duration,
      {morphSVG: pathData, ease})
    return () => {
      console.log('destroying effect')
    }
  }, [pathData])
  return <path
    ref={pathRef} d={initialPath.current}
    className={className} style={style} />
}