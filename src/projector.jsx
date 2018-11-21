import React, {forwardRef, useMemo, useRef, useEffect, useState} from 'react'
import {Slides, use, note} from './slide'

export const Projector = forwardRef(({children, onChange, className='', overlay,
  fx={background: 'rgba(0, 0, 0, 0)', flicker: 5, vignette: 1, saturate: 75, sepia: 5, vignette: true}, style={}}, inputRef) => {
  const slides = useMemo(() => React.Children.map(children,
    ({props}) =>
      <div className={`projector-slide-content ${props.className || ''}`}>{
        props.children
      }<div className='projector-slide-vignette' /></div>), [children])
  const [projectorStyle, setProjectorStyle] = useState()
  const states = useMemo(() => Object.assign(...React.Children.map(children, (slide, index) => ({
    [slide.props.url]: Object.assign({
      [note]: slide.props.note,
      index,
    },
    slide.props)
  }))), [children])
  
  const ref = useRef()

  useEffect(() => {
    if (inputRef) inputRef.current = ref.current
    let raf = requestAnimationFrame(animateFlicker)
    let i = 0
    return () => cancelAnimationFrame(raf)
    function animateFlicker(ts) {
      raf = requestAnimationFrame(animateFlicker)
      if (i++ % 3 !== 0) return
      const brightness = Math.round(100 - fx.flicker + Math.random() * fx.flicker)
      if (ref.current) {
        Object.assign(ref.current.style, {
          background: fx.background,
          filter: `brightness(${brightness}%) saturate(${fx.saturate}%) sepia(${fx.sepia}%)`
        }, style)
        ref.current.style.setProperty('--vignette-opacity', fx.vignette)
      }
    }
  }, [fx])

  const byIndex = useMemo(() => Object.values(states), [states])
  return <Slides onChange={onChange} of={states}>{({index}) =>
    <div ref={ref} className={`projector ${className}`} style={projectorStyle}>
      <div className='projector-slide' style={carriageStyle(index, byIndex)}>{
        slides
      }</div>
      {overlay && <div style={overlayStyle(index)}>{overlay(byIndex[index])}</div>}
    </div>
  }</Slides>
})
export default Projector

const carriageStyle = (index, states) => ({
  width: states.length * 100 + 'vw', height: '100vh',
  left: index * -100 + 'vw',
  transition: states[index].transition || 'left 0.2s linear',
  display: 'flex',
  flexFlow: 'row nowrap',
  position: 'relative',
  top: 0,
  margin: 0,
})

const overlayStyle = index => ({
  width: 100 + 'vw', height: '100vh',
  left: 0,
  zIndex: 1000,
  display: 'flex',
  flexFlow: 'row nowrap',
  position: 'absolute',
  color: 'white',
  top: 0,
  margin: 0,  
})
