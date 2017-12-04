import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

const BottomBar = styled.div`
  box-shadow: 0 5px #BBB;
  padding-top: 5px;
  background: white;
  position: fixed;
  height: 200px;
  bottom: ${({ visible }) => visible ? 0 : -200}px;
  left: 0;
  right: 0;
  transition: bottom .3s ease;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
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

const ContentBottomBar = ({ notes, refs }) => (
  <BottomBar visible={ (notes.length + refs.length) > 0 }>
    <Container>
      <List>
        { notes.map(({ key, content }) => (
          <ListElem>{ content }</ListElem>
        ))}
      </List>
    </Container>
  </BottomBar>

)

export default ContentBottomBar
