import React from 'react'
import styled from 'styled-components'
import { size, palette } from 'styled-theme'
import NavbarTabs from '../NavbarTabs'
import NavbarMenu from '../NavbarMenu'
import Link from '../Link'
import { NAVBAR_LINKS as links } from '../../constants'

const Holder = styled.div`
  height: ${size('navbarHeight')};
  background-color: ${palette('secondary', 1)}
`

const Navbar = () => (
  <Holder>
    <NavbarTabs tabs={ links } />
    <NavbarMenu items={ links } />
  </Holder>
)

export default Navbar
