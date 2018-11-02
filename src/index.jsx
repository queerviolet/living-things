import React, {useRef, useEffect, useState, forwardRef, useContext, useMemo, useImperativeMethods, createContext, cloneElement} from 'react'
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
import { Color } from 'three';
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

const Empty = []
const useResource = (acquire, params=Empty, override=void 0, [value, set]=useState(), dispose=disposeThreeResource) => {
  useGuardedEffect((override, ...params) => {
    if (override !== None) return override
    console.log('acquire', acquire._name || acquire.name, ...params)
    const v = acquire(...params)
    console.log(' => ', v)
    set(v)
    return () => dispose(v)
  }, [Maybe(override), ...params])
  return value
}

const fromClass = Resource => {
  const create = (...params) => new Resource(...params)
  create._name = Resource.name
  return create
}

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

const MaterialContext = createContext()
const GeometryContext = createContext()

const Plane = props =>
  <Thing geometry={<PlaneBufferGeometry {...props} />}
      {...props}
  />

const Sphere = props =>
  <Thing geometry={<SphereBufferGeometry {...props} />}
      {...props}
  />

const PlaneBufferGeometry = ({width, height, widthSegments, heightSegments, children}) => {
  const plane = useResource(fromClass(THREE.PlaneBufferGeometry),
    [width, height, widthSegments, heightSegments])
  return <GeometryContext.Provider value={plane}>{children}</GeometryContext.Provider>
}

const SphereBufferGeometry = ({radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, children}) => {
  const plane = useResource(fromClass(THREE.SphereBufferGeometry),
    [radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength])
  return <GeometryContext.Provider value={plane}>{children}</GeometryContext.Provider>
}

const MeshBasicMaterial = props => {
  const material = useResource(fromClass(THREE.MeshBasicMaterial))
  useColor(material, props)
  useWireframe(material, props)
  useSide(material, props)
  return <MaterialContext.Provider value={material}>{props.children}</MaterialContext.Provider>
}

const MeshStandardMaterial = props => {
  const material = useResource(fromClass(THREE.MeshStandardMaterial))
  useColor(material, props)
  useWireframe(material, props)
  useSide(material, props)
  useRoughness(material, props)
  useMetalness(material, props)
  return <MaterialContext.Provider value={material}>{props.children}</MaterialContext.Provider>
}


const XYZ_ZERO = {x: 0, y: 0, z: 0}
const Thing = props => {
  const {
    type=THREE.Mesh,
    geometry,
    material,
  } = props
  const x = pipe(geometry, material, <SceneObject type={type} {...props} />)
  console.log(x)
  return x
}

const SceneObject = props => {
  const {type, children} = props
  const material = useContext(MaterialContext)
  const geometry = useContext(GeometryContext)
  const object = useResource((Type, g, m) => new Type(g, m), [type, geometry, material])
  console.log('DRAW', type, object, material, geometry)
  useSceneObject(object, props)
  return children || null
}

const pipe = (first, ...rest) =>
  !first
    ? pipe(...rest)
    :
  !rest.length
    ? first
    :
  cloneElement(first, {}, pipe(...rest))

// const material = useResource(
//   () => new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, side: THREE.DoubleSide}),
//   [], props.material
// )
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

// const useApplyProps = (object, props) =>
//   useGuardedEffect(() => Object.assign(object, props, {color: new Color(props.color)}),
//     [object, ...Object.values(props)])


const identity = _ => _
const createPropertyHook = (property, convert=identity) => (object, props) =>
  useGuardedEffect((object, value) => object[property] = convert(value), [object, props[property]])

const useColor = createPropertyHook('color', c => new Color(c))
const useWireframe = createPropertyHook('wireframe')
const useIntensity = createPropertyHook('intensity')
const useSide = createPropertyHook('side')
const useGroundColor = createPropertyHook('groundColor')
const useRoughness = createPropertyHook('roughness')
const useMetalness = createPropertyHook('metalness')

const AmbientLight = props => {
  const light = useResource(fromClass(THREE.AmbientLight))
  useColor(light, props)
  useIntensity(light, props)
  useSceneObject(light, props)
  return props.children || null
}

const HemisphereLight = props => {
  const light = useResource(fromClass(THREE.AmbientLight))
  useColor(light, props)
  useGroundColor(light, props)
  useIntensity(light, props)
  useSceneObject(light, props)
  return props.children || null
}

const DirectionalLight = props => {
  const light = useResource(fromClass(THREE.AmbientLight))
  useColor(light, props)
  useIntensity(light, props)
  useSceneObject(light, props)
  return props.children || null
}

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
    <AmbientLight color={0xff0000} intensity={1} position={{x: 0, y: 0, z: 0}} />
    {/* <HemisphereLight color={0x0000ff} groundColor={0xff0000} intensity={1} /> */}
    <DirectionalLight color={0xffffff} intensity={1.3} position={{x: 0, y: -30, z: 10}}/>
    <MeshBasicMaterial color={0xffff00} wireframe side={THREE.DoubleSide}>    
      <Plane position={{z: -60}}
        width={100} height={100} widthSegments={10} heightSegments={10} />             
    </MeshBasicMaterial>
    <Sphere position={{z: -100, y: -30, z: -60}} rotation={{x: -Math.PI / 2}}
        material={<MeshStandardMaterial side={THREE.DoubleSide} roughness={0.5} metalness={0.5} color={0xffffff} />}
        radius={10} widthSegments={10} heightSegments={10} /> 
  </Renderer>
}

render(<BasicScene />, main);