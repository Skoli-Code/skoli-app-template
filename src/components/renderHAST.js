import React, { Component, createElement } from 'react'
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
class RenderAST extends Component {
  static propTypes = {
    hast: PropTypes.object,
    componentsMap: PropTypes.object,
  }

  static defaultProps = {
    componentsMap: {}
  }

  shouldComponentUpdate(){
    return false
  }
  render(){
    const { hast, componentsMap } = this.props
    const components = {
      ...BaseComponents,
      ...componentsMap
    }
    console.log('RenderHAST', hast) 
    const renderTag = ({
      type,
      tagName,
      properties,
      value,
      children=[],
      depth=0,
      index=0,
      ...other
    }) => {
      let elem
      const key = `${tagName||type}-${depth}-${index}`
      const props = {
        key,
        ...properties,
      }
      if (type === 'element') {
        const Tag = components[tagName]
        if(Tag) { 
          elem = (
            <Tag {...props}>
              { children.length > 0 && renderChildren(children, depth)}
              { value && (<span key={ key }>{ value }</span>) }
            </Tag>
          )
        } else {
          const _children = children.length > 0 ? renderChildren(children, depth) : null
          return createElement(tagName, props, _children)
        }
      } else {
        elem = <span key={ key }>{ value }</span>
      }

      if(Object.keys(other).length){
        const otherChildren = Object.keys(other).map(k => other[k])
        return renderChildren(otherChildren)
      }

      return elem
    }

    const renderChildren = (children, depth=0) => (
      children.map((elem, i) => {
        const props = {
          ...elem,
          depth: depth+1,
          index: i
        }
        return renderTag(props)
      })
    )
    const children = hast.children ? hast.children : hast
    return (
      <div>
        { renderChildren(children) }
      </div>
    )
  }
}


export default RenderAST
