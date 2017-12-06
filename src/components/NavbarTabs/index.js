import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { palette } from 'styled-theme'
import Link from '../Link' 

import HomeIcon from '../../icons/home.svg'
import AboutIcon from '../../icons/home.svg'
import TestIcon from '../../icons/home.svg'
import RandomPage from '../../icons/random.svg'

const tabs = [{
    home: true,
    icon: HomeIcon,
    to: '/',
    text: 'Skoli app template'
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

const Tabs = styled.ul`
  margin0;
  padding:0;
  list-style:none;
`

const TabLink = Link.extend`
  color: white;
  
  ${ifProp('home', css`
    color: ${palette('gray', 0)}
    background-color: ${palette('white',0)};
  `)}

  &:hover {
    color: ${color('primary
  }
`

const Tab = ({ to, text, icon:TabIcon, home=false }) => (
  <TabLink to={ to } home={ home }>
    { TabIcon && (<TabIcon />) }
    { text } 
  </TabLink>
)

const NavbarTabs = () => (
  <Tabs>
    { tabs.map(tab => (
      <Tab {...tab} />
    ))}
  </Tabs>
)

export NavbarTabs
