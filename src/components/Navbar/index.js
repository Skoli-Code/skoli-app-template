import React from 'react'
import styled from 'styled-components'
import { size, palette } from 'styled-theme'
import NavbarTabs from '../NavbarTabs'
import Link from '../Link'
import { NAVBAR_LINKS as tabs } from '../../constants'

const Holder = styled.div`
  height: ${size('navbarHeight')};
  background-color: ${palette('secondary', 1)}
`

const Navbar = () => (
  <Holder>
    <NavbarTabs tabs={ tabs } />
  </Holder>
)

export default Navbar
