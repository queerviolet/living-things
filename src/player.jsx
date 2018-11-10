import React, {useEffect, useRef, useState} from 'react'
import 'babel-polyfill'
const TAG = 'BUILD-SLIDE'

const addChildToKeys = (keys, build, i) => {
  const {element} = build
  const baseKey = element.dataset.key || String(i)
  let count = 1;
  let key = baseKey
  while (keys[key]) key = `${baseKey}_${++count}`
  keys[key] = build
  build.key = key
  return keys
}

const chain = prev => next => {
  if (prev) prev.build.next = next.build
  next.build.prev = prev && prev.build
  prev = next
}

function *firstGenerationByTagName({children}, tagName) {
  const count = children.length
  for (let i = 0; i != count; ++i) {
    const child = children[i]
    if (child.tagName === tagName) {
      yield child
      continue
    }
    yield *firstGenerationByTagName(child, tagName)
  }
}

import {join} from 'path'
class Build {
  static scan(root) {
    if (!root) return
    const builds = new Build(root)
    ;[...root.getElementsByTagName(TAG)]
      .forEach(chain())
    return builds
  }

  constructor(element, parent) {
    const builds = [...firstGenerationByTagName(element, TAG)]
      .map(element =>
        element.build = new Build(element, this))
    this.byIndex = builds
    this.byKey = builds.reduce(addChildToKeys, {})
    this.element = element
    this.parent = parent
  }

  get pathname() {
    const value = this.parent
      ? join(this.parent.pathname, this.key)
      : ''
    Object.defineProperty(this, 'pathname', {value})
    return value
  }

  get path() {
    const value = this.parent
      ? [...this.parent.path, this]
      : []
    Object.defineProperty(this, 'path', {value})
    return value
  }

  getIn([first, ...rest]) {
    const child = this.byKey[first]
    if (child) return child.getIn(rest)
    return this
  }

  activate() {
    console.log('activating', this)
  }

  buildOut() {

  }
}

const ls = (root, currentPath) => root &&
  <div>
    <span style={currentPath === root.pathname ? {color: 'fuchsia'} : {}}>{
      root.pathname
    }</span>
    <ol>{
      root.byIndex.map(child => <li key={child.key}>{ls(child, currentPath)}</li>)
    }</ol>
  </div>

const buildDelta = (buildIn, buildOut={}) => {
  const current = buildOut.path || []
  const next = buildIn.path
  let i = Math.max(current.length, next.length)
  const outs = [], ins = []
  while (i --> 0) {
    const c = current[i], n = next[i]
    if ((c && c.pathname) === (n && n.pathname))
      break
    c && outs.push(c)
    n && ins.unshift(n)
  }
  return {outs, ins}
}

const buildEventDispatcher = (type, finalActiveState, bubbles=false) => build => {
  console.log(`[${type}]`, build.pathname)
  const event = new CustomEvent(type, { detail: build, bubbles })
  build.isActive = finalActiveState
  build.element.dispatchEvent(event)
}

const fireBuildIn = buildEventDispatcher('build-in', true)
const fireBuildOut = buildEventDispatcher('build-out')

const applyDelta = ({outs, ins}) => {
  outs.forEach(fireBuildOut)
  ins.forEach(fireBuildIn)
}

const useHashNavigator = root => {
  const buildRef = useRef()
  const [currentPath, setPath] = useState()
  useEffect(() => {
    if (!root) return
    addEventListener('hashchange', didChange)
    didChange()
    return () => removeEventListener('hashchange', didChange)    

    function didChange() {
      const hashPath = decodeURIComponent(location.hash.slice(1))
      const first = root.byIndex[0]
      if (!hashPath && first) {
        // Redirect to the first slide if we've got no hash
        location.hash = first.pathname
        return
      }

      const newPath = hashPath.split('/')
      const newBuild = root.getIn(newPath)
      const diff = buildDelta(newBuild, buildRef.current)
      applyDelta(diff)
      buildRef.current = newBuild
      setPath(newBuild.pathname)
    }    
  }, [root])

  useEffect(() => {
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
    function onKey(e) {
      switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
        location.hash = buildRef.current.next.pathname
        break

      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        location.hash = buildRef.current.prev.pathname
        break
      }
    }
  }, [])
  return currentPath
}

export default ({children}) => {
  const container = useRef()
  const [root, setRoot] = useState()
  useEffect(() => {
    const nextRoot = Build.scan(container.current)
    setRoot(nextRoot)
    window.builds = nextRoot
  }, [container.current])
  const path = useHashNavigator(root)
  return <div ref={container}>
    <h1>{path}</h1>
    {ls(root, path)}
    {children}
  </div>
}