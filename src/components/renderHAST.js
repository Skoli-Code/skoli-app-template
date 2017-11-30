import React, { createElement } from 'react'
import PropTypes from 'prop-types' 

// inspired by https://github.com/phenomic/phenomic/blob/69e6f8852e873d995a0c500182be373310befebe/packages/plugin-renderer-react/src/components/BodyRenderer.js
const renderAST = ({ hast, componentsMap }) => {
  const renderTag = ({ type, tagName, properties, value, children=[]}) => {
    let elem
    const props = properties || {}
    if (type === 'element') {
      const Tag = componentsMap[tagName]
      if(Tag) { 
        elem = (
          <Tag {...props}>
            { children && children.length && children.map(renderTag) }
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
