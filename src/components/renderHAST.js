import React, { createElement } from 'react'
import PropTypes from 'prop-types' 
import styled from 'styled-components'
import Link from './Link'

const Bold = styled.span`
  font-weight: bold
`
const Italic = styled.span`
  font-style: italic
`
const Paragraph = styled.p``
const List = styled.ul``
const ListElement = styled.li``

const BaseComponents = {
  a: Link,
  strong: Bold,
  ul: List,
  li: ListElement,
  em: Italic,
  p: Paragraph
}

// inspired by https://github.com/phenomic/phenomic/blob/69e6f8852e873d995a0c500182be373310befebe/packages/plugin-renderer-react/src/components/BodyRenderer.js
const renderAST = ({ hast, componentsMap }) => {
  const components = {
    ...BaseComponents,
    ...componentsMap
  }

  console.log('renderAST', hast, components)
  const renderTag = ({ type, tagName, properties, value, children=[]}) => {
    let elem
    const props = properties || {}
    if (type === 'element') {
      const Tag = components[tagName]
      if(Tag) { 
        elem = (
          <Tag {...props}>
            { children.length > 0 && children.map(renderTag) }
            { value && (<span>{ value }</span>) }
          </Tag>
        )
      } else {
        return createElement(tagName, props, children.map(renderTag))
      }
    } else {
      elem = <span>{ value }</span>
    }
    return elem
  }

  return (
    <div>
      { hast.children.map(renderTag) }
    </div>
  )
}

renderAST.propTypes = {
  hast: PropTypes.object,
  componentsMap: PropTypes.object,
}

renderAST.defaultProps = {
  componentsMap: {}
}

export default renderAST
