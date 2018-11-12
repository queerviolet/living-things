import React from 'react'
import {render} from 'react-dom'

import Slide, {Slides, note, merge, append} from './slide'
import Player from './player'

import {MorphPath} from './greensock'
import MorphSVG from './morph-svg'

import ml from 'manyline'

import circle from './circle'
import hippo from './hippo'
import elephant from './elephant'
import star from './star'
import heart from './heart'
import tree from './tree'

import spring0 from './spring0.svg'
import spring1 from './spring1.svg'

import './type-writer'
render(
  <Player>
    <Slides of={['', 'hello', 'world']}>{txt =>
      <div className='fade'>
        <type-writer className='typewriter' text={txt} />
      </div>
    }</Slides>
    <Slides of={[spring0, spring1]}>{src =>
      <MorphSVG src={src} />
    }</Slides>
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
      ({ path, text }) =>
        <svg className="fade" x="0px" y="0px" viewBox="0 0 3840 2160"> 
          <rect width="100%" height="100%" fill="red"/>        
          <MorphPath className="st2" style={{fill: path === circle ? 'red' : 'blue'}} d={path} />          
        </svg>
    }</Slides>
</Player>
, main)