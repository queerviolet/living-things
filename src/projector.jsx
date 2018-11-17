import React, {forwardRef} from 'react'
import {Slides, note} from './slide'

export const Projector = forwardRef(({children, onChange, overlay, style={}}, ref) => {
  const slides = React.Children.map(children,
    ({props}) => <div className={`projector-slide-content ${props.className || ''}`}>{props.children}<div className='projector-slide-vignette' /></div>)

  const states = Object.assign(...React.Children.map(children, (slide, index) => ({
    [slide.props.url]: Object.assign({
      [note]: slide.props.note,
      index,
    }, slide.props)
  })))
  const byIndex = Object.values(states)  
  return <Slides onChange={onChange} of={states}>{({index}) =>
    <div ref={ref} className='projector' style={style}>
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
