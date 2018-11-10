import {useState, useEffect} from 'react'

const None = []
const Maybe = value => value === void 0
  ? None
  : value

export const useResource = (resource, params=None, override=void 0, [value, set]=useState(), dispose=disposeDisposable) => {
  useGuardedEffect((Resource, override, ...params) => {
    if (override !== None) return override
    // console.log('acquire', Resource, params)
    const v = new Resource(...params)
    // console.log(' => ', v)
    set(v)
    return () => dispose(v)
  }, [resource, Maybe(override), ...params])
  return value
}

export const useGuardedEffect = (effect, inputs=[]) =>
  useEffect(() => {
    if (inputs.indexOf(void 0) !== -1) return
    return effect(...inputs)
  }, inputs)

export const disposeDisposable = res => {
  if (!res || typeof res.dispose !== 'function') return
  // console.log('disposing', res)
  res.dispose()
}

const identity = _ => _
export const createPropertyHook = (property, convert=identity) => (object, props) =>
  useGuardedEffect((object, value) => object[property] = convert(value), [object, props[property]])
  