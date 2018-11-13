import React from 'react'
import 'babel-polyfill'
import {render} from 'react-dom'

import './type-writer'

import Slide, {Slides, note, merge, append} from './slide'
import Player from './player'

import {Animation} from './morph-svg'

import { Linear, Power3 } from 'gsap/TweenLite';
import { Elastic, Back } from 'gsap/TweenMax';
import news0 from './news0.svg'
import news1 from './news1.svg'
import distributed from './distributed.svg'
import networked from './networked.svg'
import sociallyNetworked from './socially-networked.svg'
import spring0 from './spring0.svg'
import spring1 from './spring1.svg'
import springCatalyzed from './spring-catalyzed.svg'
import obamas from './obamas.svg'
import fist from './fist.svg'
import fist2 from './fist2.svg'
import anonymous from './anonymous.svg'
import kekistan from './kekistan.svg'
import eye0 from './eye0.svg'
import eye1 from './eye1.svg'
import eyeTeeth from './eye-teeth.svg'
import eyeTeethShut from './eye-teeth-shut.svg'

const frames = {
  news0,
  news1,
  distributed,
  networked,
  sociallyNetworked,
  spring0,
  spring1,  
  springCatalyzed,
  obamas,
  fist,
  fist2,
  anonymous: {ungrouped: anonymous},
  kekistan: {ungrouped: kekistan},
  eye0,
  eye1,
  eyeTeeth,
  eyeTeethShut
}

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
          [note]: `I think the problem here—apart from the inevitable mortality
          of every living thing—is that the world of now keeps bubbling out.

          And the world of now is... well, it's definitely going somewhere, you can
          say that much. Some very exciting things are happening. It feels like
          we're really on the cusp of something. But it's not really clear what.
          Or if we're going to like it. Kindof seems like we might not like it,
          actually.

          And that's quite stressful.

          So let's step away from all that. And go back.`
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
        The truth would win.
        
        Even at the time, there were people—journalists, primarily—saying,
        okay, well, how? How, exactly? How do you know people are who they
        say they are? How can you trust these faceless barely-people,
        veiled by layers of cable and protocol?

        And our response—my response, certainly, the one I said on the
        inside—was that it’ll... work out... somehow. Something something
        web of trust. Wisdom of crowds. 
        `,
        frame: 'sociallyNetworked'
      },
      look: {
        [note]: `Look:`,
        frame: 'spring0'
      },
      arab_spring: {
        [note]: `This is the time of the Arab Spring!`,
        frame: 'spring1',
        duration: 2,
      },
      catalyzed: {
        [note]: `Of social media catalyzed revolutions!`,
        frame: 'springCatalyzed',
        ease: Elastic.easeOut,
      },
      obamas: {
        [note]: `Barack Hussein Obama has just been elected because of us.
        Global warming: definitely happening, very bad,
        but we’re *going to fix it*. See, we are powerful.`,
        frame: 'obamas'
      },
      a_new_culture: {
        [note]: `We have been weaving ourselves a new culture.
        Connecting ourselves in a new way.`,
        frame: 'fist',
      },
      without_nations_and_borders: {
        [note]: `Richer. More direct.
        Organic. We are becoming something, all of us together
        becoming something greater than any of us. It seemed,
        then, that we were struck by lightning, and far from
        killing us, it gave us life, and our mycelium was bearing fruit.
        
        This is why we built everything. Remember that feeling?
        The promise of the Internet, of cyberspace, this new kind
        of a place without nations and borders, a place where
        authoritarians fear to tread.`,
        frame: 'fist2',
        duration: 30,
        ease: Linear.easeNone,
      },
      punch_only_masks: {
        [note]: `A place where their iron fists can punch only masks;
        where their walls cannot be built because the network perceives
        their censorship as damage and routes around it. Where we rely
        on each other. On consensus. On the wisdom of the mob.
        A place where every story can be told, true or not.`,
        frame: 'anonymous',
        bgClass: 'transition-bg-30 black',
        // className: 'zoom-30',
        duration: 10,
        ease: Linear.easeNone,
      },
      racism: {
        [note]: `A place where
        your footprints can follow you forever. A place where you can
        be yourself and so can anyone else; a place where everyone can
        find their people and dance in 14/88 time;`,
        duration: 30,
        frame: 'kekistan',
        bgClass: 'black',
      },
      new_minds: {
        [note]: `a place where new minds
        are growing, and they’re sprouting eyes everywhere, and their
        hands are everywhere, and they are learning from us how to be
        human and so far they can reliably emulate three things:`,
        duration: 5,
        frame: 'eye0',
        bgClass: 'black',
      },
      how_to_see: {
        [note]: `how to see`,
        frame: 'eye1',
        bgClass: 'black',
        duration: 0.5,
      },
      how_to_want: {
        [note]: `how to want`,
        frame: 'eyeTeeth',
        bgClass: 'black',
        duration: 0.5,
      },
      how_to_lie: {
        [note]: 'and how to lie.',
        frame: 'eyeTeethShut',
        bgClass: 'black',
        duration: 0.5,
        ease: Back.easeIn.config(2),
        className: 'zoom-5 fade-out-5',
      }
    }}>{
      ({bgClass='white', className, frame, duration=1, ease=Power3.easeInOut}) =>
        <div className={`${bgClass} slide`}>
          {frame && <Animation className={className} morph={{ease, duration}} srcs={frames} sec={1} frame={frame} />}
        </div>
    }</Slides>
</Player>
, main)
