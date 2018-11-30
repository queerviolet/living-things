import React, {useRef, useEffect, useState} from 'react'

import Slide, {BuildIn, BuildOut} from './slide'
import {MorphPath} from './greensock'

import Anim from './anim'

import {Projector} from './projector'

import desertNight from './new-mexico-night-sky.mp4'
import safety from './wipp-safety.jpg'
import barrels from './wipp-barrels.jpg'
import cavern from './wipp-cavern.jpg'
import wipp from './wipp.jpg'
import warning from './warning.gif'
import dangerPoison from './danger-poison.png'
import pyramid from './pyramid-message.png'
import calendar from './calendar-clip.jpg'

// Conversion to years
const year = y => y
const month = m => day(m * 30)
const day = d => d / 365
const hour = h => day(h / 24)
const min = m => hour(m/60)

const PRESENTATION_LENGTH = min(40)
const timeline = {
  presentation: {
    width: PRESENTATION_LENGTH,
    start: -PRESENTATION_LENGTH / 2,
    win: hour(1),
    label: <Anim>{t => `now: ${new Date().toString()}`}</Anim>,
    note: 'Well, this presentation is 40 minutes. We’re about 15 minutes in.',
    content:
      <React.Fragment>
        <h1>This presentation: 40 minutes</h1>
        <h1>Now: <Anim>{t => new Date().toString()}</Anim></h1>
      </React.Fragment>
  },
  conference: {
    width: day(2),
    start: -day(1),
    win: day(4),
    label: '✈️ codemotion',
    note: 'This conference has lasted for one day. In about a day, many of you will fly home.',
    content: <h1>This conference: 2 days</h1>
  },
  winter: {
    width: month(6),
    start: 0,
    win: year(1),    
    label: '❄️...🌷 winter',
    note: `We’re on the cusp of winter here in the northern hemisphere. In six months,
    rains will fall, flowers will bloom.`
  },
  phone: {
    width: 2,
    start: -1,
    win: 5,
    label: '📱 your phone',
    note: `Our phones last a couple of years, so if you got a phone last year,
    you’ll probably get one in a year.`
  },
  fido: {
    width: 14,
    start: -1,
    win: 20,
    label: '🐶 fido',
    note: `If you got a dog last year, fido will last about thirteen more years.`,
  },
  fluffy: {
    width: 20,
    start: -1,
    win: 25,
    label: '😺 fluffy',
    note: `Fluffy maybe makes it nineteen.`,
  },
  carrots: {
    width: 10,
    start: -1,
    win: 25,
    label: '🐰 carrots',
    note: `Carrots the rabbit will probably be with you for about ten years.`,
  },
  horses: {
    width: 30,
    start: -1,
    win: 40,
    label: '🐴 sea biscuit',
    note: `Horses live about 30 years.`,
  },
  parrot: {
    label: 'you & polly',
    width: 80,
    start: -30,
    win: 100,
    note: `And if you got a parrot on the day you were born, she’ll likely be
    with you your entire life.

    One lifetime. Okay, let’s keep going.`
  },
  modern_building: {
    width: 60,
    label: '🏢 shiny building',
    win: 100,
    note: `If we built a sleek, modern, glass-curtain building and put a
    big KEEP OUT sign inside, that structure would, with regular maintenance,
    last about 60 years.`
  },
  masonry_and_lumber: {
    width: 120,
    start: 0,
    label: '🏫 classic building',
    win: 200,
    note: `A masonry and lumber warning would last about 120.`
  },
  sea_turtles: {
    width: 120,
    start: -120,
    label: '🐢 sea turtle',
    win: 300,
    note: `Sea turtles also live about 120 years. A sea turtle who dies
    today will have seen the invention of flight, telegraph, television,
    and the internet.`
  },
  sea_turtle_future: {
    width: 120,
    label: '🐢 sea turtle 2: the future',
    win: 300,
    note: `A sea turtle born today will see different wonders. Probably,
    she will see the birth of the first genetically engineered children.`
  },
  engineered_children: {
    width: 10,
    start: -1,
    win: 300,
    label: 'CRISPR 🧒🏻 ?',
    stroke: 'fuchsia',
    note: `Unless that's already happened.`
  },
  replacement_organs: {
    width: 10,
    start: 20,
    win: 300,
    label: 'replacement organs 🍆',
    stroke: 'fuchsia',
    note: 'Probably, she will see us learn to grow whole replacement organs...'
  },
  protein_engineering: {
    width: 10,
    start: 60,
    win: 300,
    label: 'protein compilers',
    stroke: 'fuchsia',
    note: `...and develop the first protein compilers, opening up a whole subfield of
    nanoengineering. Once you can design proteins, you can design protein antennas...`
  },
  brain_interface: {
    width: 40,
    start: 70,
    win: 300,
    label: 'brain IO',
    stroke: 'fuchsia',
    note: `...and once you can design protein antennas, you can start to really get
    through fundamental problem of brain interfaces, which is that we have skulls, and
    they are thick. I think we'll solve that problem sometime in the next 120 years.`
  },
  sea_rise_4cm: {
    width: 120,
    win: 300,
    label: '+4cm 🌊',
    stroke: 'fuchsia',
    note: `Meanwhile, the seas will rise by four centimeters—perhaps more. Areas that
    were once beaches and cities will become flood planes. Areas that were once arable
    and temperate will become deserts.`
  },
  no_insects: {
    width: 120,
    win: 300,
    label: '☠️🐞',
    stroke: 'fuchsia',
    note: `Also in the next hundred and twenty years, if current trends hold, the global
    insect population will drop to about 1% of what it is today. And we really have no idea
    what that will do to the ecosystem.
    
    And that's just over the next century or so. What about two centuries? Five, ten, twenty?`
  },
  great_wall: {
    width: 2700,
    start: -2700,
    label: 'great wall',
    win: 4500,
    note: `Twenty-seven centuries ago, the first stones of the great wall were being
    set down. The stones of the great wall were quarried and laid by human hands. 
    They probably had a bit of help—machines providing mechanical advantage. If we were
    to build the great wall now, we would build it in much the same way. Our machines would
    be more powerful, but not, I think, categorically different.`
  },
  next_3000_years: {
    width: 3000,    
    label: '???',
    win: 6000,
    note: `And what will the next 3,000 years hold?  
    
    Truthfully, it's difficult to imagine.`
  },
  sea_2m: {
    win: 6000,
    width: 2000,
    label: '+200cm 🌊',
    stroke: 'fuchsia',
    note: `In the next 2000 years, the seas will rise about two meters,
    and we will discover many things.`
  },
  megastructures: {
    win: 6000,
    width: 100,
    start: 100,
    label: 'biostructure engineering',
    stroke: 'fuchsia',
    note: `As a species, as a biome, we are going to face enormous pressures,
    and I think we will leverage a new understanding of life to respond to them.
    
    Near the end of our bodies lifetimes, I think we will begin to see bioengineered
    megastructures. Buildings that have been grown, rather than made.
    Sea walls built from seeds.`
  },
  ai: {
    win: 6000,
    width: 100,
    start: 80,
    label: 'independent ai',
    stroke: 'fuchsia',
    note: `Before that, I think we'll start to the growth of AIs that can set their
    own goals and run their own research programmes.`
  },
  vr: {
    win: 6000,
    width: 100,
    start: 100,
    label: 'virtual realities',
    stroke: 'fuchsia',
    note: `And subsequently, an understanding and simulation of the signals within
    our brains that makes possible and commonplace realities that are not this one.

    That's all quite soon, if it happens at all. Perhaps I'm a century off. But look.
    Look at the great gulf of time we have to fill.
    
    I was just in Athens. There, I stood at the base of the Acropolis,
    It's 2500 years old.`
  },
  acropolis: {
    win: 6000,
    width: 2500,
    start: -2500,
    label: 'acropolis',
    note: `There, I thought of what it would be to come up on this place
    in the ancient times, having seen nothing like it.
    
    It is still impressive today. It is still beautiful. It would still be a
    significant endeavour to build such a site. Our buildings are taller now,
    yes, but also much more fragile, as though we do not truly believe in a future.
    
    We are building such incredible things. Things of glass and mind and vapor.
    
    We are also consuming an incredible amount of the world, inhaling the chaotic
    diversity of the natural world and exhaling clean homogeneity.`
  },
  extinction: {
    win: 6000,
    width: 3000,
    label: '☠️☠️☠️',
    note: `If trends
    continue, in three thousand years, every animal species that we do not farm
    will be extinct.
    
    Of course, the thing about life is that it is plastic and adaptive and trends do
    not tend to continue. Not in a linear fashion. It may seem as though we have
    many years, but suddenly an ecosystem collapses and the region becomes unlivable.
    
    Or, it may seem as though doom is on the horizon, but unforseen resonances grow
    and we the living adapt and shore up the structure that supports us.
      
    Life adapts, and surely Earth's biome will too. Will we be a part of it?`
  },
  egyptian_pyramid: {
    width: 4500,
    start: -4500,
    label: 'great pyramid of giza',
    win: 6000,
    note: `4500 years ago, we built the pyramids.
    That’s 56 lifetimes. Not bad.
    
    But the radiation would last another 68.`
  },
  brazil_pyramids: {
    width: 5500,
    start: -5500,
    label: 'american pyramids',
    win: 10000,
    note: `68 lifetimes is about the age of the oldest pyramids in the world,
    in Brazil. *All* the oldest pyramids in the world are in the Americas,
    actually, though few of them remain. Most of
    them have been destroyed, because that is what colonialism does.
    
    As the marker study points out, we've solved the signage problem at this point.

    The great pyramid is still mostly intact, as are the American pyramids
    that haven't been intentionally destroyed.`
  },
  radiation: {
    width: 10000,
    start: 0,
    label: '☢️ danger ☢️',
    win: 20000,
    note: `If we undertook such monumental construction efforts to mark the site,
    it would proably last, at least if it wasn't raided for parts.    

    Would it work for sure? It's hard to say.
    
    It’s hard to say what will happen in ten thousand years. It’s
    a time horizon that stretches nearly all our engineering. To
    send a message to ten thousand years from now is to build a
    bridge that will span all those millennia, somehow, without
    support.

    Or the bridge has to be alive. It has to have roots—a support
    structure strong enough to maintain the message, dynamic and
    resilient enough to stay anchored across 10,000 years of the
    shifting landscape of the world’s resources.

    It doesn’t have to be a structure.

    It can just be a story.

    Like this:`
    // It's kind of a brute force approach. If you want to make something that lasts,
    // just make something really big, and some of it will probably stick around.

    // Probably. We think it'll work, but it obviously hasn't yet.
    
    // It would be nice to know that this task is even possible.
    
    // It would be nice to discover even one structure from 10,000 years ago
    // that could carry our message.
    
    // What about a city? The oldest cities are quite old indeed.`
  },  
  // jericho: {
  //   width: 11000,
  //   start: -11000,
  //   label: 'jericho',
  //   win: 20000,
  //   note: 'Jericho is 11,000 years old.'
  // },
  // damascus: {
  //   width: 8000,
  //   start: -8000,
  //   label: 'damascus',
  //   win: 20000,
  //   note: `Damascus is 8,000 or so.
    
  //   Could we use a city to send a message? I think so.
    
  //   Imagine: a settlement with strict rules about which water sources are
  //   safe and which ones are forbidden. An order of monks tasked
  //   with guarding knowledge of what lies beneath and disseminating
  //   the sacred scripture, which says, in the main: do not dig.
    
  //   Would it work? Or would would we eventually grow too curious?
  //   When famine hits, would we come to believe that the priests
  //   are not guarding death, as they claim, but instead vast stores
  //   of food and riches? Would we kill them all, and eagerly crack
  //   open the earth to see what’s inside?

  //   It’s hard to say what will happen in ten thousand years. It’s
  //   a time horizon that stretches nearly all our engineering. To
  //   send a message to ten thousand years from now is to build a
  //   bridge that will span all those millennia, somehow, without
  //   support.

  //   Or the bridge has to be alive. It has to have roots—a support
  //   structure strong enough to maintain the message, dynamic and
  //   resilient enough to stay anchored across 10,000 years of the
  //   shifting landscape of the world’s resources.

  //   It doesn’t have to be a structure.

  //   It can just be a story.

  //   Like this:`
  // },
}

