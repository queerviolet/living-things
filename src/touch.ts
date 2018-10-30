import {createStore, AnyAction, applyMiddleware} from 'redux'

const START = 'touch/START'
type START = 'touch/START'
const MOVE = 'touch/MOVE'
type MOVE = 'touch/MOVE'
const END = 'touch/END'
type END = 'touch/END'

const TOUCH_ACTION_TYPES: {[type: string]: string} = {
  [START]: START,
  [MOVE]: MOVE,
  [END]: END,
}

type TouchActionType = START | MOVE | END
interface TouchAction {
  type: TouchActionType
  event: TouchEvent
}

const isTouchAction = (action: AnyAction): action is TouchAction =>
  !!TOUCH_ACTION_TYPES[action.type]

interface GestureAction {
  type: ADD,
  id: string,
  gesture: Gesture  
}
const ADD = 'gesture/ADD'
type ADD = 'gesture/ADD'
const GESTURE_ACTION_TYPES: {[type: string]: string} = {
  [ADD]: ADD,
}

// function gestures(state={}, action: AnyAction): any {
//   if (!isTouchAction(action)) return state
//   const {event: {touches, changedTouches}} = action
//   return touchesById(touches)
//   switch(action.type) {
//   case START:
//     return {...state, ...touchesById(changedTouches) }
//   case MOVE:
//     return {...state, ...touchesById(changedTouches) }
//   case END:
//     return {...state, ...touchesById(changedTouches) }
//   }
// }

type Cell<T> = Iterator<Iterator<T>>

enum GestureStatus { Possible, Rejected, Accepting, Done };
interface GestureState {
  id: string
  status: GestureStatus
}
type Gesture<T extends GestureState> = (state: T, action: TouchAction) => T

const isGestureAction = (action: AnyAction): action is GestureAction =>
  !!GESTURE_ACTION_TYPES[action.type]

type RecognizerState = {
  gestures: { [id: string]: Gesture<GestureState> }
  active: GestureState | null 
  states: { [id: string]: GestureState }
}

const emptyRecognizerState: RecognizerState = { gestures: {}, active: null, states: {} }

const sendTouch: (recognizer: RecognizerState, gesture: GestureState, touch: TouchAction) => RecognizerState =
  (state: RecognizerState, gesture: GestureState, touch: TouchAction) => {
    const {gestures, active} = state
    const {id} = gesture
    const next = gestures[id](gesture, touch)
    switch (next.status) {
    case GestureStatus.Accepting:
      return {...state, active: next}
    case GestureStatus.Possible:
      return {...state, possible: {[id]: next}}
    case GestureStatus.Rejected:
      return {
        ...state
        , active:
            active && active.id === gesture.id
              ? null
              : active
        , rejected: {[id]: next}
      }
    case GestureStatus.Done:
      return {
        ...state
        , active:
            active && active.id === gesture.id
              ? null
              : active
        , done: {[id]: next}
      }
    }
    return state
  }

const gestures = (state: RecognizerState = emptyRecognizerState, action: AnyAction) => {
  if (isGestureAction(action)) return {
    ...state,
    gestures: {
      ...state.gestures,
      [action.id]: action.gesture
    }
  }

  if (!isTouchAction(action)) return state

  const {gestures, active, states} = state
  const ids = Object.keys(states);
  let i = ids.length; while (i --> 0) {
    const state = states[id]
    const next = gestures[id](state, action)
    switch (next.status) {
      case GestureStatus.Accepting:
    }
  }

  // const {gestures, active} = state
  // const ids = Object.keys(active)
  // const nextActive = {}
  // let i = ids.length; while (i --> 0) {
  //   const id = ids[i]
  //   const gesture = gestures[id]
  //   const state = active[id]
  //   const next = gesture(state, action)
  //   switch (next.status) {
  //   case Accepting:
  //     nextActive[id] = next
  //   }
  // }
}


interface TouchData {
  touchType: TouchType
  x: number
  y: number
  azimuthAngle: number
  altitudeAngle: number
  rotationAngle: number
  force: number
}

const touchesById = (list: TouchList): {[id: number]: TouchData} => {
  const out: any = {}
  let i = list.length; while (i --> 0) {
    const t = list.item(i)!
    const {
      touchType,
      clientX: x, clientY: y,      
      azimuthAngle, altitudeAngle, rotationAngle,
      force,
    } = t
    out[t.identifier] = {
      touchType,      
      x, y,
      azimuthAngle, altitudeAngle,
      rotationAngle, force
    }
  }
  return out
}

const touchDebugger = () => {
  const log = document.createElement('pre')
  log.id = 'debugTouches'
  document.body.appendChild(log)
  return () => {    
    const state = store.getState()
    console.log(state)
    log.textContent = JSON.stringify(state, null, 2)
  }
}

const dispatchTouch = (type: TouchActionType) => (event: TouchEvent) =>
  store.dispatch({type, event})

const listeners = {
  touchstart: dispatchTouch(START),
  touchmove: dispatchTouch(MOVE),
  touchend: dispatchTouch(END),
}

const store = createStore(gestures, applyMiddleware(
  _store => next => action => {
    console.log(JSON.stringify(action))
    return next(action)
  }
))

const unsubscribeDebug = store.subscribe(touchDebugger())

Object.entries(listeners)
  .forEach(([type, listener]) =>
    addEventListener(type, listener as any as EventListener))

;(module as any).hot.dispose(() => {
  unsubscribeDebug()
  Object.entries(listeners)
    .forEach(([type, listener]) =>
      removeEventListener(type, listener as any as EventListener))
})
