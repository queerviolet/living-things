import React, {useRef, useState} from 'react'
import Projector from './projector'
import Slide, {Slides} from './slide'

import {Animation} from './morph-svg'

import title from './markers/title.png'
import hole from './markers/black-hole-1.png'
import hole2 from './markers/black-hole-2.png'
import rubble from './markers/rubble-landscape-1.png'
import rubble2 from './markers/rubble-landscape-2.png'
import menacing from './markers/menacing-earthworks.png'
import forbidding from './markers/forbidding-blocks.png'
import thorns from './markers/thorns-1.png'
import thorns2 from './markers/thorns-2.png'
import spikes from './markers/spikes-1.png'
import spikes2 from './markers/spikes-2.png'
import final from './markers/final.png'

import ending0 from './ending/*.svg'
ending0['11-wasteland'] = {ungrouped: ending0['11-wasteland']}
import seed from './ending/seed/*.svg'
import titleCard from './title.svg'
const ending = Object.assign({}, ending0, seed, {titleCard})

import {every, after, sec} from './anim'
const loop = (...frames) => every(0.7[sec], i =>
  frames[i % frames.length])
const liquid = loop('05-liquid0', '06-liquid1')
const light = loop('09-light0', '10-light1')

const play = (frames, rate=1[sec]) =>
  every(rate, i => frames[Math.min(i, frames.length - 1)])
const plant = play([0, 1, 2, 3, 4].map(i => `seed0${i}`))

const closingFrames = ['seed05', 'seed06', 'seed07', 'seed08', 'seed09',
'seed10', 'seed10a']
// const closingDwell = ['seed10', 'seed10a', 'seed10b']
// const tap = x => (console.log(x), x)
const closingFrameSec = 3
// const closing = every(closingFrameSec[sec], i => tap(
//   i < closingFrames.length
//     ? closingFrames[i]
//     :
//   i === closingFrames.length
//     ? closingFrames[closingFrames.length - 1]
//     :
//     closingDwell
// ))
const closing = play(closingFrames, closingFrameSec[sec])
const growUp = after(1[sec], '03-tree01', '04-tree012')

import {Power3, SteppedEase} from 'gsap/TweenMax'
import {TweenLite} from 'gsap/TweenLite'

