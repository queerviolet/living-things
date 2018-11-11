import React from 'react'
import {render} from 'react-dom'

import Slide, {Slides, note, merge, append} from './slide'
import Player from './player'

import {MorphPath} from './greensock'

import ml from 'manyline'

import circle from './circle'
import hippo from './hippo'
import elephant from './elephant'
import star from './star'
import heart from './heart'
import tree from './tree'

render(
  <Player>
    <Slides reduce={merge({text: append})} of={{
      circle: {
        path: circle,
        text: ['thing'],
        [note]: ml `Here's a circle, isn't it great?` .end
      },
      hippo: {
        text: 'boo',
        path: hippo
      },
      elephant: {
        text: 'elephantey',
        path: elephant
      },
      star: { path: star },
      heart: { path: heart },
      tree: { path: tree },
    }}>{
      ({ path, text }) => <div>
        <svg x="0px" y="0px" viewBox="0 0 3840 2160"> 
          <MorphPath className="st2" style={{fill: path === circle ? 'red' : 'blue'}} d={path} />          
        </svg>
        <ul>{
          text.map(t => <li>{t}</li>)
        }</ul>
      </div>
    }</Slides>
</Player>
, main)