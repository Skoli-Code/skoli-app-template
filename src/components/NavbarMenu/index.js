import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { palette, size } from 'styled-theme'
import { ifProp } from 'styled-tools'

import { media } from '../../styled-utils'
import Link from '../Link'
import SocialSharing from '../SocialSharing'
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
  background-color: ${palette('gray',0)};
`

const ItemBlock = styled.div`
  height: ${size('navbarHeight')};
  line-height: ${size('navbarHeight')};
  padding: 15px;
  font-size: 20px;
  text-transform: uppercase;

  ${ifProp('home', css`
    width: 100%;
    position: absolute;
    z-index: 5;
    left: 0; 
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0;
    text-align: center;
    & > a {
      color: ${palette('white', 1)};
    }
  `)}

  .social-sharing {
    width: 100%;
    height: auto !important;
  }
`

const MenuItem = ({ to, text, home }) => (
  <ItemBlock home={home}>
    <Link to={to} alt={text}>
      { text }
    </Link>
  </ItemBlock>
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
    const home = items.find(el => el.home) 
    const menuItems = items.filter(el => !el.home)

    const { opened } = this.state
    return (
      <MenuHolder>
        <MenuItem {...home } />
        <MenuIcon
          className='menu-icon'
          opened={opened}
          width={45}
          height={45}
          onClick={() => this.toggleMenu()}
        />
        <Menu opened={opened}>
          <ItemBlock>
            <SocialSharing />
          </ItemBlock>
          { menuItems.map(el => (
            <MenuItem key={`item-${el.to}`} {...el}/>
          ))}
        </Menu>
      </MenuHolder>
    )
  }
}

export default NavbarMenu;
