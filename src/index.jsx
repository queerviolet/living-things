import React from 'react'
import {render} from 'react-dom'

import Slide, {Slides} from './slide'
import Player from './player'

import {MorphPath} from './greensock'

import circle from './circle'
import hippo from './hippo'
import elephant from './elephant'
import star from './star'
import heart from './heart'
import tree from './tree'

render(
  <Player>
    <Slides of={{
      circle, hippo, elephant, star, heart, tree
    }}>{
      path =>
        <svg x="0px" y="0px" viewBox="0 0 3840 2160"> 
          <MorphPath className="st2" style={{fill: path === circle ? 'red' : 'blue'}} d={path} />
        </svg>
    }</Slides>
</Player>
, main)