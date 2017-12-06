import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { palette, size } from 'styled-theme'
import Link from '../Link' 

const Tabs = styled.div`
  display: flex;
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
    color: ${palette('gray', 0)};
    background-color: ${palette('white', 0)};

    svg {
      height: 40px !important;
      width: 40px !important;
    }
  `)}

  &:hover {
    background-color: ${palette('primary', 0)};
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
  <TabLink to={ to } home={ home }>
    { TabIcon && (<TabIcon />) }
    { text } 
  </TabLink>
)

const NavbarTabs = ({ tabs }) => (
  <Tabs>
    { tabs.map((tab,i) => <Tab key={`tab-${i}`} {...tab} /> )}
  </Tabs>
)

export default NavbarTabs
