import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { font, palette } from 'styled-theme'
import Container from '../components/Container'
import { SOCIAL } from '../constants'
import theme from '../theme'
import './index.css'


injectGlobal`
  html {
    font: 112.5%/1.5em, ${theme.fonts.primary};
  }
  body {
    color: ${theme.palette.gray[0]};
    font-family: ${theme.fonts.primary};
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
  }
`

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
