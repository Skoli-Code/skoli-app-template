import React from 'react'
import Helmet from 'react-helmet'
import canUseDom from 'can-use-dom'

import { baseURL, SOCIAL } from '../../constants'
const {
  DEFAULT_IMAGE,
  TITLE,
  DESCRIPTION,
  KEYWORDS
} = SOCIAL

const getImageUrl = name => `${baseURL()}/images/${name}`

const Meta = ({
  title,
  description,
  image,
  keywords
}) => {
  const img = getImageUrl(image)
  return (
    <Helmet
      title={title}
      description={description}
      meta={[
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: img },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: img },
        { name: 'description', content: description },
        { name: 'keywords', content: keywords }
      ]}
    />
  )
}

Meta.defaultProps = {
  title: TITLE,
  description: DESCRIPTION,
  image: DEFAULT_IMAGE,
  keywords: KEYWORDS
}

export default Meta
