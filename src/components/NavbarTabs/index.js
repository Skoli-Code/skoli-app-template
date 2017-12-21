import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { palette, size } from 'styled-theme'
import { media } from '../../styled-utils'

import SocialSharing from '../SocialSharing'
import Link from '../Link' 

const Tabs = styled.div`
  display: flex;

  ${media.tablet`
    display: none;
  `}
`

const TabLink = Link.extend`
  color: white; 
  height: ${size('navbarHeight')};
  line-height: ${size('navbarHeight')};
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  transition: color .3s ease, background-color .3s ease;

  ${ifProp('home', css`
    color: ${palette('white', 1)};
    background-color: ${palette('homeTab', 0)};

    svg {
      height: 40px !important;
      width: 40px !important;
      max-height: 40px !important;
      fill: ${palette('white', 0)};
    }
  `)}

  &:hover, &.active {
    background-color: ${palette('secondary', 0)};
  }

  svg {
    align-self: center;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 5px;
    max-height: 30px;
  }
`

const Tab = ({ to, text, icon:TabIcon, home=false }) => (
  <TabLink to={ to } home={ home } activeClassName={'active'} exact>
    { TabIcon && (<TabIcon />) }
    { text } 
  </TabLink>
)

const NavbarTabs = ({ tabs }) => (
  <Tabs>
    { tabs.map((tab,i) => <Tab key={`tab-${i}`} {...tab} /> )}
    <SocialSharing />
  </Tabs>
)

export default NavbarTabs
