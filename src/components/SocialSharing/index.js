import React from 'react'
import styled from 'styled-components'
import { size, palette } from 'styled-theme'

import { SOCIAL } from '../../constants'
import { getTwitterShareHREF, openModal } from '../../utils'

import Share from './Share'
import FacebookProvider from './FacebookProvider'

import FacebookIcon from '../../icons/social/facebook'
import TwitterIcon from '../../icons/social/twitter'

const shareTwitter = () => {
  const href = getTwitterShareHREF();
  console.log('shareTwitter', href);
  openModal(href, 600, 320);
};

const Holder = styled.div.attrs({ className: 'social-sharing' })`
  display: flex;
  height: ${size('navbarHeight')};
  justify-content: space-around;
  align-items: center;
  width: 100px;
  & svg {
    fill: white;
    transition: fill .25s ease;
    cursor: pointer;
    &:hover {
      fill: ${palette('primary', 1)};
    }
  }
}
`

const SocialSharing = () => (
  <Holder>
    <FacebookProvider
      appId={SOCIAL.FACEBOOK.APP_ID}
      version={SOCIAL.FACEBOOK.SDK_VERSION}
    >
      <Share href={SOCIAL.SHARE_URL}>
        <FacebookIcon width={25} height={25} />
      </Share>
    </FacebookProvider>
    <TwitterIcon onClick={shareTwitter} width={25} height={25} />
  </Holder>
)

export default SocialSharing;
