import React, {forwardRef, useRef, useState} from 'react'

import Slide, {Slides, note, use, BuildIn, BuildOut, useBuildEffect} from './slide'
import {MorphPath} from './greensock'

import Anim, {every, sec} from './anim'

import {Animation} from './morph-svg'

import desertNight from './new-mexico-night-sky.mp4'
import safety from './wipp-safety.jpg'
import barrels from './wipp-barrels.jpg'
import cavern from './wipp-cavern.jpg'
import wipp from './wipp.jpg'
import warning from './warning.gif'
import dangerPoison from './danger-poison.png'
import pyramid from './pyramid-message.png'
import calendar from './calendar-clip.jpg'
import { getDefaultLibFilePath } from 'typescript';
import { PathActions } from 'three';

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
    start: -day(2) + hour(5),
    win: day(4),
    label: '✈️ codemotion',
    note: 'This conference has lasted two days. Soon, many of you will fly home.',
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
  billboards: {
    width: 100,
    label: '🛣 billboard',
    win: 300,
    note: `Going with things that might more easily be used to send messages,
    Billboards have a life expectancy of about 100 years.`
  },
  great_wall: {
    width: 2000,
    start: -2000,
    label: 'great wall (oldest)',
    win: 4500,
    note: `The oldest bits of the great wall are about 2,000 years old.
    But it’s been maintained and rebuilt and extended *a lot*.`
  },
  great_wall_newer_parts: {
    width: 600,
    start: -600,
    label: 'great wall (most of it)',
    win: 4500,
    note: `Most of it is about 600 years old.`
  },
  egyptian_pyramid: {
    width: 4500,
    start: -4500,
    label: 'great pyramid of giza',
    win: 6000,
    note: `The great pyramid certainly sends quite a message!
    It's about 4,500 years old. That’s 56 lifetimes.
    Not bad. But the radiation would outlast them by another 68.`
  },
  brazil_pyramids: {
    width: 5500,
    start: -5500,
    label: 'american pyramids',
    win: 10000,
    note: `That’s about the age of the oldest pyramids in the world,
    in Brazil. All the oldest pyramids in the world are in the Americas,
    actually, though few of them remain. From 1920 to 1960, most of
    them were destroyed. There are many reasons, and yet there is
    only one: colonialism.
    
    In a sense, we've solved the marking problem at this point.

    The pyramid at Cheops and the pyramids of the Americas—all monumental
    structures—are still mostly intact after 5,000 years.`
  },
  radiation: {
    width: 10000,
    start: 0,
    label: '☢️ danger ☢️',
    win: 20000,
    note: `If we took undertook such monumental construction efforts to mark the site,
    it would proably last, at least if it wasn't raided for parts.
    
    There's another engineering project to build something this long-lived that's worth
    mentioning here`
  },
  long_now: {
    width: 10000,
    start: 0,
    label: '⏱?',
    win: 20000,
    note: `The clock of the Long Now, also being constructed in the deserts of the southwestern
    U.S., is a project to build a clock that will run for 10,000 years, chiming once per millennium.
    
    They're pulling out some pretty impressive feats of mechanical engineering to make
    the clock mechanisms work. Precision-machined gears made of stainless steel, stone, and
    ceramics. Movements sealed in quartz, protected from dust and the elements.

    It's a fascinating project. A testament to optimism. Will it work?

    Maybe. None of the technology in the clock has been tested across
    the timespans involved. We think it'll work, but we can't know.
    
    It would be nice to know. It would be nice to discover even one structure from 10,000 years ago
    that could carry our message.
    
    What about a city? The oldest cities are quite old indeed.`
  },
  jericho: {
    width: 11000,
    start: -11000,
    label: 'jericho',
    win: 20000,
    note: 'Jericho is 11,000 years old.'
  },
  damascus: {
    width: 8000,
    start: -8000,
    label: 'damascus',
    win: 20000,
    note: `Damascus is 8,000 or so.
    
    Are cities physical things? It’s a bit questionable, isn’t it?
    They are things, certainly. If we were standing in space,
    looking down at the earth at night, and you pointed to a
    blob of light and asked, “what is that thing?” The answer would be:
    a city. So cities are some kind of thing, and they have bodies,
    and perhaps that is enough.

    Certinly, we can even imagine sending a message with a city.
    
    A settlement with strict rules about which water sources are
    safe and which ones are forbidden. An order of monks tasked
    with guarding knowledge of what lies beneath and disseminating
    the sacred scripture, which says, in the main: do not dig.
    
    Would it work? Or would would we eventually grow too curious?
    When famine hits, would we come to believe that the priests
    are not guarding death, as they claim, but instead vast stores
    of food and riches? Would we kill them all, and eagerly crack
    open the earth to see what’s inside?

    It’s hard to say what will happen in ten thousand years. It’s
    a time horizon that stretches nearly all our engineering. To
    send a message to ten thousand years from now is to build a
    bridge that will span all those millennia, somehow, without
    support.

    Or the bridge has to be alive. It has to have roots—a support
    structure strong enough to maintain the message, dynamic and
    resilient enough to stay anchored across 10,000 years of the
    shifting landscape of the world’s resources.

    It doesn’t have to be a physical thing.

    It can just be a story.

    Like this:`
  },
}

