import { css } from 'styled-components'
import { size } from 'styled-theme'

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${size('mobileMaxWidth')}) {
      ${ css(...args) }
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${size('tabletMaxWidth')}) {
      ${ css(...args) }
    }
  `
}
