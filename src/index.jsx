import React from 'react'
import {render} from 'react-dom'

import Slide, {Slides, note, merge, append} from './slide'
import Player from './player'

import {MorphPath} from './greensock'
import {Animation, MorphSVG, loadAnimation} from './morph-svg'

import circle from './circle'
import hippo from './hippo'
import elephant from './elephant'
import star from './star'
import heart from './heart'
import tree from './tree'

import spring0 from './spring0.svg'
import spring1 from './spring1.svg'
import news0 from './news0.svg'
import news1 from './news1.svg'
import distributed from './distributed.svg'
import networked from './networked.svg'
import sociallyNetworked from './socially-networked.svg'
const frames = {news0, news1, distributed, networked, sociallyNetworked}

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
          
          I think we can do better.
          `
        },
        do_better: {
          txt: '',
          [note]: `Let's revise...`,
        },
        you: {
          txt: 'You',
        },
        you_and_everyone: {txt: 'You and everyone you love'},
        you_die: {
          txt: 'You and everyone you love are going to die.',
          [note]: `Well, see, now it's worse.

          Now it's threatening.

          We can't have that.
          I can't lead with that. I'm from the US. Everyone already thinks we're
          violent.`     
        },
        the_problem: {
          txt: '',
          [note]: `I think the problem is that the world of now keeps bubbling out.

          And the world of now is... well, it's definitely going somewhere, you can
          say that much. Some very exciting things are happening. It feels like
          we're on the cusp of something, and that something might very well be
          The End.

          And that's quite stressful.

          So let's step away from the now, and go back.`
        }
      }}    
    >{({ txt }) =>
      <div className='slide'>
        <type-writer className='typewriter' text={txt} />
      </div>
    }</Slides>
    <Slides of={{
      remember: {
        [note]: `Remember ten years ago?`,
        frame: 'news0'
      },
      talking: {
        [note]: `We were create a new kind of media.`,
        frame: 'news1',
      },
      distributed: {
        [note]: `Distributed, disintermediated`,
        frame: 'distributed',
      },
      networked: {
        [note]: `networked`,
        frame: 'networked',
      },
      socially_networked: {
        [note]: `*socially* networked, made by us, consumed by us.
        Bloggers and tweeters sharing their worlds with each other.
        
        All of us creators, all of us consumers.

        No longer would we be beholden to newspapers, to reporters. No longer would
        we get our stories filtered through layers of intermediaries,
        each one spinning and slanting. No, we would just get the truth.
        The truth would win.`,
        frame: 'sociallyNetworked'
      },
    }}>{
      ({frame}) =>
        <div className='white slide'>
          {frame && <Animation srcs={frames} sec={1} frame={frame} />}
        </div>
    }</Slides>
</Player>
, main)
