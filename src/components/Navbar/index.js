import React from 'react'
import styled from 'styled-components'
import { size, palette } from 'styled-theme'
import NavbarTabs from '../NavbarTabs'
import Link from '../Link'

import HomeIcon from '../../icons/home'
import AboutIcon from '../../icons/questionmark'

const tabs = [{
    home: true,
    icon: HomeIcon,
    to: '/',
    text: 'Skoli app template'
  },
  {
    to: '/introduction',
    text: 'Introduction',
  },
  {
    to: '/vis-in-md',
    text: 'Test visualization in markdown',
  },
  {
    to: '/about',
    text: 'About',
    icon: AboutIcon,
  }
]

const Holder = styled.div`
  height: ${size('navbarHeight')};
  background-color: ${palette('primary', 1)}
`

const Navbar = () => (
  <Holder>
    <NavbarTabs tabs={ tabs } />
  </Holder>
)

export default Navbar
