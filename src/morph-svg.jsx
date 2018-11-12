import React, {useState, useEffect} from 'react'
import {MorphPath} from './greensock'

const loadSvgPaths = async (src, id=src) => {
  const parser = new DOMParser
  const rsp = await fetch(src)
  const svg = parser.parseFromString(await rsp.text(), 'image/svg+xml')
  const paths = Object.assign(
    ...[...svg.querySelectorAll('g')]
      .map((g, _i) => {
        const path = g.querySelector('path')
        if (!path) return
        return {
          [g.id]: {
            id: g.id,
            d: path.getAttribute('d'),
            style: {
              fill: path.getAttribute('fill'),
              stroke: path.getAttribute('stroke'),
              strokeWidth: path.getAttribute('strokewidth'),
            }
          }
        }
      }).filter(_ => _)
  )

  return {
    id,
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
  return <Cell viewBox={frame.viewBox} paths={frame.paths} />
}
export default MorphSVG

export const Cell = ({className, viewBox, paths}) => {
  return <svg className={className} viewBox={viewBox}>{
    Object.entries(paths)
      .map(([key, path]) =>
        <MorphPath key={key} d={path.d} style={path.style} />)
  }</svg>
}

const compact = _ => _

export const loadAnimation = srcs => Promise.all(
    Object.entries(srcs)
      .map(([id, src]) => loadSvgPaths(src, id))
  )
  .then(frames => frames.reduce(toSequence, {}))


const Unmatched = {}
/**
 * 
 * @param {{ viewBox, paths: {id: string, d: string, style: any}[] }[]} seq 
 * @param {{ viewBox, paths: { [id: string]: {id: string, d: string, style: any} } }} frame 
 */
const toSequence = (anim, frame) => {
  const incoming = Object.assign({}, frame.paths)

  const frames = Object.values(anim.frames || [])

  const lastFrame = frames[frames.length - 1]
  const lastTracks = lastFrame ? lastFrame.paths : []

  // Map all existing paths to an incoming path
  const nextTracks = lastTracks.map(
    path => {
      const match = incoming[path.id]
      if (!match) return Unmatched
      delete incoming[path.id]
      return match
    }
  )

  // Incoming only has unmatched paths now.
  const unmatchedIncoming = Object.values(incoming)

  const paths = nextTracks
    // Find all nextTracks that are unmatched
    // and match them to incoming tracks, sequentially
    .map(
      track => track !== Unmatched
        ? track
        : unmatchedIncoming.shift() || null
    )
    // And then attach any remaining unmatched incoming tracks
    .concat(unmatchedIncoming)

  const numTracks = Math.max(anim.numTracks || 0, paths.length)
  return {
    numTracks,
    frames: Object.assign({},
      anim.frames,
      {
        [frame.id]: Object.assign({},
          frame,
          {paths}
        )
      }
    )
  }
}