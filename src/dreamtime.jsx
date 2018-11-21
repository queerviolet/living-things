import React, {forwardRef, useRef, useState} from 'react'

import Slide, {Slides, note, use, BuildIn, BuildOut, useBuildEffect} from './slide'
import {MorphPath} from './greensock'

import Anim, {every, sec} from './anim'
import {Animation} from './morph-svg'
import { Linear, Power3 } from 'gsap/EasePack';

import fire from './fire/*.svg'
const fireKeys = Object.keys(fire)
import faceless from './faceless.svg'
import roots from './roots.svg'
import money from './money.svg'
import assistant from './assistant.svg'
import facebook from './facebook.svg'
import phone from './iphone.svg'
import slack from './slack.svg'
import flags from './flags.svg'
import cell from './cell/*.svg'
const cellKeys = Object.keys(cell)

const animation = Object.assign({}, fire, {
  faceless,
  roots,
  money: {ungrouped: money},
  facebook,
  assistant,
  phone: {ungrouped: phone},
  slack,
  flags: {ungrouped: flags},
}, cell)
const fireAnimation = every(0.3[sec], () =>
  fireKeys[Math.floor(Math.random() * fireKeys.length)])
const cellAnimation = every(0.3[sec], () =>
  cellKeys[Math.floor(Math.random() * cellKeys.length)])
