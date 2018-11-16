import React, {forwardRef, useRef, useState} from 'react'

import Slide, {Slides, note, use, BuildIn, BuildOut, useBuildEffect} from './slide'
import {MorphPath} from './greensock'

import Anim, {every, sec} from './anim'
import {Animation} from './morph-svg'

import fire from './fire/*.svg'
import { Linear } from 'gsap/EasePack';
const fireKeys = Object.keys(fire)

const fireAnimation = every(0.3[sec], () =>
  fireKeys[Math.floor(Math.random() * fireKeys.length)])

export default () =>
<Slides of={{
  entropy: {
    [note]: `Jeremey England is a physicist at MIT, and he has a theory about life.`
  },
  second_law: {
    [note]: `You’re familiar, perhaps, with the second law of thermodynamics.
    It’s the bit of physics that says that when you leave a hot cup of tea
    in a cool room for a while, you’ll most likely end up with a tepid cup
    of tea in a slightly less cool room—and not, for example, a boiling cup
    of tea in a very cold room, or a freezing room with a tiny dragon in it.
    If I put ice cubes in the tea, they would melt. But we would not expect
    ice cubes to spontaneously emerge from a steaming hot cup.`
  },
  statistical: {
    [note]: `It’s really a statistical principle. There are a *lot* more ways
    for the energy in your tea cup to be in the room than there are for it
    remain in your tea cup. You can kindof see how that would be intuitively,
    but if you would rather see proofs, the Wikipedia page for Statistical
    Mechanics has many soothing blue links and terrifying arrangements of
    greek letters.`
  },
  unentropic_tea: {
    [note]: `Think of what would have to happen for the tea cup to heat up,
    even for a millisecond. All of the tea molecules simultaneously failing
    to radiate, failing to convect, and meanwhile getting warmed by the room.
    Is it possible? Yes, it has a non-zero probability.
    
    Will it ever happen? No. It will never happen, not if you left a tea cup in
    a room until the heat death of the universe. At which point, incidentally, you
    will have neither a tea cup, nor a room, nor, in any recognizable sense, a
    universe. Which is sortof the point.`
  },
  dragon_is_right_out: {
    [note]: `So, if a *slightly warmer cup of tea* is so thoroughly off the table,
    the dragon seems right out. I mean, what’s the probability of that? The molecules
    of a cup of tea spontaneously re-arranging themselves into a tiny creature,
    with hundreds of billions of cells, each one a complex molecular factory, with
    ribosomes and peptide bonds and DNA and all the rest of the bits a living thing
    needs to operate.`
  },
  resillient: {
    [note]: `Bodies are pretty resilient, but the tolerances are still *rather slim*.
    Rearrange a few trillion atoms here, a few trillion there, and you’ll pretty
    certainly be dead, if not an oddly-shaped puddle. There’s a lot more ways to be
    a cooling cup of tea than there are to be a living dragon.`
  },
  what_about_us: {
    [note]: `But then what does that say about *us*? I mean, we’re a bit more complex
    than tiny dragons. Okay, we’ve had billions of years of evolution, and that surely
    counts for something. But we had to get started somewhere. Evolution is selective
    pressure applied to replicators, and so you need that first replicator. Which
    seems... unlikely? Perhaps even as unlikely as a tea cup becoming very slightly
    warmer.`
  },
  big_problem: {
    [note]: `And that’s a big problem! An unlikely thing can still happen once, of
    course, and perhaps that’s what we are—a statistical miracle, or perhaps an actual
    one. The problem is, if structure arising from less-structure is unlikely, a single
    miracle doesn’t quite solve the problem. Life appears to have grown in complexity
    quite a bit over the last three billion years. Some of these shifts can perhaps be
    explained as thermodynamically favorable, but all of them?`
  },
  yes_all_of_them: {
    [note]: `Yes, says Jeremey England, introduced five minutes ago and just now
    piping up! All of them.
    
    All of them! Including the first. Actually, especially the first. That first
    self-organization of molecules into structures in order to use energy. This
    is what England’s lab has been modeling, and in simulations, they’ve found
    that random assortments of idealized chemicals will tend to form structures
    tuned to dissipate energy more effectively.`
  },
  chemicals: {
    [note]: `So if some chemicals react energetically when they’re near each other,
    this simulated soup of chemicals tends to form structures to bring those
    reactants and catalysts near each other to use the energy produced by their
    reaction.`
  },
  for_what: {
    [note]: `“Use it for what,” you might ask. Bah! For what do we visit Luna?
    For what do we climb Sagarmatha? Because they're *there*.
    
    But perhaps a better comparison is coffee, which we drink in order to vibrate
    quite a lot faster. And that’s basically it: these tiny, primordial dissipative
    structures are thermodynamically favored because they harness available energy
    and turn it into heat.`
  },
  for_the_sake_of_it: {
    [note]: `We burn fuel for the sake of burning it, because it must be burned.

    I know there are many reasons that we might find fire entrancing, but I like
    to think at least one of them is game recognize game: fire does very quickly
    what we do more slowly, and perhaps this is why it is so easy to think of
    it as alive.`
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
    
    But I love what it does say. The second law of thermodynamics,
    you may recall, is also why train tracks rust and wood rots. There
    are many more ways to be ash and dust than there are to be people or
    cities, and thus, the second laws, ash and dust is what we will all
    become.`
  },
  not_so_long: {
    [note]: `This theory says that very decay is the very same underlying
    process as life. It says living things will emerge again and again, at
    different scales, in different mediums, wherever there is a favorable
    energy gradient, wherever there are resources.

    Life arises because the universe so wants to die, it will come alive to do it.
    
    This entropic process underlies everything. It *is* everything, the borders
    we recognize between us and our creations and our systems and every other
    living thing? Those are conveniences. Approximations.
    
    Let yourself become bigger.
    
    We are not just our selves.
    We are not just our nations.
    We are not just the gods we’ve chosen to give ourselves to.
    We are everything.
    We are all life.
    We are the sea that crawled onto land three billion years ago, and began to explore. A creature of ten trillion eyes.
    
    So perhaps ten thousand years isn’t so long.`
  }
}}>{
  () =>
    <Animation srcs={fire} frame={fireAnimation} morph={{ duration: 1, ease: Linear.easeNone }} />
}</Slides>