export default () => {
const fx = useRef({
  flicker: 5,
  sepia: 5,
  saturate: 75,
  vignette: 1,
  background: 'black',
})
const change = (build, {index}) => {
  plant.state = null
  growUp.state = null
  closing.state = null
  if (index >= 23) {
    TweenLite.to(fx.current, 3, {flicker: 0, sepia: 0, saturate: 100, background: 'white', vignette: 0})
  } else {
    TweenLite.to(fx.current, 3, {flicker: 5, sepia: 5, saturate: 75, background: 'black', vignette: 1})
  }
}

return <Projector className='floatey' onChange={change} fx={fx.current} overlay={
  ({frame, duration=0.8, ease=SteppedEase.config(20)}) =>
    <Animation srcs={ending} frame={frame} morph={{ duration, ease }} />
}>
  <Slide url='markers' note='The WIPP Marker committee made a number of suggestions'>
    <img src={title} />
  </Slide>
  <Slide url='black_hole_1' note={`“Black Hole”: A giant black slab, baking in the desert sun.`}>
    <img src={hole} />
  </Slide>
  <Slide url='black_hole_2'
    note={`An immense nothing; a void; land removed from use
          with nothing left behind.`}>
    <img src={hole2} />
  </Slide>
  <Slide url='rubble_landscape_1'
    note={`A landscape of rubble`}>
    <img src={rubble} />
  </Slide>
  <Slide url='rubble_landscape_2'
    note={`Places that feel destroyed, rather than made`}>
    <img src={rubble2} />
  </Slide>
  <Slide url='menacing_earthworks'
    note={`Earthworks signifying danger`}>
    <img src={menacing} />
  </Slide>
  <Slide url='forbidding_blocks'
    note={`Places designed to pluck at threads deep within us`}>
    <img src={forbidding} />
  </Slide>
  <Slide url='thorns_1'
    note={`Designed to frighten us animalistically`}>
    <img src={thorns} />
  </Slide>
  <Slide url='thorns_2'
    note={`Suggesting something rising from below`}>
    <img src={thorns2} />
  </Slide>
  <Slide url='spikes_1'
    note={`Something that wishes`}>
    <img src={spikes} />
  </Slide>
  <Slide url='spikes_2'
    note={`us harm`}>
    <img src={spikes2} />
  </Slide>
  <Slide url='final'
    note={`The final design has elements of these,
    though it’s rather less exotic than any of them.

    Granite pillars, 7 meters tall, etched with messages of warning.
    
    An earthen berm, 10 meters tall and 30 meters wide,
    looping all the way around, marking the center

    Ceramic and metal discs will be buried throughout the site, with
    instructions to future peoples who are digging in the earth. The message is:
    stop.

    And in the center of it all: a roofless room, with information
    and warning signs in six languages, and instructions to copy
    them into a more modern language when they become difficult
    to read. A physical living story.`}>
    <img src={final} style={{ transform: 'scale(0.6)' }}/>
  </Slide>
  <Slide url='death'
    note={`I’ve talked about death quite a lot for an inspirational talk.
    My intention isn’t to shock or scare you.`}
    frame='00-tombstone' duration={0} />
  <Slide url='after'
    note={`It’s to draw attention to what comes after. To the eons ahead of us.
    
    When whales die, their bodies bloom. In death, they give rise
    to entire ecosystems. They become another kind of living thing.
    `}
    frame='01-after' transition='none' />
  <Slide url='another-living-thing'
    note={`Our bodies too will do this, but it’s not our bodies I’m most
    concerned about.`} frame='02-tree0' transition='none' />  
  <Slide url='ecosystem'
    note={`As technologists, the things we work with are often intangible. But
    we mustn’t mistake that intangibility for ephemerality. The spells we
    cast are bringing countless real creatures into the world. Things not
    biological, but nevertheless living. The things we make fit become part
    of a system that includes us, and our thoughts, and our gods, and every
    living thing.
    
    I think it’s very likely that we will be here in ten thousand years.

    But I want us to do more than survive.

    I want us to thrive.

    So there are some things I need you to do.`}
    frame={growUp} transition='none' />
  <Slide url='liquid'
    note={`I need you to know in your heart and bones that we are liquid.

    We flow downhill along the path of least resistance; we conform to the
    containers we are in.
    
    Believing we are good people does not change our incentives.
    Sincerely wanting to be good people does not change the landscape.
    There are no good people; there are no bad people. Intrinsic
    character is one of those lies we tell so we can feel good about
    ourselves. Mostly, we do what's gotten us fed. We do what's gotten
    us love. We do what the people around us have been doing.
    
    I need you to ask what mountains you are flowing down and what containers
    you are in and what gods you serve, and if you are proud of the answers.
    And if not, how you can you change your context?
    `} frame={liquid} transition='none' />
  <Slide url='board_of_social_engineering'
    note={`Appled systemically, this means we can’t keep imagining that toothless
    statements of corporate ethics will help anything—they haven’t,
    and there is no reason to suspect they will. We all have personal
    incentives, but money is a universal one
    
    We are creating systems that can remake the informational pathways
    of our society. This is incredible power. I think it’s something
    that we must do to become whatever it is we’re going to become.
    But it is an experiment. We are, all of us, experimental subjects.
    
    We need to measure, understand, and control the impacts of this
    experimentation
    
    We need a Board of Social Engineering. And we need
    a less ominous name for the organization than the Board of Social
    Engineering. We'll workshop that part.
    
    The organization must have teeth, resources, and independence. It
    must be incentivized to consider the impacts of our experimentation
    on the epistemic fabric of us all.`} frame='07-bse' transition='none' />
  <Slide url='small'
    note={`I need you to be small. I need you to recognize that your
    experiences, as rich as they are, are only a tiny sliver of the
    experiences of people, and an even tinier sliver of the experiences
    of life. We are each motes of dust on the back of something enormous,
    and every person and every forest has something to teach us. I need
    you to be constantly curious about what that is.`}
    frame='08-small' transition='none'
    />
  <Slide url='light'
    note={`I need you to see the light at the end of ten thousand year
    tunnel. I need you to do this because sometimes I can’t, and I will
    need you to remind me.
    
    I need you to do this because there are many futures ahead of us.`}
    frame={light} transition='none'
    />
  <Slide url='wasteland'
    note={`Perhaps we will create a wasteland, where the seas are acid,
    and where radioactive waste buried 600 meters underground is the
    least of our problems.`}
    frame='11-wasteland' transition='none'
    />
  <Slide url='prison'
    note={`Perhaps we will create a mechanized prison, each cell sized to fit,
    every resource extracted, every whisper observed, every action modeled,
    planned, and optimized.`}
    frame='12-prison' transition='none'
    />
  <Slide url='seeds'
    note={`Or, perhaps we will build seeds`}
    frame='seed00' transition='none'/>
  <Slide url='plant_them'
    frame={plant}
    duration={1}
    ease={Linear.easeNone}
    note={`and plant them in the sea`} transition='none' />
  <Slide url='roots'
    frame={closing}
    duration={closingFrameSec}
    note={`They will send roots deep into the earth, and grow into enormous
    mangroves above the water. Whole cities will grow along their branches,
    from their canopies, banyan shoots will rise up into space.

    And when we climb them, if we find that we are not alone, how will we
    introduce ourselves to the creatures out there? By name? By nation?
    By species?
    
    Or will we remember—I need you to remember—that we are the sea,
    a creature of many skins and many feathers and twelve trillion eyes,
    who so wanted to touch the stars that we became all life
    so we might someday meet them.`}
    transition='none'
    ease={Linear.easeNone}
    />
  <Slide url='end'
    frame='seed11'
    duration={3}
    ease={Power3.easeInOut}
    transition='none'
    note={`Thank you.`} />
  <Slide url='end_card'
    frame='titleCard'
    duration={3}
    ease={Power3.easeInOut}
    transition='none'
    note={`I'm ashi, and this has been Living Things.`} />
</Projector>
}