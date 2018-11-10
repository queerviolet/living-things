import {cloneElement} from 'react'

export const pipe = (first, ...rest) =>
  !first
    ? pipe(...rest)
    :
  !rest.length
    ? first
    :
  cloneElement(first, {}, pipe(...rest))
