import React, {forwardRef, useRef, useState} from 'react'

import Slide, {Slides, note, use, BuildIn, BuildOut, useBuildEffect} from './slide'

import {CSSTransition} from 'react-transition-group'

import {every, sec} from './anim'
import {Animation} from './morph-svg'

import tea from './tea/*.svg'
import dragon from './dragon/*.svg'
const dragonKeys = Object.keys(dragon)

import { Linear, Power2 } from 'gsap/EasePack';
const teaKeys = Object.keys(tea)

const anim = Object.assign({}, tea, dragon)

const teaAnimation = every(1[sec], i =>
  teaKeys[i % teaKeys.length])

const dragonAnimation = every(1[sec], i =>
  dragonKeys[i % dragonKeys.length])
  
export default () =>
<Slides of={{
  entropy: {
    [note]: `Jeremey England is a physicist at MIT, and he has a theory about life.`,
    frame: null,
  },
  second_law: {
    [note]: `You’re familiar, perhaps, with the second law of thermodynamics.
    It’s the bit of physics that says that emtropy always increases.
    
    OR: when you leave a hot cup of tea in a cool room for a while, you’ll most
    likely end up with a tepid cup of tea in a slightly less cool room—and not,
    for example, a boiling cup of tea in a very cold room, or a freezing room
    with a tiny dragon in it. If I put ice cubes in the tea, they would melt.
    But we would not expect ice cubes to spontaneously emerge from a steaming
    hot cup.`,
  },
  statistical: {
    [note]: `It’s a statistical principle, really.
    
    Entropy is essentially a count of how many different ways we can arrange
    the atoms in something while keeping it looking the same.
    
    There are a *lot* more ways for the energy in your tea cup to be out in the world
    than there are for it remain in your tea cup. I think that makes
    intuitive sense, but if you want proof, the Wikipedia page for Statistical
    Mechanics has many soothing blue links and terrifying arrangements of
    greek letters.`
  },
  dragon_is_right_out: {
    [note]: `So, your tea will never warm itself.
    
    And if a *slightly warmer cup of tea* is so thoroughly off the table,
    the dragon seems right out. I mean, what’s the probability of that? The molecules
    of a cup of tea spontaneously re-arranging themselves into a tiny creature,
    with hundreds of billions of cells, each one a complex molecular factory, with
    ribosomes and peptide bonds and DNA and all the rest of the bits a living thing
    needs to operate.`,
    ease: Power2.easeInOut,
    frame: dragonAnimation,
  },
  resillient: {
    [note]: `Bodies are pretty resilient, but the tolerances are still *rather slim*.
    Rearrange a few trillion atoms here, a few trillion there, and you’ll pretty
    certainly be dead, if not an oddly-shaped puddle. There’s a lot more ways to be
    a cooling cup of tea than there are to be a living dragon.
    
    This seems true even if you give the tea an energy source, like a small hot plate,
    or an enormous fusion furnace turning six billion kilos of mass into pure energy
    every second. We heat up tea all the time; dragons do not emerge.`,
    frame: dragonAnimation,
  },
  what_about_us: {
    [note]: `But then what does that say about *us*? I mean, we’re a bit more complex
    than tiny dragons. Yes, we’ve had billions of years of evolution, and that surely
    counts for something. But we had to get started somewhere. Evolution is selective
    pressure applied to replicators, and so you need that first replicator. Which
    seems... unlikely? Perhaps even as unlikely as a tea cup becoming very slightly
    warmer.`,
    frame: dragonAnimation,
  },
  yes_all_of_them: {
    [note]: `England's lab an answer: given a source of energy, matter tends to
    form structures to *use* that energy. They've built quite elegant statistical
    theories and verified them with models, and their work appears to be checking out.

    If you attach a tea cup to a source of energy for long enough, structures
    will begin to form within it, tuned to use that energy more effectively.`,
    frame: dragonAnimation,
  },
for_what: {
    [note]: `“Use it for what,” you might ask. Bah! Why do we visit Luna?
    For what do we climb Sagarmatha? Because they're *there*.
    
    But perhaps a better comparison is coffee, which we drink in order to vibrate
    quite a lot faster. And that’s basically it: these tiny, primordial dissipative
    structures are thermodynamically favored because they harness available energy
    and turn it into heat.`,
    frame: dragonAnimation,
  },
  for_the_sake_of_it: {
    [note]: `We burn fuel for the sake of burning it, because it must be burned.

    I know there are many reasons that we might find fire entrancing, but I like
    to think at least one of them is game recognize game: fire does very quickly
    what we do more slowly, and perhaps this is why it is so easy to think of
    it as alive.`,
    frame: dragonAnimation,
  },
  biologists: {
    [note]: `Biologists generally don’t seem too impressed with England’s work.
    I haven’t found any critiques that say it’s *wrong*, just that there’s a
    whole lot it doesn’t explain—for example, it’s doesn't address how
    replicating structures come to store and process information, which is vital
    to evolution, and life as we know it. All living things are scientists,
    in a sense—taking the shape of hypotheses, updating internal models
    to respond to new data. This theory doesn't explain how that comes
    about. It's quite a bit more rudimentary.
    
    But I love what it does say. The second law of thermodynamics
    is also why train tracks rust and wood rots. It is why things fall
    apart; why the center, over time, cannot hold.

    There are more ways to lie than there are to tell the truth,
    and so the second law tells us that lies will flutter around
    the world before while the truth is still lacing up its boots.
    
    There are many more ways to be ash and dust than there are to be people or
    cities, and thus, ash and dust is what we will all, eventually, become.`,
    frame: dragonAnimation,
  },
  bigger: {
    [note]: `This theory tells us that decay is the same underlying
    process as life. It says living things emerge—the *must* emerge—again and again, at
    different scales, in different mediums, wherever there is a favorable
    energy gradient. Wherever there are resources, structures will emerge
    to burn them.

    Life arises because the universe so wants to die, it will come alive to do it.
    
    This entropic process underlies everything. It *is* everything, the borders
    we recognize between us and our creations and our systems and every other
    living thing? Those are conveniences. Approximations.

    Forget them for a moment.
    
    Let yourself become bigger.
    
    We are not just our selves.
    We are not just our nations.
    We are not just the gods we’ve chosen to give ourselves to.
    We are everything.
    We are all life.
    We are the sea that crawled onto land three billion years ago, and began to explore.
    A creature of ten trillion eyes.`,
    frame: dragonAnimation,
  },
  not_so_long: {
    [note]: `So perhaps ten thousand years isn’t so long after all.`,
    style: {transition: 'filter 2s', filter: 'brightness(0)'}
  },
}}>{
  ({frame=teaAnimation, ease=Linear.easeNone, duration=1, style}) =>
    <div className='viewport' style={style}>
      <Animation  srcs={anim} frame={frame} morph={{ duration, ease }} />
    </div>
}</Slides>