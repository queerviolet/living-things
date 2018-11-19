import React, {createContext, useState, useEffect, useRef, useContext} from 'react'
import {runAnimatorStep} from './when'

export const ClockContext = createContext()

export const AnimationProvider = ({children}) => {
  const [time, setTime] = useState()
  useEffect(() => {
    let raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)

    function tick(ts) {
      raf = requestAnimationFrame(tick)
      setTime(ts)
      runAnimatorStep(ts)
    }
  }, [])
  return <ClockContext.Provider value={time}>{
    children
  }</ClockContext.Provider>
}

export default ClockContext.Consumer

export const useAnimator = anim => {
  const ts = useContext(ClockContext)
  const state = useRef()
  if (typeof anim === 'function') {
    state.current = state.current || {t0: ts}
    const val = anim(ts, state.current)
    return val
  }  
  return anim
}

const passthrough = _ => _
export const every = (interval, f=passthrough) =>
  (t, state) => {
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
