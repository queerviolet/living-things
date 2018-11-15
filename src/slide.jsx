import React, {forwardRef, createContext, useMemo, useRef, useContext, useState, useEffect} from 'react'

const BuildContext = createContext()

const useListener = (element, event, effect) =>
  useEffect(() => {
    if (!element || !effect) return
    element.addEventListener(event, effect)
    return () => element.removeEventListener(event, effect)
  }, [element, event, effect])

export const useBuildIn = (effect, element) => {
  const ctx = useContext(BuildContext)
  useListener(element || ctx, 'build-in', effect)
}

export const useBuildOut = (effect, element) => {
  const ctx = useContext(BuildContext)
  useListener(element || ctx, 'build-out', effect)
}

export const useIsBuilt = element => {
  const [isBuilt, setIsBuilt] = useState()
  const onChange = ({ detail }) => setIsBuilt(detail.isActive)
  useBuildIn(onChange, element)
  useBuildOut(onChange, element)
  return isBuilt
}

export const useBuildEffect = (effect, element) => {
  const dispose = useRef()
  useBuildIn(() => {
    if (dispose.current instanceof Function) {
      dispose.current()
    }
    dispose.current = effect instanceof Function
      ? effect()
      : null
  }, element)
  useBuildOut(() => {
    if (dispose.current instanceof Function)
      dispose.current()
  })
}

export const Slide = forwardRef(
  ({url, note, onBuildIn, onBuildOut, effect, children}, ref) => {
    const [slide, setSlide] = useState()
    useBuildIn(onBuildIn, slide)
    useBuildOut(onBuildOut, slide)
    useBuildEffect(effect, slide)
    const setSlideAndRef = useMemo(() =>
      slide => {
        setSlide(slide)
        ref && (ref.current = slide)
      }, [setSlide, ref])
    const isActive = useIsBuilt(slide)
    return <build-slide ref={setSlideAndRef} data-key={url} data-note={note}>
      <BuildContext.Provider value={slide}>{
        React.Children.map(children, child => child && React.cloneElement(child, {
          'data-is-active': isActive || undefined
        }))
      }</BuildContext.Provider>
    </build-slide>      
  }
)

export default Slide

export const note = Symbol('notes in markdown')
export const use = Symbol('children of the build-slide, including effects')

export const Slides = ({of, reduce=replace, children}) => {
  const states = useMemo(() => {
    const entries = Object.entries(of)
    return entries.reduce(
      (entries, [key, value]) => {
        const [_, lastState] = entries[entries.length - 1] || []
        return [...entries, [key, reduce(lastState, value, key)]]
      },
      []
    )
  }, [of, reduce])
  const initial = states[0]
  const [state, setState] = useState(initial)
  const currentState = useRef(initial)
  const raf = useRef()
  const rafState = useMemo(() => state => {
    currentState.current = state
    raf.current || (raf.current = requestAnimationFrame(
      () => {
        setState(currentState.current)
        raf.current = null
      }
    ))
  }, [setState])

  const [isActive, setIsActive] = useState()

  const onRootBuildIn = useMemo(() => () => { setIsActive(true); rafState(initial) },
    [setIsActive])
  const onRootBuildOut = useMemo(() => () => { setIsActive(false) },
    [setIsActive])

  return <React.Fragment>
    {React.cloneElement(children(state[1]), {'data-is-active': isActive || undefined})}
    <Slide url={initial[0]}
      note={initial[1][note]}
      onBuildIn={onRootBuildIn}
      onBuildOut={onRootBuildOut}>{
      states.slice(1).map(([key, state]) =>
        <Slide
          onBuildIn={() => rafState([key, state])}
          onBuildOut={() => rafState(initial)}
          key={key}
          url={key}
          note={state[note]}>{state[use] ? state[use] : null}</Slide>
      )
    }{initial[1][use] ? initial[1][use] : null}</Slide>
  </React.Fragment>
}

export const merge = (template={}) => {
  const reducers = Object.entries(template)  
  return (state, next) => {
    const mask = {}
    let i = reducers.length; while (i --> 0) {
      const [key, reducer] = reducers[i]
      mask[key] = reducer(state && state[key], next && next[key])
    }
    return Object.assign({}, state, next, mask)
  } 
}

export const append = (state=[], next) => [...state, next]
export const replace = (_, next) => next

export const BuildIn = ({children}) => {
  useBuildIn(children)
  return null
}

export const BuildOut = ({children}) => {
  useBuildOut(children)
  return null
}