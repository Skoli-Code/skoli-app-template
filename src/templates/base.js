import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Meta from '../components/Meta'

const Holder = styled.div``

const Base = ({ meta, children }) => (
  <Holder>
    <Meta {...meta}/>
    { children }
  </Holder>
)

export default Base
