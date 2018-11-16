import React from 'react'
import Projector from './projector'
import Slide from './slide'

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

export default () => <Projector>
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
    note={`Or: dynamite a moat around the hot zone and shovel the rubble onto the hot zone.
    You end up with a forbidding place. A rubble landscape surrounded by a moat of sand.
    `}>
    <img src={rubble} />
  </Slide>
  <Slide url='rubble_landscape_2'
    note={`A place that feels destroyed, rather than one that has been made.`}>
    <img src={rubble2} />
  </Slide>
  <Slide url='menacing_earthworks'
    note={`Menacing earthworks.`}>
    <img src={menacing} />
  </Slide>
  <Slide url='forbidding_blocks'
    note={`A place that feels destroyed, rather than one that has been made.`}>
    <img src={forbidding} />
  </Slide>
  <Slide url='thorns_1'
    note={`A landscape`}>
    <img src={thorns} />
  </Slide>
  <Slide url='thorns_2'
    note={`of thorns`}>
    <img src={thorns2} />
  </Slide>
  <Slide url='spikes_1'
    note={`A field`}>
    <img src={spikes} />
  </Slide>
  <Slide url='spikes_2'
    note={`of spikes`}>
    <img src={spikes2} />
  </Slide>
</Projector>