const timelineEntries = Object.entries(timeline)

const MorphFromTo = ({ dFrom, dTo, style, sec=0.1 }) => {
  const [d, setD] = useState(dFrom)
  useEffect(() => {
    if (d === dFrom) {
      if (d !== dFrom) setD(dFrom)
      const timer = setTimeout(() => setD(dTo), sec * 1000)
      return () => clearTimeout(timer)
    }
    setD(dTo)
  }, [dFrom, dTo])
  return <MorphPath d={d} style={style}  />
}

const getPath = (key, {start=0, width, stroke='cyan'}, y, win) =>
  <MorphFromTo key={key} style={{
      strokeWidth: 1,
      stroke,
    }}
    dTo={`
      M ${100 * start / win},${y}
      L ${100 * (start + width) / win},${y}`
    }
    dFrom={`
      M ${100 * start / win},${y}
      L ${100 * start / win},${y}
    `} />

const getLabel = (key, label='', y, win) =>
  <text key={`${key}-label`}
    fill='white'
    fontSize='3'
    style={{
      transition: 'transform 1s',
      transform: `translate(0, ${y - 2}px)`
    }}
    x={1} y={0}>{label}</text>

const renderTimeline = proj => {
  const now = timeline[proj]
  if (!now) return null
  let index = timelineEntries.findIndex(([_k, v]) => v === now)
  const scale = 0.9 * PRESENTATION_LENGTH / now.win
  const transform = `scale(${scale || 1})`

  const paths = []
  let y = 90; while (index >= 0 && y > 0) {
    const key = timelineEntries[index][0]
    const item = timelineEntries[index][1]
    paths.unshift(getPath(key, item, y, now.win))
    paths.unshift(getLabel(key, item.label, y, now.win))
    --index;
    y -= 8;
  }

  return {
    projectorStyle: {
      transition: 'transform 1s',
      transform,
    },   
    paths,
    now,
  }
}

