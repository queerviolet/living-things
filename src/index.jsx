import React, {useRef, useEffect, useState, forwardRef, useContext, useMemo, useImperativeMethods, createContext} from 'react'
import {render} from 'react-dom'

// export const Event = _type => {
//   const listeners = []
//   const add = listener => {
//     if (typeof listener !== 'function') return () => {}
//     return () => listeners.splice(listeners.indexOf(listener), 1)
//   }
//   let currentEvent = null
//   const fire = listener => listener(event)
//   add.fire = event => {
//     currentEvent = event
//     listeners.forEach(fire)
//     currentEvent = null
//   }
//   return add
// }

import * as THREE from 'three'
const ObjectContext = createContext(null)
const ClockContext = createContext(null)
const Renderer = ({ style=fullScreenFixed, useSize=useWindowSize, camera, children }) => {
  const canvas = useRef()
  const renderer = useResource(canvas => canvas && new THREE.WebGLRenderer({canvas}), [canvas.current])
  useRendererSize(renderer, useSize)
  const scene = useResource(fromClass(THREE.Scene), [])
  window.S = scene
  const [now, setNow] = useState(0)
  useAnimationFrame(ts => {
    setNow(ts)
    const c = camera && camera.current && camera.current.val()
    if (!c || !renderer || !scene) return
    renderer.setClearColor(0xff00ff)
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

window.Cam = THREE.Camera

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

const OrthoCamera = forwardRef(({left, right, top, bottom, near, far, children}, ref) => {
  const camera = useResource(fromClass(THREE.OrthographicCamera), [left, right, top, bottom, near, far])
  useChild(camera)
  useSelf(ref, camera)
  return children
})

const PerspectiveCamera = forwardRef(({fov, aspect, near, far, children}, ref) => {
  const camera = useResource(fromClass(THREE.PerspectiveCamera), [fov, aspect, near, far])
  useChild(camera)
  useSelf(ref, camera)
  return children
})

const useSelf = (ref, self, inputs=[]) =>
  useImperativeMethods(ref, () => ({
    val() { return self },
  }), [self, ...inputs])

const useChild = child => {
  const ctx = useContext(ObjectContext)
  useEffect(() => {
    if (!ctx || !child) return
    ctx.add(child)
    return () => ctx && child && ctx.remove(child)
  }, [ctx, child])
  return child
}

const useResource = (acquire, params=[], [value, set]=useState(), dispose=disposeThreeResource) => {
  useGuardedEffect(() => {
    console.log('acquire', acquire.name, ...params)
    const v = acquire(...params)
    console.log(' => ', v)
    set(v)
    return () => dispose(v)
  }, params)
  return value
}

const fromClass = Resource => (...params) => new Resource(...params)

const useGuardedEffect = (effect, inputs=[]) =>
  useEffect(() => {
    if (inputs.indexOf(void 0) !== -1) return
    return effect(...inputs)
  }, inputs)

const disposeThreeResource = res => {
  if (!res || typeof res.dispose !== 'function') return
  console.log('disposing', res)
  res.dispose()
}

const Plane = props => {
  const {width, height, widthSegments, heightSegments, children=null} = props
  const plane = useResource(fromClass(THREE.PlaneBufferGeometry),
    [width, height, widthSegments, heightSegments])  
  return <ClockContext.Consumer>{
    t => <Thing geometry={plane}
      type={THREE.Mesh}
      {...props}
      // rotation={{z: t / 1000, y: t / 2000, x: t / 1000}}
      // rotation={{}}
      // material={material}
      />  
  }</ClockContext.Consumer>
}

const XYZ_ZERO = {x: 0, y: 0, z: 0}
const Thing = props => {
  const {type=THREE.Mesh, geometry, children} = props
  const material = useResource(
    prop => prop === None ? new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, side: THREE.DoubleSide}) : prop,
    [Maybe(props.material)]
  )
  const object = useResource((Type, g, m) => new Type(g, m), [type, geometry, material])
  useSceneObject(object, props)
  return children || null
}

const useSceneObject = (object, props) => {
  useChild(object)
  usePosition(object, props)
  useRotation(object, props)
}

const usePosition = (object, {position}) =>
  useGuardedEffect(() => {
    const {x=0, y=0, z=0} = position
    object.position.set(x, y, z)
  }, [object, position])

const useRotation = (object, {rotation}) =>
  useGuardedEffect(() => {
    const {x=0, y=0, z=0} = rotation
    object.setRotationFromEuler(new THREE.Euler(x, y, z, 'XYZ'))
  }, [object, rotation])  

const val = Symbol('value of ref')
const guard = Symbol('is ref in ok state?')
const None = {}
const Maybe = value => value === void 0
  ? None
  : value

const BasicScene = () => {
  const camera = useRef()

  console.log('camera=', camera)

  return <Renderer camera={camera}>
    {/* <OrthoCamera ref={camera} top={-100} left={-100} bottom={100} right={100} near={0} far={1e6} /> */}
    <PerspectiveCamera ref={camera} fov={90} aspect={16/9} near={0.1} far={1e6} />
    <Plane position={{z: -60}}
      width={100} height={100} widthSegments={10} heightSegments={10} />
  </Renderer>
}

render(<BasicScene />, main);