import React, {createContext, useContext, useState, useEffect} from 'react'

const BuildContext = createContext()

export const useBuildIn = effect => {
  const element = useContext(BuildContext)
  console.log('in usebuildin, element=', element)
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

export default ({url, children}) => {
  const [slide, setSlide] = useState()
  return <build-slide ref={setSlide} data-key={url}>
    <BuildContext.Provider value={slide}>{
      children
    }</BuildContext.Provider>
  </build-slide>
}
