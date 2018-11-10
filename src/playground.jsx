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

import {
  Renderer,
  DirectionalLight, AmbientLight,
  PerspectiveCamera,
  MeshBasicMaterial, MeshStandardMaterial,
  Plane, Sphere,
} from './act3'

const {PI} = Math

const BasicScene = () => {
  const camera = useRef()

  return <Renderer camera={camera}>
    {/* <OrthoCamera ref={camera} top={-100} left={-100} bottom={100} right={100} near={0} far={1e6} /> */}
    <PerspectiveCamera ref={camera} fov={90} aspect={16/9} near={0.1} far={1e6} />
    <AmbientLight color={0xff0000} intensity={1} position={{x: 0, y: 0, z: 0}} />
    {/* <HemisphereLight color={0x0000ff} groundColor={0xff0000} intensity={3} /> */}
    <DirectionalLight color={0xffffff} intensity={1.5} position={{x: 0, y: -30, z: -10}} rotation={{x: PI, y: PI}}/>
    <MeshBasicMaterial color={0xffff00} wireframe side={THREE.DoubleSide}>
      <Plane position={{z: -60}}
        width={100} height={100} widthSegments={10} heightSegments={10} />
      <Plane position={{z: -10}} rotation={{x: 90}}
              width={100} height={100} widthSegments={10} heightSegments={10} />   
      <Sphere position={{z: -10}} rotation={{x: -Math.PI / 2}}
              radius={2} widthSegments={10} heightSegments={10} />                   
    </MeshBasicMaterial>
    <Sphere position={{z: -10, x: 6, y: 6}} rotation={{x: -Math.PI / 2}}
        material={<MeshStandardMaterial side={THREE.DoubleSide} roughness={0.5} metalness={0.8} color={0xffffff} />}
        radius={2} widthSegments={10} heightSegments={10} /> 
  </Renderer>
}

render(<BasicScene />, main);