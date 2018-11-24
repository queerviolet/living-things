import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import './type-writer'

import Player from './player'
import Intro from './intro'
import TenThousandYears from './ten-thousand'
import Dreamtime from './dreamtime'
import Entropy from './entropy'
import Markers from './markers'

render(
  <Player>
    <Intro />
    <TenThousandYears />
    <Dreamtime />
    {/* <Entropy /> */}
    <Markers />
  </Player>
, main)

const floater = (name='float1', yBias=-1) => () => {
  const rotation = (Math.PI / 10) * Math.random() - (Math.PI / 5)
  const x = 30 * Math.random(), y = yBias * 30 * Math.random()
  yBias = -yBias
  document.body.style.setProperty(`--${name}-rotation`, rotation)
  document.body.style.setProperty(`--${name}-x`, x)
  document.body.style.setProperty(`--${name}-y`, y)
}
setInterval(floater('float1'), 3000)
setInterval(floater('float2', 1), 3000)

