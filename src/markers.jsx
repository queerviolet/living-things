import React from 'react'
import Projector from './projector'
import Slide from './slide'

import title from './markers/title.png'
import hole from './markers/black-hole.png'
import hole2 from './markers/black-hole-2.png'

export default () => <Projector>
  <Slide url='markers' note='The WIPP Marker committee made a number of suggestions'>
    <img src={title} />
  </Slide>
  <Slide url='black_hole' note={`“Black Hole”: A giant black slab, baking in the desert sun.`}>
    <img src={hole} />
  </Slide>
  <Slide url='immense_nothing'
    note={`An immense nothing; a void; land removed from use
          with nothing left behind.`}>
    <img src={hole2} />
  </Slide>
</Projector>