import React, {createContext, useState, useMemo, useEffect, useRef, useContext} from 'react'
import {runAnimatorStep} from './when'

export const AnimationContext = createContext()

export const AnimationProvider = ({children}) => {
  const animators = useRef([])
  useEffect(() => {
    let raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)

    function tick(ts) {
      raf = requestAnimationFrame(tick)
      runAnimatorStep(ts)
      let i = animators.current.length; while (i --> 0) {
        const a = animators.current[i]
        if (!a.output) continue
        a.state = a.state || {t0: ts}
        const value = a(ts, a.state)
        if (a.state.value !== value) {
          // console.log('emitting', value, a.state.value, a.state)
          a.output(value)
          a.state.value = value
        }
      }
    }
  }, [])
  const animate = useMemo(() => (animator, output) => {
    console.log('attaching', animator, output)
    animator.output = output
    animators.current.push(animator)
    return () => {
      animator.output = null
      const idx = animators.current.indexOf(animator)
      if (idx !== -1) animators.current.splice(idx, 1)
    }
  }, [])
  return <AnimationContext.Provider value={animate}>{
    children
  }</AnimationContext.Provider>
}

export default AnimationContext.Consumer

export const useAnimator = anim => {
  const animate = useContext(AnimationContext)
  const [value, setValue] = useState()
  const set = value => {
    console.log('setting state to', value)
    setValue(value)
  }
  useEffect(() => {
    console.log('anim=', anim)
    return typeof anim === 'function'
      ? animate(anim, set)
      : set(anim)
  }, [animate, anim])
  return value
}

const passthrough = _ => _
export const every = (interval, f=passthrough) =>
  (t, state) => {
    if (!state) return 0
    const {t0, lastTick, lastVal} = state
    const tick = Math.floor((t - t0) / interval)
    if (lastTick === tick) return lastVal
    state.lastVal = f(tick, t)
    state.lastTick = tick    
    return state.lastVal
  }

export const after = (delay, before, after) =>
  every(delay, i => i >= 1 ? after : before)

export const sec = seconds => 1000 * seconds
sec.symbol = Symbol('seconds')
sec[Symbol.toPrimitive] = () => sec.symbol
Object.defineProperty(Number.prototype, sec, {
  get() { return sec(this.valueOf()) }
})
Object.defineProperty(String.prototype, sec, {
  get() { return sec(+this) }
})