export default () =>
<Slides of={{
  dreamtime: {
    [note]: `Many years ago, this land beneath greater Melbourne extended
    right out to the sea. It was a large grassy plain, and what’s now
    the Yarra river flowed out across it into the sea. The Boon Wurrung,
    the aboriginal people of the land, knew the river as Birrarung,
    the river of mists.
    
    This is a story of their people.

    It has been told around communal fires again and again,
    passing between generations.
    
    Its shape is famliar, and it goes like this.`
  },
  many_years_ago: {
    [note]: `Many, many years ago, there was a time of peace and harmony.
    The Boon Wurrung tended the woodlands, they hunted and fished and
    cultivated yam daisies. They welcomed people from across the Kulin nation, and they
    obeyed the laws of their creator Bunjil, who traveled as an eagle.`
  },
  one_day: {
    [note]: `But one day there came a time of chaos and crisis.
    The Boon Wurrung and the other Kulin argued and fought and killed.
        
    They neglected the woodlands. They neglected the
    yam daisy. They overhunted and overfished.
    
    And all this violence angered the sea.
    
    And the sea began to rise.
    
    The river became flooded and eventually the whole flat plain was covered
    in water. It threatened to flood their whole country.`
  },
  frightened: {
    [note]: `The people became frightened and went to Bundjil, their creator
    and spiritual leader. They asked Bundjil to stop the sea from rising.`
  },
  angry_bundjil: {
    [note]: `Like the sea, Bundjil too was angry with his people.
    
    He told them that they would have to change their ways if they
    wanted to save their land.

    Bundjil he made them promise to respect the laws:

    They would learn from their mistakes.
    They would care for the woodlands.
    They would care for Bundjil’s other children, all the creatures of the earth.
    They would accept visitors.
    They would sort their differences without war.

    The people thought about what they had been doing.
    They thought of the rising sea.
    They thought of floods and war.
    And they promised to follow him.

    Bundjil walked out to the sea, raised his spear and directed the sea
    to stop rising.`
  },
  stopped_rising: {
    [note]: `The sea stopped rising. But the waters never fell.
    
    The sea washed away much of the woodlands of the Boon Wurrung and
    most of their country was reduced to a narrow strip of coastline.
    
    The new waters created a large bay known to the Boon Wurrung as Nairm.
    Colonizers would later name it Port Phillip Bay.

    Today, Birrarung river of mist, still flows beneath the bay.`
  },
  today: {
    [note]: `And today, we can look at the land beneath the bay, and the stones all
    around it, and we find that they whisper pieces of this story as well.
    The geological evidence is pretty clear: Ten thousand years ago, the bay
    was a grassy plain. Then it flooded. It would have happened quite quickly.
    This was the end of the last glacial period. A time of tremendous
    climactic change. Shifting coastlines. Warming temperatures.
    Rising waters. And all those things shift resources. They uproot
    communities. They create conflict.
    
    They create war.`
  },
  when_it_was_over: {
    [note]: `And when it was over and there was peace, the Boon Wurrung
    remembered. They gathered around the fire, and they told stories, and they
    healed from what was surely a traumatic time.`
  },
  the_oldest: {
    [note]: `These aboriginal dreamtime stories are most likely the oldest
    human stories whose origins we can place. And this is how they were
    brought here, through oral storytelling, a bridge that has taken the
    story from lips to ears to lips to ears over four hundred generations.

    The story itself participates. Its structure is familiar, comforting.
    Once, there was peace. Then, we broke it. The gods fixed it, but they
    made us swear on the laws. And that's why we follow the laws.
    
    What an incredibly robust technology, to carry a message across such
    distance.`
  },
  honor: {
    [note]: `Oral storytelling: the practice, the technology, this is how
    the Boon Wurrung honor their gods. It is how their gods *live*.

    Gods are not physical things, but I think they are living things.
    Certainly, they have duration, physical extent, and material power.
    Gods that last maintain a kind of conceptual homeostasis within their
    spheres of influence, the membranes of a their non-physical bodies gated
    by shibboleths and ritual.
    
    Gods command resources-through us, just as we command resources through
    our muscles.
    
    They are even made of replicating pieces. Not biological pieces, but
    pieces of a process. What's a piece of a process? Let's call it a shard.

    Oral storytelling is how the shards of Bundjil reproduce. Moving from person
    to person. Becoming distributed dreams, concepts given tenancy on the
    infrastructure of many minds.`
  },
  carried_the_story: {
    [note]: `And with their gods, the Boon Wurrung have carried a historical
    record, essentially intact, for ten thousand years.

    I hope as we enter our own time of conflict, the gods of today will be as
    helpful to us.`
  },
  gods_today: {
    [note]: `We still have them, of course we do.` 
  },
  faceless: {
    [note]: `Today, many of our gods are faceless.`,
    frame: 'faceless',
    ease: Power3.easeInOut,
  },  
  roots: {
    [note]: `But they have roots in us just the same.`,
    frame: 'roots',
    ease: Power3.easeInOut,
  },  
  value: {
    [note]: `We give them value.`,
    frame: 'money',
    ease: Power3.easeInOut,
  },  
  watch_over: {
    [note]: `They watch`,
    frame: 'facebook',
    ease: Power3.easeInOut,
  }, 
  watch_over_assistant: {
    [note]: `over us`,
    frame: 'assistant',
    ease: Power3.easeInOut,
  }, 
  sacrifice_attention: {
    [note]: `We sacrifice our attention`,
    frame: 'phone',
    ease: Power3.easeInOut,
  },
  sacrifice_attention_slack: {
    [note]: `to them`,
    frame: 'slack',
    ease: Power3.easeInOut,
  },
  sacrifice_children: {
    [note]: `We sacrifice our children to them.
    
    We define ourselves in terms of them.

    I’m not saying that these things aren’t real.
    
    I’m just saying that they’re fictions.
    
    They are stories that define our world.
    
    Stories that we define ourselves inside of.
    
    We are part of nations that exist because we agree they exist.
    
    We are part of families bound together by blood and a belief in its power.
    
    We are part of communities bound together by shared belief and shared need.`,
    frame: 'flags',
    ease: Power3.easeInOut,
  },
  covenants: {
    [note]: `And we too are covenants. We are 37.2 trillion cells that have
    agreed to work together to be a human being. Like ships of Theseus,
    we aren’t any one of our cells, we aren’t even *all* of our cells, we are
    a *process running on them*. An agreement; a protocol. An idea.`,
    frame: cellAnimation,    
  },
  problems_of_society: {
    [note]: `In this way, the problems of the body are quite like the
    problems of society. Our cells are bound by complex chemical treaties.
    The behavior of our cells is circumscribed by energy gradients from
    which escape is very difficult, just as our behavior is bounded by
    our own social, political, institutional, energetic gradients. Our
    cells form tissues and organs that make up our bodily institutions.
    They are policed by our immune system. We need resources to fuel us,
    and our bodies have whole industrial areas dedicated to the task of
    resource extraction. We need to receive and process information, and
    we devote enormous resources to the task.`,
    frame: cellAnimation,
  },
  our_own_cells: {
    [note]: `I think relatively few of us have ever seen our own cells.
    It’s easy to not think of them. They are very meaningfully separate
    objects, but seen from our vantage point, they blend into one: us.`,
    frame: cellAnimation,    
  },
  zooming_out: {
    [note]: `You can keep zooming out. You can zoom out as much as you like.
    You can allow to blur the divisions between self and other and between
    human and not-human.
    
    And I think it’s important to do that sometimes.`,
    frame: cellAnimation,
  },
  gone: {
    [note]: `Sometimes, when I’m walking around the city, I imagine
    how it will be after we’re gone.

    The train tracks overgrown. Streets flooded and turned into canals,
    and then abandoned. Wall Street offices turned into squats, their walls
    hastily shored up by bioarchitecture, now growing wild, calcified
    structural vines creeping over crumbling stonework.
    
    Here comes the inspirational part again:
    
    We are all going to die.
    
    You. Me. Everyone we love. Our nations and our civilizations.
    
    And that’s a bit sad. Inevitable mortality is kindof a bummer.
    
    But it also connects us.

    And it’s also kindof necessary.`,
    frame: null,
  }
}}>{
  ({frame=fireAnimation, ease=Linear.easeNone}) =>
  <Animation srcs={animation} frame={frame} morph={{ duration: 1, ease: Linear.easeNone }} />
}</Slides>