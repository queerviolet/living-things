import React from 'react'
import {render} from 'react-dom'

import Slide, {Slides} from './slide'
import Player from './player'

import {MorphPath} from './greensock'

import circle from './circle'
import hippo from './hippo'
import elephant from './elephant'
import star from './star'

render(
  <Player>
    <Slides of={{
      circle, hippo, elephant, star
    }}>{
      path =>
        <svg x="0px" y="0px" viewBox="9 80 800 400"
          style={{enableBackground: 'new 9 80 800 400'}}>
          <MorphPath className="st2" d={path} />
        </svg>
    }</Slides>
</Player>
, main)