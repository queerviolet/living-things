import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import './type-writer'

import Player from './player'
import Intro from './intro'
import TenThousandYears from './ten-thousand'

render(
  <Player>
    <Intro />
    <TenThousandYears />
  </Player>
, main)
