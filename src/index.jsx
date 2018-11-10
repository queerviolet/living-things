import React, { createContext } from 'react'
import {render} from 'react-dom'

import Slide, {useIsBuilt, useBuildOut, useState} from './slide'
import Player from './player'

const Foo = () => {
  const isBuilt = useIsBuilt()
  return <div>
    <h1 style={isBuilt && {color: 'fuchsia'}}>Foo {isBuilt}</h1>
    <Slide url="000" />
    <Slide url="111" />
  </div>
}

render(
  <Player>
    <Slide url="hello">
      <Foo />
      Hi!
    </Slide>
    <Slide url="A">    
      <Slide url="B" />
      <Slide>
        <Slide/>
        <Slide/>
        <Slide/>
        <Slide url="hello there" />
      </Slide>
      <Slide url="yyy" />
      <Slide url="zzz" />
      <Slide url="thzzzree" />
      <Slide url="hzzzi" />
    </Slide>
    <Slide url="there" />
    <Slide url="three" />
    <Slide url="hi" />
    <Slide url="there">
      <Slide/>
      <Slide/>
      <Slide/>
    </Slide>
    <Slide url="three" />
    <Slide url="hi" />
    <Slide url="there" />
    <Slide url="three" />
    <Slide url="hi" />
    <Slide url="there" />
    <Slide url="three" />
    <Slide url="hi" />
<Slide url="there" />
<Slide url="three" />
</Player>
, main)