import React from 'react'
import styled from 'styled-components'

import Button from '../components/Button'
import Cover from '../templates/cover'
import coverImage from '../../images/cover.jpg'

const CoverTitle = styled.h1`
  font-size: 64px
`
const TextAlignCenter = styled.div`
  text-align: center
`

const IndexPage = () => (
  <Cover background={ coverImage } blur={10}>
    <CoverTitle>
      Skoli application template
    </CoverTitle>
    <p>
    Quaestione igitur per multiplices dilatata fortunas cum ambigerentur quaedam, non nulla levius actitata constaret, post multorum clades Apollinares ambo pater et filius in exilium acti cum ad locum Crateras nomine pervenissent, villam scilicet suam quae ab Antiochia vicensimo et quarto disiungitur lapide, ut mandatum est, fractis cruribus occiduntur.
    </p>
    <TextAlignCenter>
      <Button to="/introduction">Go to the application</Button>
    </TextAlignCenter>
  </Cover>
)

export default IndexPage
