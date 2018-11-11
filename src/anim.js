import React, {createContext, useState, useEffect} from 'react'
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

export default AnimationProvider