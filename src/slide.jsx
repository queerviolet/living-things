import React, {createContext, useMemo, useRef, useContext, useState, useEffect} from 'react'

const BuildContext = createContext()

export const useBuildIn = effect => {
  const element = useContext(BuildContext)
  useEffect(() => {
    if (!element) return
    element.addEventListener('build-in', effect)
    return () => element.removeEventListener('build-in', effect)
  }, [element])
}

export const useBuildOut = effect => {
  const element = useContext(BuildContext)
  useEffect(() => {
    if (!element) return
    element.addEventListener('build-out', effect)
    return () => element.removeEventListener('build-out', effect)
  }, [element])
}

export const useIsBuilt = () => {
  const [isBuilt, setIsBuilt] = useState()
  const onChange = ({ detail }) => setIsBuilt(detail.isActive)
  useBuildIn(onChange)
  useBuildOut(onChange)
  return isBuilt
}

export const Slide = ({url, note, children}) => {
  const [slide, setSlide] = useState()
  return <build-slide ref={setSlide} data-key={url} data-note={note}>
    <BuildContext.Provider value={slide}>{
      children
    }</BuildContext.Provider>
  </build-slide>
}

export default Slide

export const note = Symbol('notes in markdown')

export const Slides = ({of, children}) => {
  const states = useMemo(() => Object.entries(of), [of])
  const initial = states[0]
  const [state, setState] = useState(initial)
  const currentState = useRef(initial)
  const raf = useRef()
  const rafState = state => {
    currentState.current = state
    raf.current || (raf.current = requestAnimationFrame(
      () => {
        setState(currentState.current)
        raf.current = null
      }
    ))
  }
  return <React.Fragment>
    {children(state[1])}
    {states.map(([key, state]) =>
      <Slide key={key} url={key} note={state[note]}>
        <BuildIn>{() => rafState([key, state])}</BuildIn>
        <BuildOut>{() => rafState(initial)}</BuildOut>
      </Slide>
    )}
  </React.Fragment>
}

export const BuildIn = ({children}) => {
  useBuildIn(children)
  return null
}

export const BuildOut = ({children}) => {
  useBuildOut(children)
  return null
}