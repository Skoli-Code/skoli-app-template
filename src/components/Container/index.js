import styled from 'styled-components'
import { size } from 'styled-theme'

const Container = styled.div.attrs({ className: 'container' })`
  margin: 0 auto;
  max-width: ${size('containerMaxWidth')};
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

export default Container
