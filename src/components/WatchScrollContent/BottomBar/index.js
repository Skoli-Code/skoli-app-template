import React from 'react'
import styled, { css } from 'styled-components'
import { size, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'
import __Container from '../../Container'

import Note from '../../Note' 
import Ref from '../../Ref' 

const Container = __Container.extend`
  padding: ${ifProp('isFixed', '0 15', 0)}px;
`

const BottomBar = styled.div`
  ${ifProp('isVisible', css`
    border-top: 2px solid ${palette('gray', 2)};
  `)}
  padding-top: 5px;
  background: white;
  position: ${ifProp('isFixed', 'fixed', 'static')};
  height: ${size('bottomBarHeight')};
  bottom: ${ifProp('isVisible', 0, -200)}px;
  left: 0;
  right: 0;
  transition: bottom .3s ease;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 1em;
`

const ListElem = styled.li`
  display: inline;
  padding: 0;
  margin: 0;
  margin-left: 1em; 
  
  &:first-of-type {
    margin-left: 0;
  }
`

const Notes = ({ notes }) => (
  <List>
    { notes.map(({ id, text, children }) => (
      <ListElem key={`note-${id}`}>
        <Note inBottomBar={true} text={text} id={id}>{ children }</Note>
      </ListElem>
    ))}
  </List>
)

const Refs = ({ refs }) => (
  <List>
    { refs.map(({ id, text, children }) => (
      <ListElem key={`ref-${id}`}>
        <Ref inBottomBar={true} text={text} id={id}>{ children }</Ref>
      </ListElem>
    ))}
  </List>
)

const ContentBottomBar = ({ isFixed, notes, refs, ...otherProps}) => (
  <BottomBar isFixed={isFixed} {...otherProps}>
    <Container isFixed={isFixed}>
      <Notes notes={ notes }/>
      <Refs refs={ refs }/>
    </Container>
  </BottomBar>
)

export default ContentBottomBar