const timelineEntries = Object.entries(timeline)

const None = {}

const getPath = (key, {start=0, width}, y, win) =>
  <MorphPath key={key} d={
    every(0.1[sec], t => t
      ? `M ${100 * start / win},${y}
         L ${100 * (start + width) / win},${y}`
      : `M ${100 * start / win},${y}
         L ${100 * start / win},${y}`)} style={{
    strokeWidth: 1,
    stroke: 'cyan',
  }} />

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
  if (!now) return None
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
    paths 
  }
}

export default () => {
  const vid = useRef()
  const [proj, setProj] = useState()
  const timeline = renderTimeline(proj)

  return <React.Fragment>
  { timeline === None ? null :
    <svg style={{
      // width: '131487192vw',
      // height: '1314871vw',
      // border: 'thin solid fuchsia',
      position: 'absolute',
      width: '100vw',
      height: '56.25vw',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
      viewBox='-50 0 100 100'>
      <path d='M 0,0 L 0,100' stroke='darkcyan' strokeWidth={0.1} />
      {timeline.paths}
      {/* <path d='M -50,90 L50,90' stroke='cyan' stroke-linecap='round' strokeWidth={1} />   */}
      {/* <path d='M -131487192,0 L131487192,0' stroke='cyan' style={{transform: 'scale(0.1)'}} strokeWidth={1} /> */}
    </svg>
  }    
  <Slide url='10k'
    note={`To look towards that future, let's look at three of
    the longest-term engineering projects in human history.`}>
  <Slide url='the-desert'
    note={`The first is here, in the New Mexico desert, 40 miles outside
    of Carlsbad.
  
    In a pit of radioactive waste.
    
    It *is* a pit of radioactive waste, actually.
    
    They've drilled a hole 600 meters into the salt, and they've been dumping
    radioactive waste down there.`}>
    <div className='slide'>
      <video className='full' ref={vid} src={desertNight} volume={0} loop />
      <BuildIn>{() => {
        vid.current.currentTime = 0
        vid.current.play()
      }}</BuildIn>
      <BuildOut>{() => vid.current.pause()}</BuildOut>
    </div>
  </Slide>
  <Projector onChange={setProj} style={timeline.projectorStyle}>
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
    don't want. If we make the marker scary or expensive, people
    may decide this is where we've buried the treasure`}>
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

const Projector = forwardRef(({children, onChange, style={}}, ref) => {
  const slides = React.Children.map(children,
    ({props}) => <div className={`projector-slide-content ${props.className || ''}`}>{props.children}</div>)

  return <Slides onChange={onChange} of={Object.assign(...React.Children.map(children, (slide, index) => ({
    [slide.props.url]: {
      [note]: slide.props.note,
      index,
    }
  })))}>{({index}) =>
    <div ref={ref} className='projector' style={style}>
      <div className='projector-slide' style={carriageStyle(index, slides.length)}>{
        slides
      }</div>
    </div>
  }</Slides>
})

const carriageStyle = (index, count) => ({
  width: count * 100 + 'vw', height: '100vh',
  left: index * -100 + 'vw',
  transition: 'left 0.2s linear',
  display: 'flex',
  flexFlow: 'row nowrap',
  position: 'relative',
  top: 0,
  margin: 0,
})
