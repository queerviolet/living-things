import React, {forwardRef, useRef} from 'react'

import Slide, {Slides, note, use, BuildIn, BuildOut} from './slide'

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

export default () => {
  const vid = useRef()
  return <Slide url='10k'
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
  <Projector>
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
  </Projector>
  </Slide>
}

const Projector = forwardRef(({children}, ref) => {
  const slides = React.Children.map(children,
    ({props}) => <div className={`projector-slide-content ${props.className || ''}`}>{props.children}</div>)

  return <Slides of={Object.assign(...React.Children.map(children, (slide, index) => ({
    [slide.props.url]: {
      [note]: slide.props.note,
      index,
    }
  })))}>{({index}) =>
    <div ref={ref} className='projector'>
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
