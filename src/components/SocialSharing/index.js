import React from 'react'
import FacebookProvider, { Share } from 'react-facebook'
import { SOCIAL } from '../constants'
import { getTwitterShareHREF, openModal } from '../utils'


import FacebookIcon from '../icons/facebook'
import TwitterIcon from '../icons/twitter'

import './styles.css';

const shareTwitter = () => {
  const href = getTwitterShareHREF();
  openModal(href, 600, 320);
};

const Holder = styled.div`
  display: flex;
  height: ${size('navbar.height')};
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
  & svg {
    fill: white;
    transition: fill .25s ease;
    cursor: pointer;

    &:hover {
      fill: rgb(237,41,57);
    }
  }
}
`

const SocialSharing = () => (
  <Holder>
    <FacebookProvider
      appId={FACEBOOK_APP_ID}
      version={FACEBOOK_SDK_VERSION}
    >
      <Share href={SHARE_URL}>
        <FacebookIcon width={25} height={25} />
      </Share>
    </FacebookProvider>
    <TwitterIcon onClick={shareTwitter} width={25} height={25} />
  </Holder>
)

export default SocialSharing;
