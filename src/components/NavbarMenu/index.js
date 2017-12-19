import React, { Component } from 'react'
import styled from 'styled-components'
import { palette, size } from 'styled-theme'
import { ifProp } from 'styled-tools'

import { media } from '../../styled-utils'
import Link from '../Link'
import MenuIcon from '../../icons/menu'

const MenuHolder = styled.div`
  display: none;
  
  ${media.tablet`
    display: block;  
  `}

  & .menu-icon svg { 
    z-index: 10;
    position: absolute;
    right: 0;
  }
`

const Menu = styled.div`
  transition: transform .4s ease-in;
  transform: translate(0, ${ifProp('opened', 0, '-5000px')});
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  color: white;
  /*background-color: rgb(152, 143, 134);/* PANTONE WARM GREY 7 C */
  background-color: black;
`

const ItemLink = Link.extend`
  display: block;
  height: ${size('navbarHeight')};
  line-height: ${size('navbarHeight')};
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;
`


const MenuItem = ({ to, text }) => (
  <ItemLink to={to} alt={text}>
    { text }
  </ItemLink>
)

class NavbarMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      opened: false,
    }
  }

  toggleMenu(){
    const { opened } = this.state
    this.setState({opened: !opened})
  }

  render(){
    const { items } = this.props
    const { opened } = this.state
    return (
      <MenuHolder>
        <MenuIcon
          className='menu-icon'
          opened={opened}
          width={45}
          height={45}
          onClick={() => this.toggleMenu()}
        />
        <Menu opened={opened}>
          { items.map(el => (
            <MenuItem key={`item-${el.to}`} {...el}/>
          ))}
        </Menu>
      </MenuHolder>
    )
  }
}

export default NavbarMenu;
