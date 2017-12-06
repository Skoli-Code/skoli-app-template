import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'components/atoms/Svg';

import './styles.css';

const OpenIcon = ({
  visible,
  width,
  height,
  ...props
}) => (
  <Svg
    className={
      'open-icon '+(visible?'open-icon--visible':'')
    }
    fill="#fffff"
    preserveAspectRatio="none"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    width={width}
    height={height}
    {...props}
  >
    <g transform="matrix( 1, 0, 0, 1, 0,0)">
      <path id="c" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" strokeLinecap="square" fill="none" d=" M 20 30 L 80 30"/>
    </g>
    <g transform="matrix( 1, 0, 0, 1, 0,0)">
      <path id="b" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" strokeLinecap="square" fill="none" d=" M 20 50 L 80 50"/>
    </g>
    <g transform="matrix( 1, 0, 0, 1, 0,0)">
      <path id="a" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" strokeLinecap="square" fill="none" d=" M 20 70 L 80 70"/>
    </g>
  </Svg>
);

const CloseIcon = ({
  visible,
  width,
  height,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    className={
      'close-icon '+(visible?'close-icon--visible':'')
    }
    viewBox="0 0 100 100"
    x="0px"
    y="0px"
  >
    <polygon points="74.16 34.33 65.67 25.84 50 41.52 34.33 25.84 25.84 34.33 41.52 50 25.84 65.67 34.33 74.16 50 58.48 65.67 74.16 74.16 65.67 58.48 50 74.16 34.33"/>
  </Svg>
);

const MenuIcon = ({
  opened,
  width,
  height,
  ...props
}) => (
  <div {...props}>
    <CloseIcon
      width={width}
      height={height}
      visible={opened}
    />
    <OpenIcon
      width={width}
      height={height}
      visible={!opened}
    />
  </div>
);

export default MenuIcon;
