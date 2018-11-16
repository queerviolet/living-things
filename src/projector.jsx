import React, {forwardRef} from 'react'
import {Slides, note} from './slide'

export const Projector = forwardRef(({children, onChange, style={}}, ref) => {
  const slides = React.Children.map(children,
    ({props}) => <div className={`projector-slide-content ${props.className || ''}`}>{props.children}<div className='projector-slide-vignette' /></div>)

  return <Slides onChange={onChange} of={Object.assign(...React.Children.map(children, (slide, index) => ({
    [slide.props.url]: {
      [note]: slide.props.note,
      index,
    }
  })))}>{({index}) =>
    <div ref={ref} className='projector' style={style}>
      <div className='projector-slide' style={carriageStyle(index, slides.length)}>{
        slides
      }</div>            
    </div>
  }</Slides>
})
export default Projector

const carriageStyle = (index, count) => ({
  width: count * 100 + 'vw', height: '100vh',
  left: index * -100 + 'vw',
  transition: 'left 0.2s linear',
  display: 'flex',
  flexFlow: 'row nowrap',
  position: 'relative',
  top: 0,
  margin: 0,
})
