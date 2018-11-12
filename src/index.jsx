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
    <Slides
      of={{
        intro: {
          txt: '',
          [note]: `
          When the organizers asked me to do this talk, they said,
          "We’d really like an inspirational talk about your vision!"

          And, let me tell you, that is *exactly* what every speaker
          wants to hear. Or, at least it's exactly what I want to hear.
          That is really an excellent pitch, and so I said I would love to.

          And they said they'd love to hear it, and I said I'd talk about
          life and living systems and it would be very inspirational and
          everyone was just thrilled.

          So then I sat down to write it.

          And, when I write, I try to just... let it flow.
          `
        },
        we_are_all: {
          txt: 'We are all',
          [note]: `And whatever comes out`
        },
        going: {
          txt: 'We are all going',
          [note]: `...comes...`
        },
        to_die: {
          txt: 'We are all going to die.',
          [note]: `...out
          
          huh.
          
          So it's true, which is on brand.

          But it's not really... I just think it's not quite the right direction.          
          `
        },
        do_better: {
          txt: '',
          [note]: `We can do better, certainly.`,
        },
        you: {txt: 'You'},
        you_and_everyone: {txt: 'You and everyone you love'},
        you_die: {
          txt: 'You and everyone you love are going to die.',
          [note]: `Well, see, now it's worse.

          Now it's threatening.

          I can't lead with that. I'm from the US. Everyone already thinks we're
          violent.`          
        },
      }}    
    >{({ txt }) =>
      <div className='white slide'>
        <type-writer className='typewriter' text={txt} />
      </div>
    }</Slides>
    <Slides of={[spring0, spring1]}>{src =>
      <div className='slide'>
        <MorphSVG className='slide' src={src} />
      </div>
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
        <svg className="slide" x="0px" y="0px" viewBox="0 0 3840 2160"> 
          <rect width="100%" height="100%" fill="red"/>        
          <MorphPath className="st2" style={{fill: path === circle ? 'red' : 'blue'}} d={path} />          
        </svg>
    }</Slides>
</Player>
, main)