import React, {createContext, useRef, useState, useEffect} from 'react'
import {WebGLRenderer, Scene} from 'three'

import {useResource} from './hooks'
import ObjectContext from './objects'

const ClockContext = createContext(null)

const webGLRenderer = canvas => canvas && new WebGLRenderer({canvas})
export const Renderer = ({ style=fullScreenFixed, useSize=useWindowSize, camera, children }) => {
  const canvas = useRef()
  const renderer = useResource(webGLRenderer, [canvas.current])
  useRendererSize(renderer, useSize)
  const scene = useResource(Scene, [])
  window.S = scene
  const [now, setNow] = useState(0)
  useAnimationFrame(ts => {
    setNow(ts)
    const c = camera && camera.current && camera.current.val()
    if (!c || !renderer || !scene) return
    renderer.setClearColor(0x000000)
    renderer.clear()
    renderer.render(scene, c)
  })
  return (
    <ObjectContext.Provider value={scene}>
      <ClockContext.Provider value={now}>
        <canvas ref={canvas} style={style}>{children}</canvas>
      </ClockContext.Provider>
    </ObjectContext.Provider>
  )
}

export default Renderer

const fullScreenFixed = {
  position: 'fixed',
  top: 0, left: 0,
}

const useWindowSize = () => {
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight})
  useEffect(() => {
    const update = () => 
      setSize({width: window.innerWidth, height: window.innerHeight})
    addEventListener('resize', update)
    return () => removeEventListener('resize', update)
  }, [])
  return size
}

const useRendererSize = (renderer, useSize) => {
  const size = useSize()
  const {width, height} = size
  useEffect(() =>
    renderer && renderer.setSize && renderer.setSize(width, height, false),
    [renderer, width, height])
  return size
}

const useAnimationFrame = (tick, rafRef=useRef()) =>
  useEffect(() => {
    if (rafRef.current) return
    const loop = ts => {
      tick(ts)
      return rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [rafRef.current])

const useInterval = (tick, interval=200, intervalRef=useRef()) =>
  useEffect(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => tick(window.performance.now()), interval)
    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [tick, interval])
