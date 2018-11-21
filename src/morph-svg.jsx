import React, {useState, useMemo, useEffect} from 'react'
import {MorphPath} from './greensock'
import {useAnimator} from './anim'

const loadSvgPaths = async (src, id=src) => {
  const parser = new DOMParser
  const rsp = await fetch(src)
  const svg = parser.parseFromString(await rsp.text(), 'image/svg+xml')
  const paths = Object.assign(
    ...[...svg.querySelectorAll('g')]
      .map((g, zIndex) => {
        const path = g.querySelector('path')
        if (!path) return
        return {
          [g.id]: {
            id: g.id,
            zIndex,
            d: path.getAttribute('d'),
            class: path.getAttribute('class'),
            style: {
              fill: path.getAttribute('fill'),
              'fill-opacity': path.getAttribute('fill-opacity') || 1,
              stroke: path.getAttribute('stroke'),
              'stroke-width': path.getAttribute('stroke-width') || 0,
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

const loadUngroupedSvgPaths = async (src, id=src) => {
  const parser = new DOMParser
  const rsp = await fetch(src)
  const svg = parser.parseFromString(await rsp.text(), 'image/svg+xml')
  const paths = Object.assign(
    ...[...svg.querySelectorAll('path')]
      .map((path, zIndex) => {
        const id = path.id || zIndex
        return {
          [id]: {
            id,
            zIndex,
            d: path.getAttribute('d'),
            class: path.getAttribute('class'),
            style: {
              fill: path.getAttribute('fill'),
              'fill-opacity': path.getAttribute('fill-opacity') || 1,
              stroke: path.getAttribute('stroke'),
              'stroke-width': path.getAttribute('strokewidth'),
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


export const MorphSVG = ({className, morph={}, src}) => {
  const [frame, setFrame] = useState()
  useEffect(async () =>
    setFrame(await loadSvgPaths(src)),
    [src])
  if (!frame) return null
  return <Cell className={className || undefined} viewBox={frame.viewBox} paths={frame.paths} {...morph} />
}
export default MorphSVG

export const Loop = ({loop, className, viewBox, morph}) => {
  const ordering = useMemo(() => {
    console.log('computing loop ordering')
    return zSortEntries(Object.entries(loop[0]))
  }, [loop])
  return <svg className={className} viewBox={viewBox}>{
    ordering.map(([key, path]) =>
      <MorphPath d={
        loop.map(frame => frame[key])
      } className={path.class || undefined} key={key} style={path.style} {...morph} />
    )
  }</svg>
}


export const Cell = ({className, morph={}, viewBox, paths}) => {
  return <svg className={className} viewBox={viewBox}>{
    zSortEntries(Object.entries(paths))
      .map(([key, path]) =>
        <MorphPath className={path.class || undefined} key={key} d={path.d} style={path.style} {...morph} />)
  }</svg>
}

const CIRCLE = {
  d: `M 1920,1080 L1920,1079 L1921,1079 L1921,1081 Z`,
  style: {
    fill: 'rgba(255, 255, 255, 0)',
    stroke: 'rgba(255, 255, 255, 0)',
  }
}

const getPaths = (anim, frameKey, defaultPath) => {
  if (Array.isArray(frameKey)) {
    return {loop: frameKey.map(key => getPaths(anim, key, defaultPath))}
  }
  const frame = anim.frames[frameKey]
  const pathsForFrame = frame ? frame.paths : []
  const outputPaths = new Array(anim.numTracks)
  let i = anim.numTracks; while (i --> 0) {
    outputPaths[i] = pathsForFrame[i] || defaultPath
  }
  return outputPaths
}

export const Animation = ({srcs, frame, morph={}, style={}, className, defaultPath=CIRCLE}) => {
  const [anim, setAnim] = useState()
  const set = anim => {
    // console.log(anim)
    setAnim(anim)
  }
  useEffect(() =>
    loadAnimation(srcs).then(set),
    [srcs])
  if (!anim) return null
  let key = useAnimator(frame)
  if (typeof frame !== 'function')
    key = frame
  console.log('frame=', frame, 'key=', key)
  const currentFrame = anim.frames[key]
  const paths = useMemo(() => {
    console.log('computing paths')
    return getPaths(anim, key, defaultPath)
  }, [anim, key])
  if (paths.loop)
    return <Loop className={className}
      style={style}
      morph={morph}
      viewBox={anim.viewBox}
      loop={paths.loop} />
  return <Cell className={className}
    style={style}
    morph={morph}
    viewBox={currentFrame ? currentFrame.viewBox : anim.viewBox}
    paths={paths} />
}

export const loadAnimation = srcs => Promise.all(
    Object.entries(srcs)
      .map(([id, src]) =>
        typeof src === 'object'
          ? loadUngroupedSvgPaths(src.ungrouped, id)
          : loadSvgPaths(src, id)
      )
  )
  .then(frames => frames.reduce(toSequence, {}))
  .then(f => {
    console.log('loaded:', f)
    return f
  })


const Unmatched = {}
/**
 * 
 * @param {{ viewBox, paths: {id: string, d: string, style: any}[] }[]} seq 
 * @param {{ viewBox, paths: { [id: string]: {id: string, d: string, style: any} } }} frame 
 */
const toSequence = (anim, frame) => {
  // console.log('---', frame.id, '---')
  const incoming = Object.assign({}, frame.paths)

  const frames = Object.values(anim.frames || [])

  const lastFrame = frames[frames.length - 1]
  const lastTracks = lastFrame ? lastFrame.paths : []

  // Map all existing paths to an incoming path
  const nextTracks = lastTracks.map(
    path => {
      if (!path) return Unmatched
      const match = incoming[path.id]
      // console.log('matching', path.id, 'to', match && match.id)
      if (!match) return Unmatched
      delete incoming[path.id]
      return match
    }
  )

  // Incoming only has unmatched paths now.
  const unmatchedIncoming = Object.values(incoming)

  const paths =
    nextTracks
    // Find all nextTracks that are unmatched
    // and match them to incoming tracks, sequentially
    .map(
      track => track !== Unmatched
        ? track
        : unmatchedIncoming.shift() || null
    )
    // And then attach any remaining unmatched incoming tracks
    .concat(unmatchedIncoming)

  // paths.forEach((p, i) => {
    // console.log(`track ${i}:`, p && p.id)
  // })
  const numTracks = Math.max(anim.numTracks || 0, paths.length)
  return {
    numTracks,
    viewBox: frame.viewBox,
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

const zSortEntries = paths => paths.sort(
  ([_aKey, a], [_bKey, b]) =>
    (a ? a.zIndex : 0) -
    (b ? b.zIndex : 0)
)