const getCurrentHref = () => window.location.href;

// hashtags must be separated by commas.
const TWEET_HASHTAGS = ''
const TWEET_VIA_ACCOUNT = ''
const TWEET_TEXT = 'This is the text that will appear in the sharing tweet'

export const SOCIAL = {
  TITLE: 'Skoli app template',
  DESCRIPTION: 'The base template for skoli application based on Gatsby',
  KEYWORDS: 'gatsby,html,template,react',
  SHARE_URL: 'https://exodes-charnels.universite-lyon.fr/',
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
