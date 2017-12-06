import React, { Component } from 'react';
import MenuIcon from 'components/icons/Menu';
import './styles.css';

class NavbarMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      opened: false,
    };
  }

  toggleMenu(){
    const { opened } = this.state;
    this.setState({opened: !opened});
  }

  render(){
    const { children } = this.props;
    const { opened } = this.state;
    return (
      <div className={'menu '+(opened?'menu--opened':'')}>
        <MenuIcon
          className='menu-icon'
          opened={opened}
          width={45}
          height={45}
          onClick={() => this.toggleMenu()}
        />
        <div className='menu-holder'>
          { children }
        </div>
      </div>
    );
  }
}
export default NavbarMenu;
