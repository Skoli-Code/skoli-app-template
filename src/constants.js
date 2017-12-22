import canUseDom from 'can-use-dom'
import AboutIcon from './icons/questionmark'
import HomeIcon from './icons/home'

export const DEFAULT_URL = 'http://localhost:9000'

export const baseURL = () => (
  canUseDom ? `${location.protocol}//${location.host}` : DEFAULT_URL
)

export const getCurrentHref = () => (
  !canUseDom ? DEFAULT_URL : window.location.href
)

// hashtags must be separated by commas.
const TWEET_HASHTAGS = ''
const TWEET_VIA_ACCOUNT = ''
const TWEET_TEXT = 'This is the text that will appear in the sharing tweet'

export const SOCIAL = {
  DEFAULT_IMAGE: 'default.jpg',
  TITLE: 'Skoli app template',
  DESCRIPTION: 'The base template for skoli application based on Gatsby',
  KEYWORDS: 'gatsby,html,template,react',
  SHARE_URL: DEFAULT_URL,
  FACEBOOK: {
    APP_ID: '1666596323384667',
    SDK_VERSION: 'v2.10',
  },
  TWITTER: {
    INTENT_URL: 'https://twitter.com/intent/tweet',
    // you can add parameters for twitter sharing.
    // See https://dev.twitter.com/web/tweet-button/web-intent
    // for the parameters list.
    PARAMS: {
      via: TWEET_VIA_ACCOUNT,
      text: TWEET_TEXT,
      hashtags: TWEET_HASHTAGS,
      url: getCurrentHref,
    }
  }
}

export const NAVBAR_LINKS = [{
    home: true,
    icon: HomeIcon,
    to: '/',
    text: 'Skoli app template'
  },
  {
    to: '/introduction',
    text: 'Introduction',
  },
  {
    to: '/vis-in-md',
    text: 'Test visualization in markdown',
  },
  {
    to: '/about',
    text: 'About',
    icon: AboutIcon,
  }
]