export default () => {
  const vid = useRef()
  const [proj, setProj] = useState()
  const timeline = renderTimeline(proj)

  return <React.Fragment>
  { timeline && <svg style={{
      position: 'absolute',
      width: '100vw',
      height: '56.25vw',
      top: '50%',
      left: '50%',
      transformStyle: 'preserve-3d',
      transform: 'translate(-50%, -50%)',
    }}
      viewBox='-50 0 100 100'>
      <path d='M 0,0 L 0,100' stroke='darkcyan' strokeWidth={0.1} />
      {timeline.paths}
      <text fill='white' textAnchor='end' fontSize={2} x={80} y={99}>{timeline.now.win} years</text>
    </svg>
  }    
  <Slide url='10k'
    note={`Let's start by looking at one of the longest-term engineering projects
    in history.
    
    It's here, in the New Mexico desert, 40 miles outside of Carlsbad.
  
    In a pit of radioactive waste.
    
    It *is* a pit of radioactive waste, actually.
    
    They've drilled a hole 600 meters into the salt, and they've been dumping
    radioactive waste down there.`}>
  <div className='slide'>
    {timeline ? null : <video className='full' ref={vid} src={desertNight} volume={0} loop />}
    <BuildIn>{() => {
      console.log('playing')
      vid.current.style.opacity = 1
      vid.current.currentTime = 0
      vid.current.play()
    }}</BuildIn>
    <BuildOut>{() => {
      console.log('building out')
      vid.current.style.opacity = 0
      vid.current.pause()
    }}</BuildOut>
  </div>
  <Projector onChange={setProj} style={timeline && timeline.projectorStyle}>
    <Slide url='wipp'
      note={`It's a bit more controlled`}>
      <h1>Welcome to the Waste Isolation Pilot Plant!</h1>
      <img src={wipp} style={{margin: 'auto'}}/>
    </Slide>
    <Slide url='made_it_sound' note='than I just made it sound'>
      <h1>You may be wondering...</h1>
      <img src={wipp} style={{margin: 'auto'}}/>
    </Slide>
    <Slide url='procedures' note='There are procedures.'>
      <h1>What HAPPENS at WIPP??</h1>
      <h2>1. Waste Handling Procedures</h2>
      <img src={wipp} style={{margin: 'auto'}}/>
    </Slide>
    <Slide url='waste_handling'
      note={`The waste is in barrels, and they send it
      down in an elevator.`}>
      <h1>Waste handling procedures</h1> 
      <img src={barrels} />
    </Slide>
    <Slide url='awkward'
      note={`I couldn't find out if any workers have to ride down with it,
      but I presume that would qualify as the most awkward elevator ride
      in history.`}>
      <h1>Safety First!</h1>
      <img src={safety} />
    </Slide>
    <Slide url='sleeping_demons'
      note={`They load the barrels into caverns that they’ve drilled out of the salt.
      Once a cavern is full, the plan is to collapse it around the waste.
      The hydrology of the salt causes it to slowly fill in cracks in its
      structure. In this way, the barrels of radiation will be encased in a
      barrier of protective salt until they decay into harmlessness.
      Little sleeping demons, sealed off from earth for the next 10,000 years.`}>
      <h1>Freshly excavated cavern</h1>
      <img src={cavern} style={{transform: 'scale(2)'}}/>
    </Slide>
    <Slide className='dark' url='do_not_disturb'
    note={`          
      As long as nobody disturbs them.

      So the question is, how do you ensure that?

      How do you keep everyone away?

      For ten thousand years.
    `} />
    <Slide url='markers' note='Naturally, a study was done.'>
      <h1>Markers to Deter
      Inadvertent Human Intrusion into the
      Waste Isolation Pilot Plant</h1>
      <img src={warning} />
    </Slide>
    <Slide url='issues' note={`The first problem, of course, is
    that people are curious and resourceful, and destructive.
    If we mark a place, people are going to poke around, which we
    don't want. If we make the marker scary, people
    may decide this is where we've buried the treasure. If we make
    the marker expensive, people will walk off with it.`}>
      <h1>
        We decided against simple “Keep Out” messages with scary faces.
        Museums and private collections abound with such guardian figures
        removed from burial sites.
      </h1>
      <img src={dangerPoison} />
    </Slide>
    <Slide url='not_a_place_of_honor' note={`
      We want to send a message of dire danger to people who do not 
      speak our language, to people who may not understand the danger,
      without convincing them that we're trying to trick them or hide
      something.

      So that's all a bit hard.
    `}>
      <h1><i>This place is a message.. and part of a
      system of messages.. pay attention to it!
      Sending this message was important to us.
      We considered ourselves to be a powerful culture.
      This place is not a place of honor... no
      highly esteemed deed is commemorated here
      ...nothing valued is here.</i></h1>
    </Slide>
    <Slide url='pyramid' note={`
      And then there are the engineering challenges.
      At a minimum, we have to build something that lasts 10,000 years.
      That's quite a difficult amount of time to wrap our heads around,
      I think.
    `}>
      <img src={pyramid} />
    </Slide>
    <Slide url='how_long' note={'How long *is* 10,000 years, anyway?'}>
      <h1>How long IS 10,000 years?</h1>
      <img src={calendar} />
    </Slide>
    {
      timelineEntries.map(([key, value]) =>
        <Slide
          key={key}
          url={key}
          note={value.note}>{
          value.content
        }</Slide>
      )
    }    
  </Projector>
  </Slide>  
  </React.Fragment>
}
