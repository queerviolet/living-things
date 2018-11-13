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

import grandPartition from './grand-partition.svg'

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
      },
      in_retrospect: {
        [note]: `In retrospect, those journalists, those researchers,
        everyone concerned, perhaps even alarmed about how we would
        be able to trust anything in a world with amplification and
        no accountability? They had a really solid point. Just...very solid.
        Good job, Cassandra. We probably should have listened.

        Yeah. But we didn’t.
        
        And now, we’re all... completely fucked.`,
        bgClass: 'black',
      },
      this_last_week: {
        [note]: `Just in this last week, California is on fire again, the worst
        fires in the recorded history of the state. Seems to be rather hot and dry
        there, for some reason.
        
        Israeli forces are bombing Gaza again, the worst violence there since 2014.

        And of course, mass shootings, always popular in the U.S., are now basically
        happening every day.
        
        Those were fill-in-the-blank traumas, by the way. I knew when I wrote
        this talk that three terrible things would have happened in the week
        before I gave it, and so I just left some space for fresh horrors.`,
        bgClass: 'black',
      },
      on_twitter: {
        [note]: `Which of course, I found out about on Twitter, so I’m only
        kindof sure they happened.

        What’s the saying? Falsehood flies, truth comes limping after. It
        makes sense, really, even in the maths.`, 
        bgClass: 'black',
      },
      hundred_forty_chars: {
        [note]: `Say you have a string that’s, I dunno, 140 characters long.
        Ignoring as we do capitalization and punctuation, there are 10^200
        possible arrangements of twenty-seven symbols—26 letters, one space—within
        140 characters.`,
        bgClass: 'black',
      },
      far_larger: {
        [note]: `That’s far, far larger than the number of atoms in the
        universe. Most of those strings are gibberish, of course.`,
        bgClass: 'black',
      },
      english_words: {
        [note]: `But within that vast sea of gibberish are strings made of English words.`,
        bgClass: 'black',
      },
      sentences: {
        [note]: `Within that set are sentences, and finally within *that*`,
        bgClass: 'black',
      },
      sentences: {
        [note]: `are sentences that are actually true.`,
        bgClass: 'black',
      },
      infinitesimal: {
        [note]: `How were infinitesimal grains of truth ever going to win
        when set against all the beaches of the world, covered
        in nonsense and lies? I don’t have a proof for this, but
        based on scale alone, I strongly suspect that finding
        truth is *extremely* NP-hard.
        
        It’s the kind of very hard problem where to even begin to attack
        it, you run a powerful learning system on dedicated hardware
        and train it over many years. In journalism school.

        It turns out there *was* some reason to get your narratives
        filtered after all, and it’s the same reason you get your
        cigarettes filtered, because otherwise all manner of crap
        gets in. Our bodies have whole networks of complex systems
        deciding what cells are a part of us and what cells aren’t.
        There’s a whole filtration system of tight junctions in the
        tiniest of our blood vessels keeping random crap out of our
        brain. These mechanisms have evolved over billions of years,
        a program running on the most powerful parallel computer on
        Earth—namely, the Earth.`,
      },
    }}>{
      ({bgClass='white', className, frame, duration=1, ease=Power3.easeInOut}) =>
        <div className={`${bgClass} slide`}>
          {frame && <Animation className={className} morph={{ease, duration}} srcs={frames} sec={1} frame={frame} />}
        </div>
    }</Slides>

    <Slides of={{
      on_words: {
        [note]: `Those processes don't work on words. Words are a much,
        much newer development. Living things have long been honing the ability to
        refine hypotheses about the world from data. That's not new. That's nearly
        definitional; it's why we have sensory organs.`
      },
      warm_beach: {
        [note]: `But symbolic manipulation—the ability to assign fragments
        of our cognitive processes to symbols? That does seem to be new.`,
        txt: 'A warm beach on a sunny day.'
      },
      quite_powerful: {
        [note]: `And the ability is quite powerful! It allows us to operate on
        the hypotheses using the the tools of physical manipulation.`,
        txt: 'A crackling campfire on an ice cold night.'
      },
      as_creators: {
        [note]: `As creators, and particularly as coders, I think we develop
        an intuitive grasp of this. All of us, I think, have physicalized inner
        worlds that represent the abstract things we work with every day.

        I see this, the triangle pops into my head`,
        txt: 'c² = a² + b²'
      },
      reducer: {
        [note]: `And this conjurs a machine, something almost like a ribosome
        walking along a chain of RNA, assembling the state of a protein from
        a sequence of instructions`,
        txt: `<S, A>(state: S, action: A) => S`
      },
      speculative_exec: {
        [note]: `This faculty is incredibly powerful. A kind of magic, operating
        on the space of cognitive experiences. We can conjure anything
        from breath.`,
        txt: 'A city grown from a tree'
      },
      bugs: {
        [note]: `Anything..`,
        txt: 'Bugs, bugs everywhere.'
      },
      parents_having_sex: {
        [note]: `Anything.`,
        txt: 'Your parents having sex.'
      },
      security_flaw: {
        [note]: `So, uh, there's a bit of a security flaw here. A couple of quirks.
        Language introduces a kind of speculative execution. We can process
        linguistic input incredibly fast, but in order to do that, we have
        to execute it.`,
      },
      structure: {
        [note]: `In part, this is because there are sentences that cannot
        be parsed without an understanding of their meaning. We have to load
        the semantics in order to generate a correct parse tree.`,
        txt: '“I see,” said the blind man as he picked up the hammer and saw.'
      },
      sandboxing: {
        [note]: `Language is such a fundamental part of our experience that
        I think it's difficult to imagine how it might feel different if it
        were implemented differently. In this case, I think it's relatively
        accessible, if you imagine looking at a foreign language that you
        kindof know.`
      },
    }}>{
      ({txt}) =>
        <div className='white slide'>
          <type-writer text={txt || ''} />
        </div>
    }</Slides>
    <Slide
      url='partition'
      note={
        `So, here's a foreign language that I kindof know. When I look
        at this, I do not immediately understand it. But I *could*.`
      }>
      <div className='white slide'>
        <img style={{transform: `scale(3)`}} src={grandPartition} />
      </div>
    </Slide>
    <Slides of={{
      run: {
        [note]: `But there are also performance considerations. Sandboxing
        language would decrease its performance, just as properly-isolated
        processes and virtual machines introduce a drop in performance.`
      }      
    }}>{
      ({txt}) =>
        <div className='white slide'>
          <type-writer text={txt || ''} />
        </div>
    }</Slides>
</Player>
, main)
        
        
// We have
// different mechanisms for that. They’re newer, less tested.
// Our whole frontal cortex? It’s still in beta. It’s got some
// bugs. And there are some security vulnerabilities that have
// yet to be addressed.`,
