import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import GenericIcon from './icon'
const Icon = GenericIcon.extend`
line {
  fill:none;
  stroke:${palette('gray', 0)};
  stroke-miterlimit:10;
  stroke-width:4px;
}
`

const XMark = ({}) => (
  <Icon viewBox="0 0 45.13 45.13">
    <g>
      <line class="cls-1" x1="1.41" y1="43.72" x2="43.72" y2="1.41"/>
      <line class="cls-1" x1="43.72" y1="43.72" x2="1.41" y2="1.41"/>
    </g>
  </Icon>
)

export default XMark
