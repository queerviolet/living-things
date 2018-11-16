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
    <Entropy />
    <Markers />
  </Player>
, main)
