import React, {useRef, useEffect, useReducer} from 'react'
import {Vector2, Raycaster, DoubleSide} from 'three'

import {
  Renderer,
  DirectionalLight, AmbientLight, HemisphereLight,
  PerspectiveCamera,
  MeshBasicMaterial, MeshStandardMaterial,
  Plane, Sphere, Thing,
  SphereBufferGeometry,
} from './act3'

const {PI} = Math

const pointFromEvent = event =>
  new Vector2(
	  ( event.clientX / event.target.width ) * 2 - 1,
    - ( event.clientY / event.target.height ) * 2 + 1
  )

const append = (state, value) => [...state, value]

export default () => {
  const canvas = useRef()
  const camera = useRef()
  const target = useRef()

  const [points, addPoint] = useReducer(append, [])

  useEffect(() => {
    const {current} = canvas || {}
    if (!current) return

    const raycaster = new Raycaster 

    current.addEventListener('mousedown', down)

    return () => current.removeEventListener('mousedown', down)

    function down(e) {
      if (!camera.current) return
      const point = pointFromEvent(e)
      raycaster.setFromCamera(point, camera.current.val())
      const hit = raycaster.intersectObject(target.current)[0]
      if (hit) addPoint(hit.point)
      console.log(point, target.current, e)
    }
  })
  
  return <Renderer ref={canvas} camera={camera}>
    {/* <OrthoCamera ref={camera} top={-100} left={-100} bottom={100} right={100} near={0} far={1e6} /> */}
    <PerspectiveCamera ref={camera} fov={90} aspect={16/9} near={0.1} far={1e6} position={{z: 10, y: 3}}/>
    <AmbientLight color={0xff00ff} intensity={1} position={{x: 0, y: 0, z: 0}} />
    {/* <HemisphereLight helper color={0xffffff} groundColor={0xff0000} intensity={1} position={{x: 0, y: 4, z: 2}} rotation={{x: PI / 2, y: PI / 2}} /> */}
    <DirectionalLight helper color={0xffffff} intensity={1.5} position={{x: 0, y: 4, z: 2}} rotation={{x: PI / 2, y: PI / 2}}/>
    <DirectionalLight helper color={0xffffff} intensity={1.5} position={{x: 0, y: 4, z: 2}} rotation={{x: PI / 2, y: PI / 2}}/>
    <MeshBasicMaterial color={0xffff00} wireframe side={DoubleSide}>
      <Plane ref={target} position={{z: -60}}
        width={1000} height={1000} widthSegments={10} heightSegments={10} />
      <Plane position={{z: -20, x: 0, y: 0}} rotation={{x: -PI / 2}}
              width={200} height={200} widthSegments={10} heightSegments={10} />   
    </MeshBasicMaterial>
    <SphereBufferGeometry radius={2} widthSegments={20} heightSegments={20}>
      <MeshStandardMaterial side={DoubleSide} roughness={0.5} metalness={0.8} color={0xffffff}>{
        points.map(position =>
          <Thing key={[position.x, position.y, position.z].join(',')} position={position} rotation={{x: -Math.PI / 2}} /> 
        )
      }</MeshStandardMaterial>
    </SphereBufferGeometry>
  </Renderer>
}