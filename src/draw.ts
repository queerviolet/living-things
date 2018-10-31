import * as THREE from 'three'
import { OrthographicCamera, WebGLRendererParameters, BufferGeometry, BufferAttribute, Geometry, Mesh, Line } from 'three';

import Stroke, { Stylus, Identified } from './stroke';

type OrthoCameraBounds = [number, number, number, number, number, number]

const material = new THREE.LineBasicMaterial( { linewidth: 8, color: 0xff0000 } );

class Stage {
  public size = this.container.getBoundingClientRect()

  public camera = new THREE.OrthographicCamera(...this.cameraBounds)
  public scene = new THREE.Scene
  public renderer = new THREE.WebGLRenderer(this.rendererParams);

  public strokes: Map<string, BufferGeometry> = new Map

  onStart = (s: Identified & Stylus) => {
    // this.camera.
    const geometry = new BufferGeometry
    const attr = new BufferAttribute(s.position.array, s.position.sampleSize)
      .setDynamic(true)
    geometry.addAttribute('position', attr)
    const mesh = new Line(geometry, material)
    const {width, height} = this.size
    mesh.position.set(-width / 2, -height / 2, 0);
    this.scene.add(mesh)
    this.strokes.set(s.identifier, geometry)
    ;(<any>window)._scene = this.scene
  }

  onUpdate = (s: Identified & Stylus) => {
    const stroke = this.strokes.get(s.identifier)!
    const attr = stroke.getAttribute('position') as BufferAttribute
    attr.setArray(s.position.array)
    attr.needsUpdate = true
    stroke.setDrawRange(0, s.position.end / 3)
    console.log(attr.version)
  }

  onEnd = (s: Identified & Stylus) => {
    this.onUpdate(s)
    this.strokes.delete(s.identifier)
  }

  public stroke = Stroke(this) 

  constructor(public container: HTMLElement) {    
    container.appendChild(this.renderer.domElement)
    this.renderer.domElement.dataset.stageRole = 'stage'
    this.onResize()
    this.init()
    this.start()
  }

  init() {
    const {renderer} = this
    renderer.setClearColor(0x000000);
  }

  start() {
    this.animate()
    addEventListener('resize', this.onResize)
  }

  stop() {
    cancelAnimationFrame(this._raf!)    
    this._raf = null

    removeEventListener('resize', this.onResize)
  }

  private _raf: number | null = null
  animate = (ts?: DOMHighResTimeStamp) => {
    this._raf = requestAnimationFrame(this.animate)
    this.frame(ts)
  }

  frame(_ts?: DOMHighResTimeStamp) {
    const {renderer, scene, camera} = this
    renderer.clear()
    renderer.render(scene, camera)
  }

  onResize = (event?: Event) => {
    const {size} = this
    const frame = this.container.getBoundingClientRect()    
    if (!event || frame.width !== size.width || frame.height !== size.height) {
      this.renderer.setSize(frame.width, frame.height, true);
      this.size = frame
      updateCamera(this.camera, this.cameraBounds);
    }
  }


  private get cameraBounds(): OrthoCameraBounds {
    const {width, height} = this.size
    return [
      -width / 2, width / 2,
      -height / 2, height / 2,
      0, 10000
    ]
  }

  private get rendererParams(): THREE.WebGLRendererParameters {
    const params: WebGLRendererParameters = {
      antialias: true,
      alpha: true,
    }
    const canvas = this.container.querySelector('canvas[data-stage-role="stage"]')    
    if (canvas instanceof HTMLCanvasElement) params.canvas = canvas
    return params
  }
}

const updateCamera = (camera: OrthographicCamera, bounds: OrthoCameraBounds) => {
  const [l, r, t, b, n, f] = bounds
  const {left, right, top, bottom, near, far} = camera
  if (
    left === l && right === r &&
    top === t && bottom === b &&
    near === n && far === f) return
  Object.assign(camera, {left: l, right: r, top: t, bottom: b, near: n, far: f})
  camera.updateProjectionMatrix();
}

const stage = new Stage(document.getElementById('main')!);

let moduleVersion = 0
;(module as any).hot.dispose((data: any) => {
  console.log('dispose', module.id)
  data.version = moduleVersion + 1
  stage.stop()
});

;(module as any).hot.accept(() => {
  console.log('accept', module.id)
  moduleVersion = (module as any).hot.data.version
  console.log('accept', moduleVersion)
});
