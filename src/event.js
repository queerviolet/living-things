export default () => {
  const listeners = []
  const add = listener => {
    if (typeof listener !== 'function') return () => {}
    return () => listeners.splice(listeners.indexOf(listener), 1)
  }
  let currentEvent = null
  const fire = listener => listener(currentEvent)
  add.fire = event => {
    currentEvent = event
    listeners.forEach(fire)
    currentEvent = null
  }
  return add
}
