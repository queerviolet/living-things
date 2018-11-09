import React, {useRef, useEffect, useReducer, useState, forwardRef, useContext, useMemo, useImperativeMethods, createContext, cloneElement} from 'react'
import {render} from 'react-dom'

import Player from './player'

render(
  <Player>
    <build-slide data-key="hi" />
    <build-slide data-key="A">    
      <build-slide data-key="B" />
      <build-slide>
        <build-slide/>
        <build-slide/>
        <build-slide/>
        <build-slide data-key="hello there" />
      </build-slide>
      <build-slide data-key="yyy" />
      <build-slide data-key="zzz" />
      <build-slide data-key="thzzzree" />
      <build-slide data-key="hzzzi" />
    </build-slide>
    <build-slide data-key="there" />
    <build-slide data-key="three" />
    <build-slide data-key="hi" />
    <build-slide data-key="there">
      <build-slide/>
      <build-slide/>
      <build-slide/>
    </build-slide>
    <build-slide data-key="three" />
    <build-slide data-key="hi" />
    <build-slide data-key="there" />
    <build-slide data-key="three" />
    <build-slide data-key="hi" />
    <build-slide data-key="there" />
    <build-slide data-key="three" />
    <build-slide data-key="hi" />
<build-slide data-key="there" />
<build-slide data-key="three" />
</Player>
, main)