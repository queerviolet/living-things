import React from 'react'
import {render} from 'react-dom'

function renderApp () {
  const Editor = require('./stroke-editor').default
  render(<Editor />, main)
}

renderApp()

module.hot.accept(renderApp)