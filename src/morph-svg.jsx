import React, {useState, useEffect} from 'react'
import {MorphPath} from './greensock'

const loadSvgPaths = async src => {
  const parser = new DOMParser
  const rsp = await fetch(src)
  const svg = parser.parseFromString(await rsp.text(), 'image/svg+xml')
  const paths = Object.assign(
    ...[...svg.querySelectorAll('g')]
      .map(g => {
        const path = g.querySelector('path')
        return {
          [g.id]: {
            d: path.getAttribute('d'),
            style: {
              fill: path.getAttribute('fill'),
              stroke: path.getAttribute('stroke'),
              strokeWidth: path.getAttribute('strokewidth'),
            }
          }
        }
      })
  )

  return {
    viewBox: svg.documentElement.getAttribute('viewBox'),
    paths
  }
}

export const MorphSVG = ({className, src}) => {
  const [frame, setFrame] = useState()
  useEffect(async () =>
    setFrame(await loadSvgPaths(src)),
    [src])
  if (!frame) return null
  return <svg className={className} viewBox={frame.viewBox}>{
    Object.entries(frame.paths)
      .map(([key, path]) =>
        <MorphPath key={key} d={path.d} style={path.style} />
      )
  }</svg>
}
export default MorphSVG
