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
  const firstTick = useRef()
  if (typeof anim === 'function') {
    firstTick.current = firstTick.current || ts
    return anim(ts, firstTick.current)
  }  
  return anim
}

const passthrough = _ => _
export const every = (interval, f=passthrough) => {
  let lastTick = null, lastVal = null
  return (t, t0) => {
    const tick = Math.floor((t - t0) / interval)
    if (lastTick === tick) return lastVal
    lastVal = f(tick, t)
    lastTick = tick
    return lastVal
  }
}

export const sec = seconds => 1000 * seconds
sec.symbol = Symbol('seconds')
sec[Symbol.toPrimitive] = () => sec.symbol
Object.defineProperty(Number.prototype, sec, {
  get() { return sec(this.valueOf()) }
})
Object.defineProperty(String.prototype, sec, {
  get() { return sec(+this) }
})
