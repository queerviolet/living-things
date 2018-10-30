import { TypedArray } from "three";

export interface StrokeOptions<S> {
  source?: GlobalEventHandlers
  samples?: number
  onStart?: (stroke: S & Identified) => void
  onUpdate?: (stroke: S & Identified) => void
  onEnd?: (stroke: S & Identified) => void
}

export type Identified = { identifier: string }

interface Encoder<T> {
  create(samples: number): T
  append(state: T, touch: Touch): void
}

interface Samples {
  array: TypedArray
  sampleSize: number
  end: number
}

interface TypedArrayConstructor {
  new(count: number): TypedArray
}

type Extractor = (touch: Touch) => number[]

const encodeVec: (sampleSize: number) => (extract: Extractor, T?: TypedArrayConstructor) => Encoder<Samples> =
  (sampleSize: number) => (extract: Extractor, T=Float32Array) => {
    return {create, append}

    function create(samples: number) {
      return {
        array: new T(samples * sampleSize) as TypedArray,
        sampleSize,
        end: 0,
      }
    }

    function append(samples: Samples, touch: Touch) {
      let {end, array} = samples
      if (end >= array.length - sampleSize) {
        console.log('resizing', end, array.length, sampleSize);
        const newArray = new T(array.length * 2)
        console.log(newArray);
        newArray.set(array, 0)
        samples.array = newArray
        array = newArray
      }      
      const data = extract(touch)
      // console.log(array, data, end);
      array.set(data, end)
      samples.end = end + data.length
    }
  }

export const position = encodeVec(3) (touch => [touch.pageX, touch.pageY, 0])

type StrokeAttributes<S> = {
  [A in keyof S]: Encoder<S[A]>
}

const None = () => {};

export const Stroke = <S>(attributes: StrokeAttributes<S>, opts: StrokeOptions<S> = {}) => {
  const {source=window} = opts
  source.addEventListener('touchstart', start)
  source.addEventListener('touchmove', move)
  source.addEventListener('touchend', end)

  const strokes: {[id: string]: S & Identified} = {}

  const attrKeys = Object.keys(attributes)

  const {onStart=None, onUpdate=None, onEnd=None} = opts

  function start(event: TouchEvent) {
    let i = event.changedTouches.length; while (i --> 0) {
      const touch = event.changedTouches.item(i)!
      const stroke: any = {}
      let a = attrKeys.length; while (a --> 0) {
        const attr = attrKeys[a] as keyof S
        const encoder = attributes[attr]
        stroke[attr] = encoder.create(opts.samples || 1024)
        encoder.append(stroke[attr], touch)
      }
      stroke.identifier = touch.identifier
      strokes[touch.identifier] = stroke
      onStart(stroke);
    }
  }

  function move(event: TouchEvent) {
    let i = event.changedTouches.length; while (i --> 0) {
      const touch = event.changedTouches.item(i)!
      const stroke = strokes[touch.identifier]
      if (!stroke) continue
      let a = attrKeys.length; while (a --> 0) {
        const attr = attrKeys[a] as keyof S
        const encoder = attributes[attr]
        encoder.append(stroke[attr], touch)
      }
      onUpdate(stroke);
    }
  }

  function end(event: TouchEvent) {
    let i = event.changedTouches.length; while (i --> 0) {
      const touch = event.changedTouches.item(i)!
      const stroke = strokes[touch.identifier]
      if (!stroke) continue
      let a = attrKeys.length; while (a --> 0) {
        const attr = attrKeys[a] as keyof S
        const encoder = attributes[attr]
        encoder.append(stroke[attr], touch)
      }
      delete strokes[touch.identifier]
      onEnd(stroke);
    }
  }
}

export type Stylus = {
  position: Samples
}

export default (opts: StrokeOptions<Stylus> = {}) => Stroke<Stylus>({position}, opts)