import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'

import Container from '../components/Container'
import { SOCIAL } from '../constants'
import theme from '../theme'
import './index.css'

const {
  TITLE,
  DESCRIPTION,
  KEYWORDS
} = SOCIAL

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title={ TITLE }
      meta={[
        { name: 'description', content: DESCRIPTION },
        { name: 'keywords', content: KEYWORDS  },
      ]}
    />
    <ThemeProvider theme={theme}>
      {children()}
    </ThemeProvider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
